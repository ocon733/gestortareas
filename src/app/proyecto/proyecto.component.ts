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
  
  constructor(private _tareaservice: TareasService, private _global: GlobalService, private route: ActivatedRoute, private router:Router) { }

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
}

       


