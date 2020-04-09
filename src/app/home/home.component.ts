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
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	infosDb;
	loading;
    informacoesTotal;
    infosDestaque;
	

	constructor(public afAuth: AngularFireAuth,
		private db: AngularFireDatabase,
		private router: Router,
		private toasterService: ToasterService) {
	}

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


            this.infosDestaque= this.informacoesTotal.slice(0, 3);

            console.log(this.infosDestaque);
        });

	}

}
