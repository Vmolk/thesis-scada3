import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {PageNotFoundComponent} from './_common/page-not-found/page-not-found.component'
import {} from './_modules/dashboard/dashboard.module'
import {} from './_modules/chart/chart.module'
import {} from './_modules/connection/connection.module'
import {} from './_modules/login/login.module'
import {AboutComponent} from './_modules/about/about.component'
import {AuthGuard} from './_guards'
const routes: Routes = [
  {
    path:'connection',
    loadChildren : './_modules/connection/connection.module#ConnectionModule',
    
  },
  {
    path:'chart',
    loadChildren : './_modules/chart/chart.module#ChartModule',
    
  },
  {
    path: 'login',
    loadChildren: './_modules/login/login.module#LoginModule',
  },
  {
    path: 'dashboard',
    loadChildren: './_modules/dashboard/dashboard.module#DashboardModule',
    
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '',
    redirectTo: 'connection',
    pathMatch: 'full',
  },
  {
    path: 'page-not-found', component: PageNotFoundComponent,
  },
  {
    path: '**', redirectTo: 'page-not-found',
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
