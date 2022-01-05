import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

import { appState } from 'src/app/store/appState';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RequestDataService } from 'src/app/services/request-data.service';
import { HttpClientModule } from '@angular/common/http';
import { FlightDataFormComponent } from './components/flight-data-form/flight-data-form.component';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import { ButtonComponent } from './components/button/button.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { MatTabsModule } from '@angular/material/tabs'; // this import for tabs material

import { NavComponent } from './components/nav/nav.component';

// code below only for testing
import { FirstComponent } from './components/forTest/first/first.component';
import { SecondComponent } from './components/forTest/second/second.component';
import { ThirdComponent } from './components/forTest/third/third.component';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { CalendarOfPricesItemComponent } from './components/calendar-of-prices/calendar-of-prices-item/calendar-of-prices-item.component';
import { CalendarOfPricesComponent } from './components/calendar-of-prices/calendar-of-prices.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightDataFormComponent,
    AutocompleteInputComponent,
    CalendarOfPricesComponent,
    CalendarOfPricesItemComponent,
    ButtonComponent,
    DatepickerComponent,
    TransfersComponent,
    NavComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
  ],
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    HttpClientModule,
    CommonModule,
    NgxsModule.forRoot(appState, {
      developmentMode: true,
    }),
    NgxsLoggerPluginModule.forRoot(),
    MatTabsModule,
  ],
  providers: [RequestDataService, FlightsInfoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
