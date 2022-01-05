import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {PeopleService} from './_modules/connection/people.service';
import {DashboardService} from 'src/app/_service/dashboard/dashboard.service';
import { ErrorInterceptor } from './_helpers';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent } from './app.component';
import {NavbarComponent} from './_common/layout/navbar/navbar.component';
import {NotificationComponent} from './_common/layout/notification/notification.component';
import {PageNotFoundComponent} from './_common/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import {ChartsModule} from 'ng2-charts'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotificationComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    PeopleService,
    DashboardService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
