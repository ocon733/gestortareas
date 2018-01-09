import { Component, OnInit } from '@angular/core';
import { Proyectos} from '../model/proyectos';
import { TareasService } from '../tareas.service';
import { GlobalService } from '../global.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-proyecto',
  providers: [TareasService],
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  desc_valido:Boolean = false;
  nombre_valido:Boolean = false;
  proyecto:Proyectos = new Proyectos();
  id:number;
  
  constructor(private _tareaservice: TareasService,private _global: GlobalService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    var param = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }


   /** Validar formulario */
   validar(){
    
        this.desc_valido = true;
        this.nombre_valido = true;
    
        if ( this.proyecto.descripcion == undefined || this.proyecto.descripcion == ""){
          this.desc_valido = false;
        }
        if ( this.proyecto.nombre_proyecto == undefined || this.proyecto.nombre_proyecto == ""){
          this.nombre_valido = false;
        }
      }


  cancelarTarea(){
     this.router.navigateByUrl('/pendientes');
  }    

  guardarProyecto(){
        if (this.desc_valido && this.nombre_valido ){
    
          this.proyecto.idUsuario = this._global.usuario.idUser;
    
          this._tareaservice.setProyectos( this.proyecto).subscribe(result=>{
             alert("Proyecto guardada");
             this.router.navigateByUrl('/pendientes');
            },
            error => { 
                alert("Error al guardar la tarea");
            });
         }
    }
        
}
       


