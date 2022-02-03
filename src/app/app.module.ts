// Common
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { appState } from 'src/app/store/appState';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from 'src/environments/environment';

// Other
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Angular Material
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';

// Services
import { RequestDataService } from 'src/app/services/request-data.service';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { FilterPriceService } from './services/filter-price.service';

// Components
import { AppComponent } from './app.component';
import { FlightDataFormComponent } from './components/flight-data-form/flight-data-form.component';
import { NavComponent } from './components/nav/nav.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CalendarOfPricesComponent } from './components/calendar-of-prices/calendar-of-prices.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { NonStopTicketsComponent } from './components/non-stop-tickets/non-stop-tickets.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { FlightTicketsForSpecialDatesComponent } from './components/flight-tickets-for-special-dates/flight-tickets-for-special-dates.component';

import { CityDestinationComponent } from './components/city-destination/city-destination.component';
import { FlightTicketComponent } from 'src/app/components/flight-tickets-for-special-dates/flight-ticket/flight-ticket.component';

import { MainComponent } from './components/main/main.component';
import { SearchComponent } from './components/search/search.component';
import { FlightPriceTrendsComponent } from './components/flight-price-trends/flight-price-trends.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FlightFilterComponent } from './components/flight-filter/flight-filter.component';
import { RegisterComponent } from './components/register/register.component';
import { MapsComponent } from './components/maps/maps.component';
import { NoRecordsFoundComponent } from './components/no-records-found/no-records-found.component';
import { CurrencyDropdownComponent } from './components/currency-dropdown/currency-dropdown.component';
import { CheapestTicketsComponent } from './components/cheapest-tickets/cheapest-tickets.component';
import { CheapestTicketItemComponent } from './components/cheapest-tickets/cheapest-ticket-item/cheapest-ticket-item.component';
import { SortPipe } from 'src/utils/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FlightDataFormComponent,
    AutocompleteComponent,
    CalendarOfPricesComponent,
    NavComponent,
    SpecialOffersComponent,
    NonStopTicketsComponent,
    TransfersComponent,
    FlightTicketsForSpecialDatesComponent,
    AppComponent,
    CityDestinationComponent,
    FlightTicketComponent,
    MainComponent,
    SearchComponent,
    FlightPriceTrendsComponent,
    ToolbarComponent,
    FlightFilterComponent,
    RegisterComponent,
    MapsComponent,
    NoRecordsFoundComponent,
    CurrencyDropdownComponent,
    CheapestTicketsComponent,
    CheapestTicketItemComponent,
    SortPipe,
  ],
  imports: [
    // Common
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot(appState, { developmentMode: !environment.production }),
    NgxsLoggerPluginModule.forRoot(),

    // Angular Material
    MatSliderModule,
    MatSelectModule,
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
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatMenuModule,

    // Other
    FontAwesomeModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
  ],
  providers: [
    RequestDataService,
    FlightsInfoService,
    FilterPriceService,
    {
      provide: LOCALE_ID,
      useValue: 'en-GB',
    },
    {
      provide: 'Window',
      useValue: window,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
