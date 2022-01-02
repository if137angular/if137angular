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
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AutocompleteOriginComponent } from './components/special-offers/autocomplete-origin/autocomplete-origin.component';
@NgModule({
  declarations: [
    AppComponent,
    SpecialOffersComponent,
    AutocompleteOriginComponent
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


    MatCardModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [RequestDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
