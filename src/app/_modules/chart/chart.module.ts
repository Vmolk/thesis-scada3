import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart/chart.component';
import { MaterialModule } from 'src/app/material.module';
import { DataTableComponent } from './data-table/data-table.component';
import { LevelChartComponent } from './level-chart/level-chart.component';
import { FlowChartComponent } from './flow-chart/flow-chart.component';
import {ChartsModule} from 'ng2-charts'

@NgModule({
  declarations: [
    ChartComponent,
    DataTableComponent,
    LevelChartComponent,
    FlowChartComponent,

  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ChartsModule
  ]
})
export class ChartModule { }
