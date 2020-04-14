import { NgModule } from '@angular/core';

// Routes
import { PAGES_ROUTES } from './pages.routes';

//  Modules
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// ng2 - charts
import { ChartsModule } from 'ng2-charts';

// Components
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficodonaComponent } from '../components/graficodona/graficodona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { CommonModule } from '@angular/common';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficodonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    CommonModule,
    PipesModule,
  ],
})
export class PagesModule {}
