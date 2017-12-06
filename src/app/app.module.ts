import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoogleApiService } from './google-api.service';
import { AuthorizeComponent } from './authorize/authorize.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthorizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [ GoogleApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
