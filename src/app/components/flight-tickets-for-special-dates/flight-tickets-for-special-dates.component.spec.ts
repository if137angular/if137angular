import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightTicketsForSpecialDatesComponent } from './flight-tickets-for-special-dates.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxsModule, Store } from '@ngxs/store';
import { appState } from 'src/app/store/app.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RequestDataState } from 'src/app/store/request-data.state';
import { Subject } from 'rxjs';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { RequestDataService } from 'src/app/services/request-data.service';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { GetTicketsForSpecialDate } from 'src/app/store/flight-info.action';
import { constant } from 'lodash';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { FlightTiketsForDatePayload } from 'src/app/models/flight-tickets-for-date.model';
import { exp } from '@amcharts/amcharts5/.internal/core/util/Ease';

describe('FlightTicketsForSpecialDatesComponent', () => {
  let component: FlightTicketsForSpecialDatesComponent;
  let fixture: ComponentFixture<FlightTicketsForSpecialDatesComponent>;
  let storeMock: any;
  let store: any;
  let debugElement: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
  let formDataSubject = new Subject();
  let flightTicketsSubject = new Subject();
  let currency = new Subject();
  let loading = new Subject();

  beforeEach(() => {
    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.formData)
        .and.returnValue(formDataSubject.asObservable())
        .withArgs(FlightInfoState.flightTicketsForDate)
        .and.returnValue(flightTicketsSubject.asObservable())
        .withArgs(RequestDataState.currency)
        .and.returnValue(currency.asObservable())
        .withArgs(FlightInfoState.loading)
        .and.returnValue(loading.asObservable()),
      dispatch: jasmine.createSpy('dispatch'),
      selectSnapshot: jasmine.createSpy('selectSnapshot'),
    };
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

    TestBed.configureTestingModule({
      declarations: [FlightTicketsForSpecialDatesComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
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
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        }),
        NgxsLoggerPluginModule.forRoot(),
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTicketsForSpecialDatesComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  afterAll(() => {
    formDataSubject.complete();
    flightTicketsSubject.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getFlightInfo', () => {
    it('should dispatch GetTicketsForSpecialDate whith parametrs', () => {
      formDataSubject.next({
        destinationFrom: {
          code: 'LWO'
        },
        destinationTo: {
          code: 'WAR'
        },
        startDate: new Date('2022-03-10'),
        endDate: new Date('2022-03-14'),
        transfers: 'Directly'
      })
      //act
      component.getFlightInfo()
      //assert
      expect(store.dispatch).toHaveBeenCalledWith(new GetTicketsForSpecialDate({
        cardsNumber: 10,
        codeFrom: 'LWO',
        codeTo: 'WAR',
        direct: true,
        startDate: '2022-03-10',
        endDate: '2022-03-14',
      } as any))
    })

    it('should dispatch GetTicketsForSpecialDate whith parametrs', () => {
      formDataSubject.next({
        destinationFrom: {
          code: 'KIV'
        },
        destinationTo: {
          code: 'LWO'
        },
        startDate: new Date('2022-03-14'),
        endDate: new Date('2022-03-18'),
        transfers: 'Transfers'
      })
      //act
      component.getFlightInfo()
      //assert
      expect(store.dispatch).toHaveBeenCalledWith(new GetTicketsForSpecialDate({
        cardsNumber: 10,
        codeFrom: 'KIV',
        codeTo: 'LWO',
        direct: false,
        startDate: '2022-03-14',
        endDate: '2022-03-18',
      } as any))
    })
  })

  describe('#onScroll', () => {
    it('should add cards numbers on page', () => {
      //arrange
      component.cardsNumber = 10
      //act
      component.onScroll()
      //asert
      expect(component.cardsNumber).toEqual(14)
    })
  })

});
