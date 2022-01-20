import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Subject } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataService } from 'src/app/services/request-data.service';
import { appState } from 'src/app/store/appState';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { RequestDataState } from 'src/app/store/request-data.state';

import { CalendarOfPricesComponent } from './calendar-of-prices.component';

fdescribe('CalendarOfPricesComponent', () => {
  let component: CalendarOfPricesComponent;
  let fixture: ComponentFixture<CalendarOfPricesComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
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
    };
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        NgxSkeletonLoaderModule,
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        }),
        NgxsLoggerPluginModule.forRoot(),
      ],
      declarations: [CalendarOfPricesComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarOfPricesComponent);
    debugElement = fixture.debugElement;
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    calendarDataMock.next({
      loading: false,
      data: [],
      currency: 'uah',
      error: 'string',
    });
    formDataMock.next({
      destinationFrom: {},
      destinationTo: {},
      endDate: new Date(),
      startDate: new Date(),
      transfers: 'string',
    });
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
