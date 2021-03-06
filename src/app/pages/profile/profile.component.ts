import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;
  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {}

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(archivo) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Solo imagenes! ',
        text: 'El archivo seleccionado tiene que ser una imagen.',
        icon: 'error',
      });
    }
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
  }

  cambiarImagen() {
    this._usuarioService.actualizarImagen(this.imagenSubir, this.usuario._id);
  }
}
