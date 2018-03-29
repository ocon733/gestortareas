import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios} from '../model/usuarios';
import { TareasService } from '../tareas.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  providers: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  @Output()
  emLogin = new EventEmitter();

  public userlogin:Usuarios = new Usuarios();    
  public errorMensaje:any;
  constructor(private _tareaservice: TareasService,private _global: GlobalService, private router:Router) {  }




  entradalogin(){
    this._global.cargando = false;
    this._tareaservice.getLogin(this.userlogin.email,this.userlogin.clave).subscribe(
        result =>{ this.validaLogin(result);
          this._global.cargando = true; 
         },
        error => {
            this.errorMensaje = <any>error;
            this._global.cargando = true;
            if(this.errorMensaje !== null){
                console.log(this.errorMensaje);
            }
        });  
  }

  validaLogin(obj){
    if (obj != null && obj !=""){  
      var user:Usuarios = new Usuarios();  
      obj.forEach(function (item){
        item = JSON.parse(item);
        user.idUser = item.idUsuario;
        user.nombre = item.nombre;
        user.apellido = item.apellido;
        user.email = item.email;
        user.clave = item.clave;
      });
      
      //guarda en el servicio globar el usuario logueado
      this._global.usuario = user;
      //lanza el evento de usuario logueado
      this.emLogin.emit({usuario:user});
      //muestra la pagina de tareas
      this.router.navigateByUrl('/pendientes');
    }else{
      this.userlogin = new Usuarios();    
    }

  }

} 


/**
 * git init
 * git add *
 * git commit -m "Comentario subida"
 * git push -u origin master
 * //configuración git en .git/config
 */