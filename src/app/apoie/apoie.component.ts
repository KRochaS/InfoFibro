import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-apoie',
    templateUrl: './apoie.component.html',
    styleUrls: ['./apoie.component.css']
})
export class ApoieComponent implements OnInit {
    loading = false;
    user;
    apoiadoresDb;
    apoiadoresTotal;
    width = '';
    usersDb;
    usuariosTotal;


    constructor(public afAuth: AngularFireAuth,
        private toasterService: ToasterService,
        private router: Router,
        private db: AngularFireDatabase) { }

    ngOnInit(): void {

        this.afAuth.authState.subscribe((user) => {
            this.user = user;
        })

        this.buscaApoiadores();
        this.buscaUsuarios();
    }

    requestSalvaBanco() {
        this.loading = true;
        return this.db.list(`Apoiadores`).push({
            email: this.user.email
        }).then(() => {
            this.toasterService.pop('success', 'Agradecemos seu apoio nesta causa');
            this.loading = false;
        }).catch(() => {
            this.loading = false;
            this.toasterService.pop('error', 'Algo deu errado! Verifique as informações e tente novamente');
        })
    }
    apoie() {
        if (this.user === null) {
            this.router.navigateByUrl('/login');
            this.toasterService.pop('warning', 'É necessário registrar-se para apoiar');
        } else {
            if (this.apoiadoresTotal.length === 0) {
                this.requestSalvaBanco();
            } else {
                if (this.apoiadoresTotal.length > 0) {
                    let verificaUser = this.apoiadoresTotal.find(apoiador => {
                       return  apoiador.email === this.user.email
                    });

                    if(verificaUser === undefined) {
                       this.requestSalvaBanco();
                    } else {
                        this.toasterService.pop('warning', 'Você já apoiou esta causa');
                    }
                    

                }
            }

        }

    }

    buscaApoiadores() {
        this.apoiadoresDb = this.db.list(`Apoiadores`).snapshotChanges()
            .pipe(map(item => {
                return item.map(item => {
                    return Object.assign({ key: item.payload.key }, item.payload.val())
                })
            })
            )


        this.apoiadoresDb.subscribe((value) => {
            this.loading = false;
            this.apoiadoresTotal = value;
            this.width = this.apoiadoresTotal.length + '%';

        })
    }


    buscaUsuarios() {
        this.usersDb = this.db.list(`Users`).snapshotChanges()
            .pipe(map(item => {
                return item.map(item => {
                    return Object.assign({ key: item.payload.key }, item.payload.val())
                })
            })
            )


        this.usersDb.subscribe((value) => {
            this.loading = false;
            this.usuariosTotal = value;

        })
    }

}
