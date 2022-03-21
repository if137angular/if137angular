import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { BehaviorSubject, Subject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { Store, NgxsModule } from '@ngxs/store';
import { appState } from 'src/app/store/app.state';

import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { CurrencyDropdownComponent } from './currency-dropdown.component';

import { RequestDataState } from 'src/app/store/request-data.state';
import { SetCurrency } from 'src/app/store/request-data.action';
import { RequestDataService } from 'src/app/services/request-data.service';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { FlightInfoState } from 'src/app/store/flight-info.state';

describe('CurrencyDropdownComponent', () => {
  let component: CurrencyDropdownComponent;
  let fixture: ComponentFixture<CurrencyDropdownComponent>;
  let storeMock: any;
  let store: any;
  let flightsInfoServiceMock: any;
  let requestDataServiceMock: any;
  let requestDataStateMock: any;
  let flightInfoStateMock: any;

  let formDataMock = new Subject();
  let currenciesSubject = new BehaviorSubject([{ code: '' }]);
  let currencySubject = new BehaviorSubject('');
  let debugElement: DebugElement;

  beforeEach(() => {
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

    // jasmine.createSpy().and.returnValue({});
    flightsInfoServiceMock = {};
    requestDataServiceMock = {};
    requestDataStateMock = {};
    flightInfoStateMock = {};

    TestBed.configureTestingModule({
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
        { provide: FlightInfoState, useValue: flightInfoStateMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyDropdownComponent);
    store = TestBed.get(Store);
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

  describe('#setValue', () => {
    beforeEach(() => {
      store.selectSnapshot = jasmine
        .createSpy('selectSnapshot')
        .and.returnValue({
          currency: "UAH"
        });
    });
    it('should set new value of currency', () => {
      // arrange / act
      component.setValue('USD');
      // assert
      expect(store.dispatch).toHaveBeenCalledWith(
        new SetCurrency(
          "USD"
        )
      );
    });
  });

});
