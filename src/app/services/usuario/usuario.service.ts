import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public route: Router) {
    console.log('Servicio usuario listo');
    this.cargandoStorage();
  }

  estaLogueado() {
    if (this.token && this.token.length > 5) {
      return true;
    } else {
      return false;
    }
  }

  loginGoogle(token: string) {
    const URL = URL_SERVICIOS + '/login/google';
    return this.http.post(URL, { token }).pipe(
      map((response: any) => {
        this.guardarStorage(response.id, response.token, response.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recuerdame: boolean = false) {
    const URL = URL_SERVICIOS + '/login';

    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(URL, usuario).pipe(
      map((response: any) => {
        this.guardarStorage(response.id, response.token, response.usuario);
        return true;
      })
    );
  }

  logOut() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.route.navigate(['/login']);
  }

  cargandoStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }

    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.token = token;
    this.usuario = usuario;
  }

  crearUsuario(usuario: Usuario) {
    const URL = URL_SERVICIOS + '/usuario';

    return this.http.post(URL, usuario).pipe(
      map((response: any) => {
        Swal.fire({
          title: 'Usuario creado!',
          text: usuario.email,
          icon: 'success',
        });

        return response.usuario;
      })
    );
  }
}
