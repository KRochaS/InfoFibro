import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { FramePageComponent } from './frame-page/frame-page.component';
import { ContaComponent } from './account/conta/conta.component';
import { AngularFireModule } from '@angular/fire';
// import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth'

import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ApoieComponent } from './apoie/apoie.component';

export const environment = {
  firebase: {
    apiKey: "AIzaSyBG7A6u7Jx0wBzkHFUUzrw30sh3LbyZtzI",
    authDomain: "infofibro-45cb8.firebaseapp.com",
    databaseURL: "https://infofibro-45cb8.firebaseio.com",
    projectId: "infofibro-45cb8",
    storageBucket: "infofibro-45cb8.appspot.com",
    messagingSenderId: "125956159970",
    appId: "1:125956159970:web:896b2c2dd911d80a50a1bb",
    measurementId: "G-72EB1R23HK"
  }
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    HomeComponent,
    FramePageComponent,
    ContaComponent,
    ApoieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxLoadingModule.forRoot({}),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ToasterModule.forRoot(),
    NoopAnimationsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
