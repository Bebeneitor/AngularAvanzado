import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public route: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
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
        this.guardarStorage(
          response.id,
          response.token,
          response.usuario,
          response.menu
        );

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
      map(
        (response: any) => {
          this.guardarStorage(
            response.id,
            response.token,
            response.usuario,
            response.menu
          );
          return true;
        },
        catchError((error) => {
          return throwError(error);
        })
      )
    );
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

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

    if (localStorage.getItem('menu')) {
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.token = token;
    this.usuario = usuario;
    this.menu = menu;
  }

  crearUsuario(usuario: Usuario) {
    const URL = URL_SERVICIOS + '/usuario';

    return this.http.post(URL, usuario).pipe(
      map(
        (response: any) => {
          Swal.fire({
            title: 'Usuario creado!',
            text: usuario.email,
            icon: 'success',
          });

          return response.usuario;
        },
        catchError((error) => {
          return throwError(error);
        })
      )
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let URL = URL_SERVICIOS + '/usuario/' + usuario._id;
    URL += '?token=' + this.token;

    return this.http.put(URL, usuario).pipe(
      map(
        (response: any) => {
          if (usuario._id === this.usuario._id) {
            this.guardarStorage(
              response.usuario._id,
              this.token,
              response.usuario,
              this.menu
            );
          }
          return true;
        },

        catchError((error) => {
          return throwError(error);
        })
      )
    );
  }

  actualizarImagen(file: File, id: string) {
    this._subirArchivoService
      .subirArchivo(file, 'usuarios', id)
      .then((response: any) => {
        Swal.fire({
          title: 'Imagen actualizada! ',
          text: this.usuario.nombre,
          icon: 'success',
        });

        this.usuario.img = response.usuario.img;
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  cargarUsuarios(desde: number) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(map((response: any) => response.usuarios));
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url).pipe(
      map((response) => {
        return true;
      })
    );
  }
}
