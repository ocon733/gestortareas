import { Component, OnInit,Input, Output } from '@angular/core';
import { Item} from '../model/item';
/**
 * Componente Fecha
 * @Input texto de la etiqueta, dia, mes y año predeterminado
 * @Output formato fecha completo DD/MM/YYYY
 * Variables  valido
 */
@Component({
  selector: 'app-campofecha',
  templateUrl: './campofecha.component.html',
  styleUrls: ['./campofecha.component.css']
})
export class CampofechaComponent implements OnInit {
  @Input() 
  etiqueta:String;
  @Input()
  dia:String;
  @Input()
  anyo:number=0;
  @Input()
  obligatorio:boolean=false;
  @Input()
  mes:String;
  @Output()
  fecha:String;
  
  public listadias:Item[] = new Array();
  public listameses:Item[] = new Array();
  valido:Boolean = false;

  constructor() { 
  }

  ngOnInit() {
/*
    let item = new Item();
    item = {value:"",label:"-"};
    item = new Item();
    item = {value:"1",label:"Enero"};
    this.listameses.push(item);
    item = {value:"2",label:"Febrero"};
    this.listameses.push(item);
    item = {value:"3",label:"Marzo"};
    this.listameses.push(item);
    item = {value:"4",label:"Abril"};
    this.listameses.push(item);
    item = {value:"5",label:"Mayo"};
    this.listameses.push(item);
    item = {value:"6",label:"Junio"};
    this.listameses.push(item);
    item = {value:"7",label:"Julio"};
    this.listameses.push(item);
    item = {value:"8",label:"Agosto"};
    this.listameses.push(item);
    item = {value:"9",label:"Septiembre"};
    this.listameses.push(item);
    item = {value:"10",label:"Octubre"};
    this.listameses.push(item);
    item = {value:"11",label:"Noviembre"};
    this.listameses.push(item);
    item = {value:"12",label:"Diciembre"};
    this.listameses.push(item);
*/
    this.listameses = [
    {value:"",label:"-"},
    {value:"1",label:"Enero"},
    {value:"2",label:"Febrero"},
    {value:"3",label:"Marzo"},
    {value:"4",label:"Abril"},
    {value:"5",label:"Mayo"},
    {value:"6",label:"Junio"},
    {value:"7",label:"Julio"},
    {value:"8",label:"Agosto"},
    {value:"9",label:"Septiembre"},
    {value:"10",label:"Octubre"},
    {value:"11",label:"Noviembre"},
    {value:"12",label:"Diciembre"}];

    this.listadias.push({label:"-",value:""})
    for ( var i=1; i<=31;i++){
       this.listadias.push({label:""+i,value:""+i})  
    }

    this.validar();  
  }

  validar(){
    let valtmp = true;
    if ( this.obligatorio && (this.anyo == undefined || this.anyo.valueOf() == 0)){
      valtmp = false;
    }

    if ( this.obligatorio && (this.dia =="" || this.mes == "")){
      valtmp = false;
    }

    if ( this.anyo.valueOf() < 0 || this.anyo.valueOf() > 3000 ){
      valtmp = false;
    }

    this.actualizarFecha(valtmp);

    this.valido = valtmp;
  }

  actualizarFecha(validado){
    if ( !validado ){
      this.fecha = "";
    }else if( (this.dia != undefined && this.dia != "") &&
              (this.mes != undefined && this.mes != "") &&
              (this.anyo !=undefined && this.anyo != 0)){

       this.fecha = this.normaliza(this.dia) + "/" + this.normaliza(this.mes) + "/" + this.anyo;    

    }else{
      this.fecha = "";
    }
   
  }

  normaliza(digitos):String{
    if ( digitos.length == 1){
      return "0" + digitos; 
    }else{
      return digitos;
    }
  }

}
