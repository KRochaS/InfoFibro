import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import {ToasterService} from 'angular2-toaster';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private toasterService: ToasterService,
    private router: Router,) {

      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        senha: ['', Validators.required]
      })



    }


  ngOnInit(): void {
  }

  submit() {
    this.loading = true;

    this.afAuth.auth.signInWithEmailAndPassword(this.form.get('email').value, this.form.get('senha').value)
    .then(() => {
      this.loading = false;
      this.toasterService.pop('success', '', 'Login efetuado!');
      this.router.navigateByUrl('/');
    }).catch((err) => {
        this.loading = false;
        this.toasterService.pop('error', '', 'Erro ao efetuar login! Verifique os dados');
        console.log(err);
    })


  }

}
