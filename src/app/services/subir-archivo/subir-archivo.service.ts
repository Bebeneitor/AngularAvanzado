import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class SubirArchivoService {
  constructor() {}

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('fallo la carga');
            reject(xhr.response);
          }
        }
      };

      const URL = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', URL, true);
      xhr.send(formData);
    });
  }
}
