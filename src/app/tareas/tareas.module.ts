import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../login/login.component';
import { PieComponent } from '../pie/pie.component';
import { PendientesComponent } from '../pendientes/pendientes.component';
import { TareaComponent } from '../tarea/tarea.component';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import {FormatoEstadoPipe} from '../formato-estado.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,       
    HttpModule,   
    BrowserAnimationsModule,
    AngularMyDatePickerModule
  ],
  declarations: [
    LoginComponent,    
    PendientesComponent,
    TareaComponent,
    ProyectoComponent,
    CabeceraComponent,
    FormatoEstadoPipe
    
  ],
  exports:[
    LoginComponent,CabeceraComponent,FormatoEstadoPipe
  ],
  entryComponents:[
  ]
})
export class TareasModule { }
