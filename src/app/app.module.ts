import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { MyDatePickerModule  } from 'mydatepicker';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { PieComponent } from './pie/pie.component';
import { PendientesComponent } from './pendientes/pendientes.component';
import { TareaComponent } from './tarea/tarea.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { CampofechaComponent } from './campofecha/campofecha.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    MenuComponent,
    LoginComponent,
    PieComponent,
    PendientesComponent,
    TareaComponent,
    ProyectoComponent,
    CampofechaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyDatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
