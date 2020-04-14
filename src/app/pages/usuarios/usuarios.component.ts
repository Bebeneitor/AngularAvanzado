import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe((response) => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService
      .cargarUsuarios(this.desde)
      .subscribe((response: any) => {
        this.totalRegistros = response.totalUsuarios;
        this.usuarios = response.usuarios;
        this.cargando = false;
      });
  }
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string = '') {
    if (termino.length > 1) {
      this.cargando = true;
      this._usuarioService
        .buscarUsuarios(termino)
        .subscribe((response: any) => {
          this.usuarios = response;
          this.cargando = false;
        });
    } else if (termino.length === 0) {
      this.desde = 0;
      this.cargarUsuarios();
    }
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire({
        title: 'No puedes eliminarte a ti mismo! ',
        text: usuario.nombre,
        icon: 'error',
      });
      return;
    }

    Swal.fire({
      title: 'Estas seguro',
      text: 'Estas seguro en eliminar a ' + usuario.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe((borrado) => {
          Swal.fire('Eliminado!', usuario.nombre, 'success');
          this.cargarUsuarios();
        });
      }
    });
  }

  actualizarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostarModal(usuario: Usuario) {
    this._modalUploadService.mostarModal('usuarios', usuario._id);
  }
}
