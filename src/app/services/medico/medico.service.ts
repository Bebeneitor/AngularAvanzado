import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/internal/operators/map';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(
    public _http: HttpClient,
    public _usuarioService: UsuarioService
  ) {}

  cargarMedicos() {
    const URL = URL_SERVICIOS + '/medico';
    console.log(URL);

    return this._http.get(URL);
  }
  cargarMedico(id: string) {
    const URL = URL_SERVICIOS + '/medico/' + id;
    return this._http.get(URL).pipe(
      map((response: any) => {
        return response.medico;
      })
    );
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this._http.get(url).pipe(map((response: any) => response.medicos));
  }

  borrarMedico(id: string) {
    let URL = URL_SERVICIOS + '/medico/' + id;
    URL += '?token=' + this._usuarioService.token;
    return this._http.delete(URL);
  }

  guardarMedico(medico: Medico) {
    let URL = URL_SERVICIOS + '/medico';

    if (medico._id) {
      URL += '/' + medico._id;
      URL += '?token=' + this._usuarioService.token;

      return this._http.put(URL, medico).pipe(
        map((response: any) => {
          Swal.fire({
            title: ' Medico actualizado! ',
            text:
              'El medico ' +
              medico.nombre +
              ' ha sido actualizado correctamente',
            icon: 'success',
          });

          return response.medico;
        })
      );
    } else {
      URL += '?token=' + this._usuarioService.token;
      return this._http.post(URL, medico).pipe(
        map((response: any) => {
          Swal.fire({
            title: ' Medico creado! ',
            text:
              'El medico ' + medico.nombre + ' ha sido creado correctamente',
            icon: 'success',
          });

          return response.medico;
        })
      );
    }
  }
}
