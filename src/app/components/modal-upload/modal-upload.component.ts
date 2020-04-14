import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [],
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: any;
  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modalUploadService.ocultarModal();
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

  subirImagen() {
    this._subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this._modalUploadService.tipo,
        this._modalUploadService.id
      )
      .then((response) => {
        console.log('emitiendo imagen', response);

        this._modalUploadService.notificacion.emit(response);
        this.cerrarModal();
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }
}
