import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[];
  medicos: Medico[];
  hospitales: Hospital[];
  termino: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public _busquedaService: BusquedaService
  ) {
    activatedRoute.params.subscribe((params) => {
      this.termino = params.termino;
      this.buscar(this.termino);
    });
  }

  ngOnInit(): void {
    this.buscar(this.termino);
  }

  buscar(termino: string) {
    this._busquedaService.buscar(termino).subscribe((response: any) => {
      this.usuarios = response.usuarios;
      this.medicos = response.medicos;
      this.hospitales = response.hospitales;
    });
  }
}
