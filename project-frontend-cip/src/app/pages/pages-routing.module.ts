import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";


const routes: Routes = [
    {
      path: "auth", component: PagesComponent,
      children: [
        {
          path: 'home',
          component: HomeComponent,
          pathMatch: 'full'
        },
        /*{
          path: 'exportadores/inscribir-exportador',
          component: InscribirExportadorComponent,
          pathMatch: 'full'
        }*/
      ]
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
