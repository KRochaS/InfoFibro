import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-informacoes',
  templateUrl: './informacoes.component.html',
  styleUrls: ['./informacoes.component.css']
})
export class InformacoesComponent implements OnInit {
    loading;
    infosDb;
    informacoesTotal;
    infosTotal;

    constructor(public afAuth: AngularFireAuth,
		private toasterService: ToasterService,
		private router: Router,
		private db: AngularFireDatabase) { }

  ngOnInit(): void {

    this.getInformacoes();
  }

  getInformacoes() {
    this.loading = true;
    this.infosDb = this.db.list(`Informacoes`).snapshotChanges()
        .pipe(map(item => {
            return item.map(item => {
                return Object.assign({ key: item.payload.key }, item.payload.val())
            })
        })
    )


    
    this.infosDb.subscribe((value) => {
        this.loading = false;
        this.informacoesTotal = value;


        this.infosTotal = this.informacoesTotal.slice(3, 7);

        console.log(this.infosTotal);
    });

}


// redirecionar() {
//     this.toasterService.pop('warning', 'você será redirecionado para uma página web');
//     window.open('https://anatange.jusbrasil.com.br/artigos/155146049/portador-de-fibromialgia-e-seus-direitos-previdenciarios', '_blank');
// }

}
