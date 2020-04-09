import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string = '';
  auth2: any;

  constructor(
    private _servicioUsuario: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        clientid:
          '1087778403465-lgmddcgankq71t2j3o4f0l849piboocv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });

      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;

      this._servicioUsuario.loginGoogle(token).subscribe((response) => {
        // this.router.navigate(['/dashboard']);
        this.auth2.disconnect();
        window.location.href = '#/dashboard';
      });
    });
  }

  ingresar(forma: NgForm) {
    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    if (forma.invalid) {
      return;
    }

    this._servicioUsuario
      .login(usuario, forma.value.recuerdame)
      .subscribe((response) => this.router.navigate(['/dashboard']));
  }
}
