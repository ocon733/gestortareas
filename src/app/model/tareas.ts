export class Tareas{
    public id:string;
    public idproyecto:number;
    public nombreproyecto:string;
    public descripcion:string;
    public estado:string;
    public fechaInicio:string;
    public fechaFin:string;
    public idUsuario:string;
    constructor(){
         this.id = "";
         this.idproyecto = 0;
         this.descripcion = "";
         this.estado = "";
         this.fechaInicio = "";
         this.fechaFin = "";
    };
}
