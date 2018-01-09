import { Injectable } from '@angular/core';
import { Usuarios} from './model/usuarios';

@Injectable()
export class GlobalService {

    public usuario:Usuarios = new Usuarios();
}      