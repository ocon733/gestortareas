import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PendientesComponent }   from './pendientes/pendientes.component';
import { LoginComponent }        from './login/login.component';
import { TareaComponent }        from './tarea/tarea.component';
import { ProyectoComponent }     from './proyecto/proyecto.component';
const appRoutes: Routes = [
  { path: 'pendientes', component: PendientesComponent },
  { path: 'tarea/:id', component: TareaComponent },
  { path: 'tarea', component: TareaComponent },
  { path: 'proyecto', component: ProyectoComponent },
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}