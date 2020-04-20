import { Injectable } from '@angular/core';
import { CanActivate, ResolveEnd } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class VarificarTokenGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService) {}
  canActivate(): Promise<boolean> | boolean {
    const token = this._usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this._usuarioService.logOut();
      return false;
    }

    return this.varificaRenueva(payload.exp);
  }
  varificaRenueva(fexExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(fexExp * 1000);
      const ahora = new Date();

      ahora.setTime(ahora.getTime() + 1 * 60 * 60 * 1000);

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken().subscribe(
          (response) => {
            resolve(true);
          },
          (error) => {
            this._usuarioService.logOut();
            reject(false);
          }
        );
      }
    });
  }
  expirado(fexExp: number) {
    const ahorita = new Date().getTime() / 1000;
    if (fexExp < ahorita) {
      return true;
    } else {
      return false;
    }
  }
}
