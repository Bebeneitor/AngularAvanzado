import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit {
  cargando: boolean = false;
  totalRegistros: number;
  desde: number = 0;
  hospitales: Hospital[] = [];
  constructor(
    public _hospitalesServicio: HospitalService,
    public _modalSubirImagen: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();

    this._modalSubirImagen.notificacion.subscribe((response) => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this._hospitalesServicio
      .cargarHospitales(this.desde)
      .subscribe((hospitales: any) => {
        this.hospitales = hospitales.hospitales;
        this.totalRegistros = hospitales.totalHospitales;
      });
  }

  buscarhospital(hospital: string) {
    if (hospital.length >= 1) {
      this._hospitalesServicio
        .buscarHospital(hospital)
        .subscribe((response) => {
          this.hospitales = response;
        });
    } else if (hospital.length === 0) {
      this.cargarHospitales();
    }
  }

  mostarModalImagen(hospital: Hospital) {
    this._modalSubirImagen.mostarModal('hospitales', hospital._id);
    console.log('mostrando modal');
  }

  actualizarHospital(hospital: Hospital) {
    console.log('actualizando hospital', hospital);
    this._hospitalesServicio
      .actualizarHospital(hospital)
      .subscribe((response) => {
        Swal.fire({
          title: 'Hospital actualizado!',
          text: `Hospital ${hospital.nombre} actualizado correctamente`,
          icon: 'success',
        });
      });
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Estas seguro en eliminar a ' + hospital.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
    }).then((result) => {
      if (result.value) {
        this._hospitalesServicio
          .borrarHospital(hospital._id)
          .subscribe((response) => {
            Swal.fire({
              title: 'Hospital eliminado',
              text: `Hospital ${hospital.nombre} eliminado correctamente`,
              icon: 'success',
            });

            this.cargarHospitales();
          });
      }
    });
  }

  async crearHospital() {
    const { value: nombre } = await Swal.fire({
      title: 'Nombre hospital',
      input: 'text',
      inputPlaceholder: 'Introduce el nombre del hospital.',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Favor de introducir un nombre!';
        }

        if (value.length < 5) {
          return 'El nombre debe tener almenos 5 caracteres!';
        }
      },
    });

    this._hospitalesServicio.crearHospital(nombre).subscribe((response) => {
      Swal.fire({
        title: 'Hospital creado',
        text: `El hospital ${nombre} fue creado correctamente`,
        icon: 'success',
      });
      this.cargarHospitales();
    });
  }

  cambiarDesde(valor: number) {
    const nuevoValor = this.desde + valor;
    if (nuevoValor > this.totalRegistros) {
      return;
    }
    if (nuevoValor < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }
}
