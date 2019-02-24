import { Component, OnInit } from '@angular/core';
import { Proyectos} from '../model/proyectos';
import { TareasService } from '../tareas.service';
import { GlobalService } from '../global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proyecto',
  providers: [],
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  proyecto: Proyectos = new Proyectos();
  id:number;
  public errorMessage:any;
  public proyectos:Proyectos[];

  
  constructor(private _tareaservice: TareasService, private _global: GlobalService, private route: ActivatedRoute, private router:Router) { 
    _tareaservice.getProyectos(_global.usuario.idUser).subscribe(result=>{
      this.cargaProyecto(result)
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
  }



  cancelarTarea(){
     this.router.navigateByUrl('/pendientes');
  }    

  guardarProyecto(form:NgForm){
          this.proyecto.idUsuario = this._global.usuario.idUser;
          this.proyecto.descripcion =  form.controls.descripcion.value;
          this.proyecto.nombre_proyecto =  form.controls.nombre.value;
    
          this._tareaservice.setProyectos( this.proyecto).subscribe(result=>{
             //alert("Proyecto guardada");
             this.router.navigateByUrl('/pendientes');
            },
            error => { 
              alert("Error al guardar la tarea");
            });
         }


borrarProyecto(id){

  let resp = false;
  resp =  confirm("¿Desea borrar este proyecto?");
  if ( resp ){
    this._tareaservice.borraProyecto(id).subscribe(result=>{
     this.router.navigateByUrl('/pendientes');
    },
    error => { 
      alert("Error al borrar el proyecto");
    });
  }


 }


 cargaProyecto(obj){
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


}

       


