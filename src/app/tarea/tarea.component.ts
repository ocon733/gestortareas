import { Component, OnInit } from '@angular/core';
import { Tareas} from '../model/tareas';
import { Proyectos} from '../model/proyectos';
import { TareasService } from '../tareas.service';
import { ActivatedRoute, Router } from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';
import { GlobalService } from '../global.service';
import { ElementDef } from '@angular/core/src/view';

@Component({
  selector: 'app-tarea',
  providers: [],
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  public tarea:Tareas = new Tareas();
  public errorMessage:any;
  public proyectos:Proyectos[];
  public id:number;  
  public proyecto_valido:Boolean = false;
  public estado_valido:Boolean = false;
  public modelfini:any = {  };
  public modelffin:any = {  };

  public myDatePickerOptions: IMyDpOptions = { 
        dateFormat: 'dd/mm/yyyy',
        dayLabels: {su:'Dom',mo:'Lun', tu:'Mar', we:'Mie', th:'Jue', fr:'Vie', sa:'Sab'},
        monthLabels: {1:'Ene',2:'Feb',3:'Mar',4:'Abr',5:'May',6:'Jun',7:'Jul',8:'Ago',9:'Sep',10:'Oct',11:'Nov',12:'Dic',},
        width: '200px'
      };
  

  constructor(private _tareaservice: TareasService,private _global: GlobalService, private route: ActivatedRoute,private router:Router) {
    _tareaservice.getProyectos(_global.usuario.idUser).subscribe(result=>{
      this.actualizaProyecto(result)
      },
      error => { this.errorMessage = <any>error;
              if(this.errorMessage !== null){
                   console.log(this.errorMessage);
               } 
      });
   }

  ngOnInit() {
    
    var param = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    if( !isNaN(this.id)){
    this._tareaservice.getTarea(this.id).subscribe(result=>{
      this.cargarTarea(result)
      },
      error => { this.errorMessage = <any>error;
              if(this.errorMessage !== null){
                   console.log(this.errorMessage);
               } 
      });
    }

  }

  actualizaProyecto(obj){
    var proyect : Proyectos;
    var misproyectos : Proyectos[] = [] ;
                    if (obj != null){  
                      obj.forEach(function (item){
                        item = JSON.parse(item);
                          proyect = new Proyectos();
                          proyect.id_proyecto   =  item.id_proyecto;
                          proyect.idUsuario = item.idUsuario;
                          proyect.nombre_proyecto  = item.nombre_proyecto;
                          proyect.descripcion = item.descripcion;
                          
                          misproyectos.push(proyect);
                      
                      });
                    }
    this.proyectos = misproyectos;                
  }

  cargarTarea(obj:any){
    
    var tareatmp : Tareas;
                    if (obj != null){  
                      obj.forEach(function (item){
                        item = JSON.parse(item);
                          tareatmp = new Tareas();
                          tareatmp.id   =  item.id;
                          tareatmp.fechaFin = item.fechaFin;
                          tareatmp.fechaInicio = item.fechaInicio;
                          tareatmp.estado  = item.estado;
                          tareatmp.descripcion = item.descripcion;
                          tareatmp.idproyecto = item.id_proyecto;
                      });
                    }

    this.modelfini = this.setFecha(tareatmp.fechaInicio);
    this.modelffin = this.setFecha(tareatmp.fechaFin);
    this.tarea = tareatmp;    
    this.validar();            
  }

  cancelarTarea(){
    this.router.navigateByUrl('/pendientes');
  }



  public borrarTarea(){

    if ( this.tarea.id == ""){
      this.cancelarTarea();
    }else{
      let resp = false;
      resp =  confirm("¿Desea borrar esta tarea?");
        if ( resp ){
      
          this._tareaservice.borraTarea(this.tarea.id).subscribe(result =>{ 
            this.cancelarTarea(),
            error => { this.errorMessage = <any>error;
                  if(this.errorMessage !== null){
                      console.log(this.errorMessage);
              } 
            }
        });
      }
    }  
  }


  onSubmit(form:any){

    
   
    this.tarea.descripcion = form.controls.descripcion.value;


    if (this.estado_valido && this.proyecto_valido ){

      this.tarea.idUsuario = this._global.usuario.idUser;
      if ( this.modelfini != null && this.modelfini != "undefined" && this.modelfini != ""){
        this.tarea.fechaInicio = this.modelfini.formatted;
      }else{
        this.tarea.fechaInicio = "";
      }

      if ( this.modelffin != null && this.modelffin != "undefined" && this.modelffin != ""){
        this.tarea.fechaFin = this.modelffin.formatted;
      }else{
        this.tarea.fechaFin = "";
      }

      if ( this.tarea.id == ""){
        this._global.cargando = false;   
      this._tareaservice.setTarea( this.tarea).subscribe(result=>{
        //this.actualizaProyecto(result)
        this._global.cargando = true;
         //alert("Tarea guardada");
         this.router.navigateByUrl('/pendientes');
        },
        error => { 
          this._global.cargando = true;
            alert("Error al guardar la tarea");
        });
     }else{
      this._global.cargando = false;
      this._tareaservice.updateTarea( this.tarea).subscribe(result=>{
        this._global.cargando = true;
        //alert("Tarea actualizada");
        this.router.navigateByUrl('/pendientes');
        },
        error => { 
          this._global.cargando = true;
          alert("Error al guardar la tarea");
        });
     }
    }
    
  }

  setFecha(fecha:string){
    let cad:string[] = fecha.split("/");
    let datef:any = {}; // date: { year: null, month: null, day: null },formatted:""};
    if ( cad.length == 3){
      datef.date = {};
      datef.date.day = +cad[0];
      datef.date.month = +cad[1];
      datef.date.year = +cad[2];
      datef.formatted = fecha;

      return datef;
    }else{
      return "";
    }
    

  }



 /** Validar formulario */
  validar(){

    this.estado_valido = true;
    this.proyecto_valido = true;


    if ( this.tarea.estado == undefined || this.tarea.estado == ""){
      this.estado_valido = false;
    }
    if ( this.tarea.idproyecto == undefined || this.tarea.idproyecto == 0){
      this.proyecto_valido = false;
    }


  }


}
