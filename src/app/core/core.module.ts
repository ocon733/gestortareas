import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareasService } from '../tareas.service';
import { GlobalService } from '../global.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [TareasService, GlobalService],
})
export class CoreModule { }
