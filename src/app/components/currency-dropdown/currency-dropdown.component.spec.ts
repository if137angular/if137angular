import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { Subject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { Store, NgxsModule } from '@ngxs/store';
import { appState } from 'src/app/store/appState';

import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { CurrencyDropdownComponent } from './currency-dropdown.component';

import { RequestDataState } from 'src/app/store/request-data.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RequestDataService } from 'src/app/services/request-data.service';
import { FlightsInfoService } from 'src/app/services/flights-info.service';



fdescribe('CurrencyDropdownComponent', () => {
  let component: CurrencyDropdownComponent;
  let fixture: ComponentFixture<CurrencyDropdownComponent>;
  let storeMock: any;
  let store: any;
  let flightsInfoServiceMock: any;
  let requestDataServiceMock: any;
  let requestDataStateMock: any;
  let formDataMock = new Subject();
  let currenciesSubject = new Subject();
  let currencySubject = new Subject();
  let debugElement: DebugElement;


  beforeEach(async () => {

    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.formData)
        .and.returnValue(formDataMock.asObservable())
        .withArgs(RequestDataState.currencies)
        .and.returnValue(currenciesSubject.asObservable())
        .withArgs(RequestDataState.currency)
        .and.returnValue(currencySubject.asObservable()),
      dispatch: jasmine.createSpy('dispatch'),
    };

    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

    await TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        }),
      ],
      declarations: [CurrencyDropdownComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataServiceMock },
        { provide: RequestDataState, useValue: requestDataStateMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyDropdownComponent);
    debugElement = fixture.debugElement;
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  afterAll(() => {
    currenciesSubject.complete();
    currencySubject.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
