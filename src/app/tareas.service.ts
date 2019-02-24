import { Injectable } from '@angular/core';
import {Headers, RequestOptions, Http, Response} from '@angular/http';
import { environment } from '../environments/environment';
import { Tareas} from './model/tareas';
import { Proyectos} from './model/proyectos';
import 'rxjs/add/operator/map';


@Injectable()
export class TareasService {

  constructor(private _http: Http) {}

  getProyectos(iduser) {
      return this._http.get( environment.rutaphp + 
        '/php/proyectos.php?iduser=' + iduser).map( res => res.json() );
    }

  setProyectos(proyecto) {
      return this._http.get( environment.rutaphp + 
        '/php/altaProyecto.php?idUsuario=' + proyecto.idUsuario + '&nombre=' + 
        proyecto.nombre_proyecto + '&descripcion=' + proyecto.descripcion).map( res => res.json() );
    }

  borraProyecto(id) {
      return this._http.get( environment.rutaphp + 'php/bajaProyecto.php?idProyecto=' + id   ).map( res => res.json() );
    }  
    
  getTareas(iduser, idproyecto, descripcion, estado) {
      return this._http.get( environment.rutaphp + '/php/tareasPendientes.php?iduser=' +
       iduser + '&idproyecto=' + idproyecto+'&descripcion=' + descripcion + '&estado=' + estado).map( res => res);
    }  

  getLogin(email, clave) {
      return this._http.get( environment.rutaphp + 'php/login.php?email=' + email +
       '&clave=' + clave).map( res => res.json() );
    }
  
  setTarea(tarea) {
    return this._http.get( environment.rutaphp + 
      'php/altaTarea.php?descripcion=' + tarea.descripcion + '&estado='+tarea.estado + '&fechaInicio='+tarea.fechaInicio +
       '&fechaFin=' + tarea.fechaFin + '&idUsuario='+tarea.idUsuario + '&idproyecto=' + tarea.idproyecto).map( res => res.json() );
  }  

  updateTarea(tarea) {
    return this._http.get( environment.rutaphp + 
      'php/updateTarea.php?idTarea=' + tarea.id + '&descripcion='+ tarea.descripcion + '&estado='+tarea.estado + '&fechaInicio=' + 
      tarea.fechaInicio + '&fechaFin=' + tarea.fechaFin + '&idUsuario=' + tarea.idUsuario + '&idproyecto=' +
       tarea.idproyecto).map( res => res.json() );
  }

  borraTarea(id) {
    return this._http.get( environment.rutaphp + 'php/bajaTarea.php?idTarea=' + id   ).map( res => res.json() );
  }

  getTarea(idTarea) {
    return this._http.get( environment.rutaphp + 
      'php/cargarTarea.php?idTarea=' + idTarea ).map( res => res.json() );
  }  

  getSubtareas(idTarea){
    return this._http.get( environment.rutaphp + 'php/getSubtareas.php?idTarea=' + idTarea).map( res => res.json());
  }

  setSubtareas(idSubTarea, estado){
    return this._http.get( environment.rutaphp + 'php/setSubtarea.php?idSubTarea=' + idSubTarea + "&estado=" + estado).map( res => res.json());
  }

  nuevaSubtarea(idTarea, descripcion){
    return this._http.get ( environment.rutaphp + 'php/nuevaSubtarea.php?idTarea=' + idTarea + '&descripcion=' + descripcion).map ( res=> res.json());
  }

  borrarSubtarea(idSubTarea){
    return this._http.get ( environment.rutaphp + 'php/borrarSubtarea.php?idSubTarea=' + idSubTarea).map ( res=> res.json());
  }



}
