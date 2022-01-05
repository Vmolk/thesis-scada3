import { NgModule } from '@angular/core';

import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {NgxGaugeModule} from 'ngx-gauge';
import {MatTreeModule} from '@angular/material/tree';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio'

@NgModule({

  exports: [
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    NgxGaugeModule,
    MatTreeModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class MaterialModule {}


