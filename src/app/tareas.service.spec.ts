import { TestBed, inject } from '@angular/core/testing';
import { TareasService } from './tareas.service';
import { Tareas } from './model/tareas';
import { Observable } from 'rxjs';


import {Headers, RequestOptions, Http, Response} from '@angular/http';

describe('TareasService', () => {

  let httpClientSpy: { get: jasmine.Spy}
  let tareas:TareasService;


  beforeEach(() => {  
    TestBed.configureTestingModule({
      providers: [TareasService, Http]
    });
    

    httpClientSpy = jasmine.createSpyObj('Http', ['get']);
    tareas = new TareasService(<any> httpClientSpy);

  });

  it ('Se espera una llamada', () => {

    const tareasEsperadas : Tareas[] = [ 
      {"id":"1","idproyecto":8,"idUsuario":"2","descripcion":"Proyecto Diccionario ","estado":"1","fechaInicio":"28\/03\/2018","fechaFin":"30\/06\/2018","nombreproyecto":"Mayo 2018"},
      {"id":"2","idproyecto":7,"idUsuario":"2","descripcion":"Ajustes gestor de tareas","estado":"4","fechaInicio":"06\/05\/2018","fechaFin":"","nombreproyecto":"Mayo 2018"},
      {"id":"3","idproyecto":6,"idUsuario":"2","descripcion":"subir a GitHub ","estado":"2","fechaInicio":"08\/05\/2018","fechaFin":"","nombreproyecto":"Mayo 2018"},
      {"id":"4","idproyecto":5,"idUsuario":"2","descripcion":"diccionario subir a GitHub","estado":"0","fechaInicio":"08\/05\/2018","fechaFin":"undefined","nombreproyecto":"Mayo 2018"}
    ];

   
     httpClientSpy.get.and.returnValue(asyncData(tareasEsperadas));

     tareas.getTareas(1,2,3,4).subscribe(
      mistareas => expect(mistareas).toEqual(tareasEsperadas,'Tareas esperadas'),fail );

       expect(httpClientSpy.get.calls.count()).toBe(1, 'una llamada');
              
  });





});


export function asyncData<T>(data: T) {
  return Observable.defer(() => Promise.resolve(data));
}