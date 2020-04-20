import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  BusquedaService,
  AdminGuard,
  LoginGuardGuard,
  VarificarTokenGuard,
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
    VarificarTokenGuard,
  ],
  imports: [CommonModule, HttpClientModule],
})
export class ServiceModule {}
