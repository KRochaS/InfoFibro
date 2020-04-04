import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  public configToaster: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade',
    timeout: 1000,
    showCloseButton: true
  });
  constructor( private afAuth: AngularFireAuth,
    private router: Router) {

  }

  title = 'infoFibro';

  ngOnInit() {



  }
}
