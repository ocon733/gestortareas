import { Component, OnInit } from '@angular/core';
import { Tareas} from '../model/tareas';
import { Proyectos} from '../model/proyectos';
import { Router } from '@angular/router';
import { TareasService } from '../tareas.service';
import { trigger,  state,  style,  animate,  transition } from '@angular/core';
import { GlobalService } from '../global.service';
import { Formatos} from '../utilidades/formatos';


@Component({
  selector: 'app-pendientes',
  providers: [TareasService],
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css'],
  animations:[
    trigger('filtroVisible',[
      state('conFiltro', style({display:'block',transform: 'scale(1)'})),
      state('sinFiltro', style({display:'none',transform: 'scale(0)'})),
      transition('conFiltro => sinFiltro', animate('600ms')),
      transition('sinFiltro => conFiltro', animate('600ms'))
    ])
  ]
})
export class PendientesComponent implements OnInit {
  public tareas:Tareas[];
  public filtro:Tareas;
  public proyectos:Proyectos[];
  public errorMessage:any;
  public mostrar:string = "sinFiltro";
  public tareaSel:string = "";

  

  constructor(private _tareaservice: TareasService,private _global: GlobalService, private router:Router) {

      this._global.cargando = false;
      _tareaservice.getProyectos(_global.usuario.idUser).subscribe(result=>{
          this.actualizaProyecto(result);
          this._global.cargando = true;
          },
          error => { this.errorMessage = <any>error;
                this._global.cargando = true;
                  if(this.errorMessage !== null){
                       console.log(this.errorMessage);
                   } 
      });
       
   }

  ngOnInit() {  
    this.filtro = new Tareas(); 
    this.filtro.descripcion = "";

    this.listarTareas();
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

  mostrarFiltro(){
    if ( this.mostrar == 'sinFiltro') {
      this.mostrar = 'conFiltro';
    }else{
      this.mostrar= 'sinFiltro';
    }
  }


  listarTareas(){
    this._global.cargando = false;
     this._tareaservice.getTareas(this._global.usuario.idUser,this.filtro.idproyecto,this.filtro.descripcion,this.filtro.estado).subscribe(result =>{ 
       this.pintaTabla(result);
       this._global.cargando = true;},
          error => { this.errorMessage = <any>error;
                  this._global.cargando = true;
                  if(this.errorMessage !== null){
                       console.log(this.errorMessage);
                   } 
      });

  }

    pintaTabla(obj){
    var tarea : Tareas;
    var tareas : Tareas[] = [] ;
                    if (obj != null){  
                      obj.forEach(function (item){
                        item = JSON.parse(item);
                          tarea = new Tareas();
                          tarea.id   =  item.id;
                          if ( item.fechaFin != "undefined"){
                             tarea.fechaFin = Formatos.normalizaFecha(item.fechaFin);
                          }
                          if ( item.fechaInicio != "undefined"){
                            tarea.fechaInicio = Formatos.normalizaFecha(item.fechaInicio);
                          }
                          tarea.estado  = item.estado;
                          tarea.descripcion = item.descripcion;
                          tarea.idproyecto = item.id_proyecto;
                          tarea.nombreproyecto = "";
                          tareas.push(tarea);
                      
                      });
                    }
    this.tareas = tareas;   
    this.tareaSel = "";
    this.getnombreproyecto();
  }




  public getnombreproyecto(){
    for(let i=0; i<this.tareas.length; i++){
      for(let e=0; e<this.proyectos.length; e++){
        if( this.tareas[i].idproyecto == this.proyectos[e].id_proyecto){
          this.tareas[i].nombreproyecto = this.proyectos[e].nombre_proyecto;
        }
      }
    }   
  }


  /** GESTIÓN TAREAS */
  public selecionarTarea(id){
    this.tareaSel = id;
  }

  public borrarTarea(){
    let resp = false;
    if ( this.tareaSel !=""){
      resp =  confirm("¿Desea borrar esta tarea?");
      if ( resp ){
        //alert("boorado tarea id="+this.tareaSel);  
        this._tareaservice.borraTarea(this.tareaSel).subscribe(result =>{ 
          this.listarTareas()},
          error => { this.errorMessage = <any>error;
                if(this.errorMessage !== null){
                    console.log(this.errorMessage);
            } 
          });
      }
    }
  }

  public editarTarea(){
    if ( this.tareaSel !=""){
      //this.router.navigateByUrl('/tarea/'+this.tareaSel);
      var id = this.tareaSel;
      this.router.navigate(['/tarea', id ]);
    }
  }





   

}
