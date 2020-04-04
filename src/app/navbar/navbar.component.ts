import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public user: any = { name: 'Login/Cadastre-se' };
    dataTeste;
    // user: Observable<firebase.User>;
    displayName;
    users;
    loading = false;
    usersAutenticado;

    constructor(public afAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        private router: Router) {
        this.user = afAuth.authState;
    }
    ngOnInit() {

        this.user.name = 'Login'

        this.user.subscribe((users) => {
            this.usersAutenticado = users;
            this.getList();
        })

       
        

    }

    verificaLogin() {
        if (this.usersAutenticado) {
            this.router.navigateByUrl('/conta');
        } else {
            this.router.navigateByUrl('/login')
        }
    }


    getList() {
        this.loading = true;
        this.dataTeste = this.db.list(`Users`).snapshotChanges()
            .pipe(map(item => {
                return item.map(item => {
                    return Object.assign({ key: item.payload.key }, item.payload.val())
                })
            })
            )

            if(this.usersAutenticado)  {
                this.dataTeste.subscribe((value) => {
                    this.loading = false;
                    this.afAuth.user.subscribe((users) => {
                        value.forEach(element => {
        
                            if (element.email === users.email) {
                                this.user.name = element.nome;
        
                            }
                        });
                    })
                })
            } else {
                this.loading = false;
            }
    
    }

    logout() {
        console.log('logout');

        this.afAuth.auth.signOut().then(() => {
            this.user.name = 'Login'
        })
    }
}



