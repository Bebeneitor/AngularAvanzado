import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', null, new Hospital('', '', ''), '');
  hospital: Hospital = new Hospital('');
  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales().subscribe((response: any) => {
      this.hospitales = response.hospitales;
    });

    this._modalUploadService.notificacion.subscribe((response: any) => {
      this.medico.img = response.medico.img;
    });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe((medico: any) => {
      this.medico = medico;
      this.hospital = medico.hospital;
    });
  }
  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }

    if (f.valid) {
      this._medicoService
        .guardarMedico(this.medico)
        .subscribe((response: any) => {
          this.medico = response;
          this.router.navigate(['/medico', response._id]);
        });
    }
  }

  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id).subscribe((response: any) => {
      this.hospital = response.hospitales;
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostarModal('medicos', this.medico._id);
  }
}
