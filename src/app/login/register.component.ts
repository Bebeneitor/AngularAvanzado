import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor(
    private _usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false),
      },
      { validators: this.sonIguales('password', 'password2') }
    );

    this.forma.setValue({
      nombre: 'test',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true,
    });
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      Swal.fire({
        title: 'Importante!',
        text: 'Debe aceptar los terminos y condiciones',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });

      console.log('terminos y condicones');
      return;
    }
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );
    this._usuarioService.crearUsuario(usuario).subscribe(
      (response) => this.router.navigate(['/login']),
      (error) => {
        Swal.fire({
          title: error.error.message,
          text: error.error.errors.message,
          icon: 'error',
        });
        console.log(error);
      }
    );
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true,
      };
    };
  }
}
