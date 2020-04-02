import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginComponent } from '../login/login.component';
import {ToasterService} from 'angular2-toaster';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private toasterService: ToasterService) {

      this.form = this.formBuilder.group({
        nome: ['', Validators.required],
        email: ['', Validators.required],
        senha: ['', Validators.required]
      })
    }

  ngOnInit(): void {
  }

  submit() {
    // this.loading = true;

    // this.afAuth.auth.createUserWithEmailAndPassword(this.form.get('email').value, this.form.get('senha').value).then(() => {
    //   this.loading = false;
    //   this.toasterService.pop('success', '', 'Cadastro efetuado!');
    // }).catch((err) => {
    //     this.loading = false;
    //     console.log(err);
    // })

      this.toasterService.pop('success', '', 'Cadastro efetuado!');
  }

}
