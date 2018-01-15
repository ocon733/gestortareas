import { Component } from '@angular/core';
import { Usuarios} from './model/usuarios';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  providers: [GlobalService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   userReg:Usuarios = new Usuarios();  
   registrado:Boolean = false;

  constructor (public _global: GlobalService){
    //this.registrado = _global.usuario;
    _global.cargando = true;
  }

  identificacion(event){
    if ( event.usuario.nombre != ""){
    this.userReg = event.usuario;
     this.registrado=true;
     
    }else{
      this.registrado=false;
    }
  }
}
