import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  totalMedicos: number = 0;

  constructor(public _medicosService: MedicoService) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.cargarMedicos().subscribe((response: any) => {
      this.medicos = response.medicos;
      this.totalMedicos = response.count;
    });
  }

  buscarMedico(medicoNombre: string) {
    if (medicoNombre.length > 0) {
      this._medicosService.buscarMedicos(medicoNombre).subscribe((response) => {
        this.medicos = response;
      });
    } else if (medicoNombre.length === 0) {
      this.cargarMedicos();
    }
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Estas seguro en eliminar a ' + medico.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
    }).then((result) => {
      if (result.value) {
        this._medicosService.borrarMedico(medico._id).subscribe((response) => {
          Swal.fire({
            title: 'Medico eliminado',
            text: `Medico ${medico.nombre} eliminado correctamente`,
            icon: 'success',
          });

          this.cargarMedicos();
        });
      }
    });
  }
}
