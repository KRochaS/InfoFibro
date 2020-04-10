import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],

})
export class SignupComponent implements OnInit {
    authError: any;
    public form: FormGroup;
    loading = false;
    newUser: any;

    constructor(private formBuilder: FormBuilder,
        private afAuth: AngularFireAuth,
        private toasterService: ToasterService,
        private router: Router,
        private db: AngularFireDatabase,) {

        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            email: ['', Validators.required],
            senha: ['', Validators.required]
        })
    }
    ngOnInit() {

    }

    submit(user) {
        this.loading = true;
        this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.senha)
            .then(userCredencial => {
                this.newUser = user
                userCredencial.user.updateProfile({
                displayName: user.nome
                });
                this.insertUserData();
            }).catch((err) => {
                this.toasterService.pop('error', 'Erro ao criar Cadastro! Tente novamente');
            })

    }

    insertUserData() {
        this.loading = true;
        return this.db.list(`Users`).push({
            email: this.newUser.email,
            nome: this.newUser.nome,
            senha: this.newUser.senha,
        }).then(() => {
            this.toasterService.pop('success', 'Cadastro criado com sucesso!');
            this.router.navigateByUrl('/');
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }

}
