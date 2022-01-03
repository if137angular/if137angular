import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

import { AppState } from 'src/app/store/app.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RequestDataService } from 'src/app/services/request-data.service';
import { HttpClientModule } from '@angular/common/http';
import { FlightsInfoService } from './services/flights-info.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CalendarOfPricesComponent } from './calendar-of-prices/calendar-of-prices.component';
import { CalendarOfPricesItemComponent } from './calendar-of-prices/calendar-of-prices-item/calendar-of-prices-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    CalendarOfPricesComponent,
    CalendarOfPricesItemComponent,
  ],
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    NgxsModule.forRoot(AppState, {
      developmentMode: true,
    }),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [RequestDataService, FlightsInfoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
