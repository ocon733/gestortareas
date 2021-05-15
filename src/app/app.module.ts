import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { TareasModule } from './tareas/tareas.module';
import { AppComponent } from './app.component';
import { AppRoutingModule} from './app-routing.module';
import { CoreModule } from './core/core.module';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PieComponent } from './pie/pie.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    AppComponent,    
    PieComponent,
    MenuComponent
  ],  
  imports: [
    CoreModule,
    AppRoutingModule,
    TareasModule,
    BrowserAnimationsModule    
  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
