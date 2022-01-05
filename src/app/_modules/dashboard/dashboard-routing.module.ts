import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// const routes: Routes = [
//   {
//     path: '',
//     component: DashboardComponent,
//   },

// ];

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      // {
      //   path: 'materialtank',
      //   component: Materialtank1Component,
      // }
    ]
  }
  ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
