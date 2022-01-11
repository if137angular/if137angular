import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { appState } from 'src/app/store/appState';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';

import { RequestDataService } from 'src/app/services/request-data.service';
import { FlightsInfoService } from 'src/app/services/flights-info.service';

import { AppComponent } from './app.component';
import { FlightDataFormComponent } from './components/flight-data-form/flight-data-form.component';
import { ButtonComponent } from './components/button/button.component';
import { NavComponent } from './components/nav/nav.component';
import { FirstComponent } from './components/forTest/first/first.component';
import { SecondComponent } from './components/forTest/second/second.component';
import { ThirdComponent } from './components/forTest/third/third.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CalendarOfPricesItemComponent } from './components/calendar-of-prices/calendar-of-prices-item/calendar-of-prices-item.component';
import { CalendarOfPricesComponent } from './components/calendar-of-prices/calendar-of-prices.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { NonStopTicketsComponent } from './components/non-stop-tickets/non-stop-tickets.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    FlightDataFormComponent,
    AutocompleteComponent,
    CalendarOfPricesComponent,
    CalendarOfPricesItemComponent,
    ButtonComponent,
    NavComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    SpecialOffersComponent,
    NonStopTicketsComponent
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
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
    MatTooltipModule,
    NgxsModule.forRoot(appState, {
      developmentMode: true,
    }),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [RequestDataService, FlightsInfoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
