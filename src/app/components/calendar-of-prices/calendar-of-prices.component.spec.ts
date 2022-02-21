import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataService } from 'src/app/services/request-data.service';
import { appState } from 'src/app/store/app.state';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { RequestDataState } from 'src/app/store/request-data.state';
import { CalendarOfPricesComponent } from './calendar-of-prices.component';
import { CalendarDialogComponent } from './calendar-dialog/calendar-dialog.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarOfPricesModel } from 'src/app/models/calendar-of-prices.model';
import { CalendarOfPrices } from 'src/app/store/flight-info.action';

describe('CalendarOfPricesComponent', () => {
  let component: CalendarOfPricesComponent;
  let fixture: ComponentFixture<CalendarOfPricesComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: Store;
  let flightsInfoServiceMock: any;
  let requestDataServiceMock: any;
  let formDataMock = new Subject();
  let calendarDataMock = new Subject();

  beforeEach(() => {
    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.formData)
        .and.returnValue(formDataMock.asObservable())
        .withArgs(FlightInfoState.calendarOfPrices)
        .and.returnValue(calendarDataMock.asObservable()),
      dispatch: jasmine.createSpy('dispatch'),
      selectSnapshot: jasmine
        .createSpy('selectSnapshot')
        .and.returnValue('USD'),
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CalendarModule,
        MatDialogModule,
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        }),
        NgxsLoggerPluginModule.forRoot(),
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),
      ],

      declarations: [CalendarOfPricesComponent, CalendarDialogComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarOfPricesComponent);
    debugElement = fixture.debugElement;
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      calendarDataMock.next([
        {
          value: 1,
          start: new Date(),
          title: '',
          trip_class: 1,
          show_to_affiliates: true,
          origin: '',
          destination: '',
          gate: '',
          depart_date: new Date(),
          return_date: new Date(),
          number_of_changes: 1,
          found_at: new Date(),
          duration: 1,
          distance: 1,
          actual: true,
          currency: '',
        },
      ]);
      formDataMock.next({
        origin: '',
        destination: '',
        originCode: '',
        destinationCode: '',
        return_date: '',
        depart_date: '',
      });
    });

    it('should select currency from store', () => {
      expect(store.selectSnapshot(RequestDataState.currency)).toBeTruthy();
    });

    it('should select calendarData from store', () => {
      store
        .select(FlightInfoState.calendarOfPrices)
        .subscribe((state: CalendarOfPricesModel[]) =>
          expect(state).toBeTruthy()
        );
    });

    it('should select formData from store', () => {
      store.select(RequestDataState.formData).subscribe((data: any) => {
        store.dispatch(new CalendarOfPrices(data));
        expect(store.dispatch).toHaveBeenCalledWith(new CalendarOfPrices(data));
      });
    });
  });
});
