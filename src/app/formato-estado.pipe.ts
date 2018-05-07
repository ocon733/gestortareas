import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoEstado'
})
export class FormatoEstadoPipe implements PipeTransform {

  transform(value: string, args?: any): string {

    let color: string=value;

    if ( value == "0"){
        color = "Sin iniciar"; 
    }else if ( value == "1"){
        color = "Iniciado"; 
    }else if ( value == "2"){
        color = "Avanzado"; 
    }else if ( value == "3"){
        color = "Detenido"; 
    }else if ( value == "4"){
        color = "Casi terminado"; 
    }else if ( value == "5"){
        color = "Finalizado"; 
    } 
    return color;
  }

}
