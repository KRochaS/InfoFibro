import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

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
        private router: Router,
        private toasterService: ToasterService) {
        this.user = afAuth.authState;
    }
    ngOnInit() {

       
        this.user.name = 'Login'

        this.user.subscribe((users) => {
            if (users === null) {
                this.user.name = 'Login'
                this.usersAutenticado = users;
            } else {

                this.getList();
                this.usersAutenticado = users;
            }
        })

        this.afAuth.auth.onAuthStateChanged((value) => {
            console.log(value);
            this.usersAutenticado = value;
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

            this.afAuth.auth.onAuthStateChanged((value) => {
                this.usersAutenticado = value;
            })

            if(this.usersAutenticado != null || this.usersAutenticado != undefined)  {
                this.dataTeste.subscribe((value) => {
                    this.loading = false;
                    this.afAuth.user.subscribe((users) => {
                        if(users) {
                            value.forEach(element => {
                                if (element.email === users.email) {
                                    this.user.name = element.nome;
            
                                }
                            });

                        }
                    })
                })
            } else {
                this.loading = false;
            }
    
    }

   
}



