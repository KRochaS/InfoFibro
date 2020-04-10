import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FramePageComponent } from './frame-page/frame-page.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { ContaComponent } from './account/conta/conta.component';
import { ApoieComponent } from './apoie/apoie.component';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { RelatosComponent } from './relatos/relatos.component';
import { FormRelatoComponent } from './relatos/form-relato/form-relato.component';


const routes: Routes = [
  {
    path: '',
    component: FramePageComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'conta', component: ContaComponent},
      { path: 'apoie', component: ApoieComponent},
      {path: 'informacoes', component: InformacoesComponent},
      {path: 'relatos', component: RelatosComponent},
      {path: 'formulario-relato', component: FormRelatoComponent}
      
      
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
