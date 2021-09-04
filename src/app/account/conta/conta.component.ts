import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-conta',
    templateUrl: './conta.component.html',
    styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
    public form: FormGroup;
    loading = false;
    dataList;
    user;
    usersAutenticado;
    UserDbKey;
    toggle;
    constructor(private formBuilder: FormBuilder,
        private afAuth: AngularFireAuth,
        private toasterService: ToasterService,
        private router: Router,
        private db: AngularFireDatabase) {

        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            email: ['', Validators.required],
            senha: ['', Validators.required]
        })


        this.user = afAuth.authState;


    }

    ngOnInit(): void {

        this.user.subscribe((users) => {
            this.usersAutenticado = users;
            if (users == null) {
                this.usersAutenticado = users;

            } else {
                
               this.getList();
            }
        })

    }

    onSubmit() {
        this.loading = true;
    }

    getList() {
        this.loading = true;
        this.dataList = this.db.list(`Users`).snapshotChanges()
            .pipe(map(item => {
                return item.map(item => {
                    return Object.assign({ key: item.payload.key }, item.payload.val())
                })
            })
            )

        if (this.usersAutenticado != null) {
            this.dataList.subscribe((value) => {
                this.loading = false;
                this.afAuth.user.subscribe((users) => {
                    if (users) {
                        value.forEach(element => {
                            if (element.email === users.email) {
                                this.UserDbKey = element.key;
                                this.user.name = element.nome;
                                this.form.get('nome').setValue(element.nome);
                                this.form.get('email').setValue(users.email);
                                this.form.get('senha').setValue(element.senha);
    
                            }
                        });

                    }
                })
            })
        } else {
            this.loading = false;
        }

    }

    changeType(password) {
        if (password.type == "password")
            password.type = "text";
        else
            password.type = "password";
        this.toggle = !this.toggle;

    }

    deletarConta() {
     
        this.afAuth.auth.currentUser.delete().then(() => {
            this.db.object(`/Users/${this.UserDbKey}`).remove();
                this.toasterService.pop('success', 'Seu usuário foi deletado com sucesso!');
                this.router.navigateByUrl('/');
            }).catch((err)=> {
                this.toasterService.pop('error', 'Ocorreu um erro ao deletar seu usuário. Tente novamente!');
            });
    }

    logout() {
        console.log('logout');
        this.afAuth.auth.signOut().then(() => {
            this.user.name = 'Login'
            this.toasterService.pop('success', 'Logout efetuado!');
            this.router.navigateByUrl('/');
        }).catch((err)=> {
            this.toasterService.pop('error', 'Erro ao fazer logout. Tente novamente');
        });
    }
}