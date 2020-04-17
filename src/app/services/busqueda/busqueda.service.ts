import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  constructor(public http: HttpClient) {}

  buscar(termino: string) {
    const URL = URL_SERVICIOS + '/busqueda/todo/' + termino;
    return this.http.get(URL);
  }
}
