import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FramePageComponent } from './frame-page/frame-page.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '',
    component: FramePageComponent,
    children: [
       {path: '', component: HomeComponent},
       {path: 'login', component: LoginComponent},
  {path:  'signup', component: SignupComponent},
  {path: 'reset-password', component: ResetPasswordComponent}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
