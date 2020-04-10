import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-relatos',
  templateUrl: './relatos.component.html',
  styleUrls: ['./relatos.component.css']
})
export class RelatosComponent implements OnInit {
    loading;
    relatoriosDb;
    relatoriosTotal;

    constructor(public afAuth: AngularFireAuth,
        private toasterService: ToasterService,
        private router: Router,
        private db: AngularFireDatabase,

    ) { }

  ngOnInit(): void {

    this.getRelatorios();
  }


  

getRelatorios() {
    this.loading = true;
    this.relatoriosDb = this.db.list(`Relatorios`).snapshotChanges()
        .pipe(map(item => {
            return item.map(item => {
                return Object.assign({ key: item.payload.key }, item.payload.val())
            })
        })
        )



    this.relatoriosDb.subscribe((value) => {
        this.loading = false;
        this.relatoriosTotal = value;
        console.log(this.relatoriosTotal);
    });

}

}

