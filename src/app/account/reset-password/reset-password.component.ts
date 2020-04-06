import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    form: FormGroup;

    constructor(public afAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        private router: Router,
        private toasterService: ToasterService,
        private formBuilder: FormBuilder) {


            this.form = this.formBuilder.group({
                email: ['', Validators.required],
               
            })
        }

    ngOnInit(): void {
    }

    restaurarSenha() {
            
            this.afAuth.auth.sendPasswordResetEmail(this.form.get('email').value).then(() => {
               
               this.router.navigateByUrl('/login');
               this.toasterService.pop('success', 'Verifique seu e-mail para alterar a senha');
            }).catch((err)=> {
                this.toasterService.pop('error', 'Erro ao fazer logout. Tente novamente');
            });
     
    }

}
