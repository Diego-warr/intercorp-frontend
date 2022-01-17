import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VistaPrincipalComponent} from "./principal/vista-principal/vista-principal.component";
import {AnalyticsComponent} from "./principal/analytics/analytics.component";

const routes: Routes = [
  {
    path : '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path : 'principal',
    component : VistaPrincipalComponent
  },
  {
    path : 'estadisticas',
    component : AnalyticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
