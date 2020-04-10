import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-form-relato',
    templateUrl: './form-relato.component.html',
    styleUrls: ['./form-relato.component.css']
})
export class FormRelatoComponent implements OnInit {
    public form: FormGroup;
    loading = false;
    newUser: any;
    user;
    relatosDb;
    relatosTotal;

    constructor(private formBuilder: FormBuilder,
        private afAuth: AngularFireAuth,
        private toasterService: ToasterService,
        private router: Router,
        private db: AngularFireDatabase, ) {

        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            titulo: ['', Validators.required],
            cidade: ['', Validators.required],
            relatorio: ['', Validators.required]
        })
    }

    ngOnInit(): void {

        this.afAuth.authState.subscribe((user) => {
            this.user = user;

            if (this.user === null) {
                this.router.navigateByUrl('/login');
                this.toasterService.pop('warning', 'É necessário autenticar-se para escrever um relatório');

            } else {
                this.form.get('nome').setValue(this.user.displayName);

            }
        })

    }

    requestSalvaBanco() {
        this.loading = true;
        return this.db.list(`Relatorios`).push({
            nome: this.user.displayName,
            titulo: this.form.get('titulo').value,
            cidade: this.form.get('cidade').value,
            relatorio: this.form.get('relatorio').value
        }).then(() => {
            this.toasterService.pop('success', 'Agradecemos por compartilhar o seu relato');
            this.router.navigateByUrl('/relatos');
            this.loading = false;
        }).catch(() => {
            this.loading = false;
            this.toasterService.pop('error', 'Algo deu errado! Verifique as informações e tente novamente');
        })
    }
    submit() {
        this.requestSalvaBanco();
    }

}
