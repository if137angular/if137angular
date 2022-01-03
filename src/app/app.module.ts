import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from "@ngxs/store";

import { AppState } from "src/app/store/app.state";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { RequestDataService } from "src/app/services/request-data.service";
import { HttpClientModule } from "@angular/common/http";

import {MatTabsModule} from '@angular/material/tabs'; // this import for tabs material

import { NavComponent } from './components/nav/nav.component';

// code below only for testing
import { FirstComponent } from './components/forTest/first/first.component';
import { SecondComponent } from './components/forTest/second/second.component';
import { ThirdComponent } from './components/forTest/third/third.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot(AppState, {
      developmentMode: true
    }),
    NgxsLoggerPluginModule.forRoot(),
    MatTabsModule
  ],
  providers: [RequestDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
