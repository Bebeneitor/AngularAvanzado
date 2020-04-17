import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SharedService,
  SidebarService,
  LoginGuardGuard,
  UsuarioService,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  AdminGuard,
  BusquedaService,
} from './service.index';

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    BusquedaService,
  ],
  imports: [CommonModule, HttpClientModule],
})
export class ServiceModule {}
