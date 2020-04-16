import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UrlSegment } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(
    public _http: HttpClient,
    public _usuarioServicio: UsuarioService
  ) {}

  cargarHospitales(desde: number = 0) {
    const URL = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this._http.get(URL);
  }

  obtenerHospital(id: string = '') {
    const URL = URL_SERVICIOS + '/hospital/' + id;
    return this._http.get(URL);
  }

  borrarHospital(id: string) {
    const URL =
      URL_SERVICIOS +
      '/hospital/' +
      id +
      '?token=' +
      this._usuarioServicio.token;
    return this._http.delete(URL).pipe(
      map((response) => {
        return true;
      })
    );
  }

  crearHospital(nombre: string) {
    console.log('Nombre service: ', { nombre, img: '' });

    const URL =
      URL_SERVICIOS + '/hospital?token=' + this._usuarioServicio.token;
    return this._http.post(URL, { nombre });
  }

  actualizarHospital(hospital: Hospital) {
    const URL =
      URL_SERVICIOS +
      '/hospital/' +
      hospital._id +
      '?token=' +
      this._usuarioServicio.token;
    return this._http.put(URL, hospital).pipe(
      map((response) => {
        return true;
      })
    );
  }

  buscarHospital(nombre: string) {
    const URL = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + nombre;
    return this._http.get(URL).pipe(
      map((response: any) => {
        return response.hospitales;
      })
    );
  }
}
