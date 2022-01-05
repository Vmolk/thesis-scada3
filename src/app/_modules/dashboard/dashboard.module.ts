import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import{MixingTankComponent} from './mixing_tank/mixing_tank.component';
import {FormsModule} from '@angular/forms'
@NgModule({
  declarations: [
    DashboardComponent,
    MixingTankComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class DashboardModule { }
