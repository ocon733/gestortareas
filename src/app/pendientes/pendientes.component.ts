import { Component, OnInit, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { Tareas} from '../model/tareas';
import { Proyectos} from '../model/proyectos';
import { Router } from '@angular/router';
import { TareasService } from '../tareas.service';
import { trigger,  state,  style,  animate,  transition } from '@angular/core';
import { GlobalService } from '../global.service';
import { Formatos} from '../utilidades/formatos';
import { Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-pendientes',
  providers: [],
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
  public mostrar:string = "conFiltro";
  public tareaSel:string = "";
  
  @ViewChild('descripciont') descripciont: ElementRef; 

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

    
    Observable.fromEvent(this.descripciont.nativeElement, 'keyup')
    .map((e:any)=> e.target.value)
    .filter(x=>x.length > 3 || x.length == 0)
    .debounceTime(2000)
    .distinctUntilChanged()
    .switchMap(word => this._tareaservice.getTareas(this._global.usuario.idUser,this.filtro.idproyecto,this.filtro.descripcion,this.filtro.estado))
    .subscribe(result =>{ 
      this.pintaTabla(result);
      this._global.cargando = true;},
         error => { this.errorMessage = <any>error;
                 this._global.cargando = true;
                 if(this.errorMessage !== null){
                      console.log(this.errorMessage);
                  } 
     }); 
     

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


  mostrarFiltro(elem,txt){
    
    if ( this.mostrar == 'sinFiltro') {
      this.mostrar = 'conFiltro';
      txt.innerText ="  Ocultar filtro";
      elem.className = 'glyphicon glyphicon-chevron-down';
    }else{
      this.mostrar= 'sinFiltro';
      txt.innerText ="  Mostrar filtro";
      elem.className= 'glyphicon glyphicon-chevron-right';
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
                          tarea.nombreproyecto = item.nombre_proyecto;
                          tareas.push(tarea);
                      
                      });
                    }
    this.tareas = tareas;   
    this.tareaSel = "";
  }



  public colorEstado(estado:string){
    let color:string="#000000";

    if ( estado == "Sin iniciar"){
        color = "#FF0000"; 
    }else if ( estado == "Iniciado"){
        color = "#FFAE00"; 
    }else if ( estado == "Avanzado"){
        color = "#578DF2"; 
    }else if ( estado == "Detenido"){
        color = "#913674"; 
    }else if ( estado == "Finalizado"){
        color = "#1AD691"; 
    }else if ( estado == "Terminado"){
        color = "#3DA844"; 
    } 

    return color;
  }

 

  public editarTarea(id){
      this.router.navigate(['/tarea', id ]);
  }





   

}
