export class Formatos {



  /** Fecha de dos dígitos */
  public static normaliza(digito:number):string {
    let cad:string;
    cad = digito.toString();

    if (cad.length == 1) {
      return '0' + digito;
    }else {
      return cad;
    }
  }






  /** Fecha completa */
  public static normalizaFecha(fecha:string):string {
    let cad:string[] = fecha.split("/");

    if ( cad.length != 3) {
      return fecha;
    }else{
      if (cad[0].length == 1) {
        cad[0] = '0' + cad[0];
      }
      if (cad[1].length == 1) {
        cad[1] = '0' + cad[1];
      }

      return cad[0] + '/' + cad[1] + '/' + cad[2];
    }
  }


}
