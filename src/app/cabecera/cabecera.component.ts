import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
import { Formatos} from '../utilidades/formatos';
import { Usuarios} from '../model/usuarios';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

@Input()
user:Usuarios;

@Output()
emLogin = new EventEmitter();

hoy:string;

  constructor() { }

  ngOnInit() {
    let fecha = new Date();
    this.hoy = Formatos.normaliza(fecha.getDate()) + "/" + ( Formatos.normaliza(fecha.getMonth()+1)) + "/"+ fecha.getFullYear();
  }

  logout(){
    this.emLogin.emit({usuario:new Usuarios()});
  }


}
