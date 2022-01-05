import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConnectionRoutingModule } from './connection-routing.module';
import { ConnectionComponent } from './connection/connection.component';
import { MaterialModule } from 'src/app/material.module';
import { ConnectionFormComponent } from './connection-form/connection-form.component';
import { BrowseNodeComponent } from './browse-node/browse-node.component';


@NgModule({
  declarations: [
    ConnectionComponent,
    ConnectionFormComponent,
    BrowseNodeComponent,
  ],
  imports: [
    CommonModule,
    ConnectionRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ConnectionModule { }
