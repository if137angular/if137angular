import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { FlightDataFormComponent } from './flight-data-form.component';
import { OnInit, Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';

// import { RoutesMapComponent } from './routes-map.component';

// Common
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { NgxsModule, Store } from '@ngxs/store';
import { appState } from 'src/app/store/app.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from 'src/environments/environment';

// Module
import { AuthModule } from '../../auth/auth.module';

// Other
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MtxSliderModule } from '@ng-matero/extensions/slider';
import { MatDialogModule } from '@angular/material/dialog';

// Services
import { RequestDataService } from 'src/app/services/request-data.service';
import { FlightsInfoService } from 'src/app/services/flights-info.service';

// Components
import { AppComponent } from '../../app.component';
import { NavComponent } from '../nav/nav.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { CalendarOfPricesComponent } from '../calendar-of-prices/calendar-of-prices.component';
import { SpecialOffersComponent } from '../special-offers/special-offers.component';
import { NonStopTicketsComponent } from '../non-stop-tickets/non-stop-tickets.component';
import { TransfersComponent } from '../transfers/transfers.component';
import { FlightTicketsForSpecialDatesComponent } from '../flight-tickets-for-special-dates/flight-tickets-for-special-dates.component';

import { CityDestinationComponent } from '../city-destination/city-destination.component';
import { FlightTicketComponent } from 'src/app/components/flight-tickets-for-special-dates/flight-ticket/flight-ticket.component';

import { MainComponent } from '../main/main.component';
import { SearchComponent } from '../search/search.component';
import { FlightPriceTrendsComponent } from '../flight-price-trends/flight-price-trends.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FlightFilterComponent } from '../flight-filter/flight-filter.component';
import { NoRecordsFoundComponent } from '../no-records-found/no-records-found.component';
import { CurrencyDropdownComponent } from '../currency-dropdown/currency-dropdown.component';
import { CheapestTicketsComponent } from '../cheapest-tickets/cheapest-tickets.component';
import { CheapestTicketItemComponent } from '../cheapest-tickets/cheapest-ticket-item/cheapest-ticket-item.component';
import { SortPipe } from 'src/utils/sort.pipe';
import { FlightSortComponent } from '../flight-sort/flight-sort.component';
import { CalendarDialogComponent } from '../calendar-of-prices/calendar-dialog/calendar-dialog.component';
import { CovidMapComponent } from '../covid-map/covid-map.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestDataState } from '../../store/request-data.state';

fdescribe('FlightDataFormComponent', () => {
  let component: FlightDataFormComponent;
  let fixture: ComponentFixture<FlightDataFormComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let routerMock: any;
  let ngZoneMock: any;
  let store: any;
  let flightsInfoServiceMock: any;
  let requestDataServiceMock: any;
  let citiesSubject = new Subject();
  let locationSubject = new Subject();
  let formDataSubject = new Subject();
  let currencySubject = new Subject();

  beforeEach(async () => {
    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.cities)
        .and.returnValue(citiesSubject.asObservable())
        .withArgs(RequestDataState.location)
        .and.returnValue(locationSubject.asObservable())
        .withArgs(RequestDataState.formData)
        .and.returnValue(formDataSubject.asObservable())
        .withArgs(RequestDataState.currency)
        .and.returnValue(currencySubject.asObservable()),
      
      selectSnapshot: jasmine.createSpy('selectSnapshot'),
    };
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

    TestBed.configureTestingModule({
      imports: [
        AuthModule,
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forRoot(appState, { developmentMode: !environment.production }),
        NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
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
        MtxSliderModule,
        MatDialogModule,
        InfiniteScrollModule,
        FontAwesomeModule,
        NgbModalModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),
        NgbModule,
      ],
      declarations: [FlightDataFormComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: Router, useValue: routerMock },
        { provide: NgZone, useValue: ngZoneMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightDataFormComponent);
    debugElement = fixture.debugElement;
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightDataFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create FlightDataFormComponent', () => {
    expect(component).toBeTruthy();
  });
});
