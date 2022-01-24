import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialOffersSelectComponent } from './special-offers-select.component';
import { NgxsModule, Store } from '@ngxs/store';
import { appState } from 'src/app/store/appState';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RequestDataState } from 'src/app/store/request-data.state';
import { Subject } from 'rxjs';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { RequestDataService } from 'src/app/services/request-data.service';
import { GetCurrencies, GetLanguages } from 'src/app/store/request-data.action';


describe('SpecialOffersSelectComponent', () => {
  let component: SpecialOffersSelectComponent;
  let fixture: ComponentFixture<SpecialOffersSelectComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
  let currenciesSubject = new Subject();
  let languagesSubject = new Subject();
  beforeEach(() => {
    storeMock = {
      select: jasmine.createSpy('select')
        .withArgs(RequestDataState.currencies).and.returnValue(currenciesSubject.asObservable())
        .withArgs(RequestDataState.languages).and.returnValue(languagesSubject.asObservable()),
      dispatch: jasmine.createSpy('dispatch'),
      selectSnapshot: jasmine.createSpy('selectSnapshot')
    };
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

    TestBed.configureTestingModule({
      imports: [
        DebugElement,
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        }),
        NgxsLoggerPluginModule.forRoot()
      ],
      declarations: [SpecialOffersSelectComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SpecialOffersSelectComponent);
    debugElement = fixture.debugElement;
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  afterAll(() => {
    currenciesSubject.complete();
    languagesSubject.complete();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#dispatchOption', () => {
    it('should dispatch GetLanguages and GetCurrencies with appropriate params', () => {
      // arrange
      component.languages.length = 64;
      component.currencies.length = 79;

      // act
      component.dispatchOption();
      // assert
      expect(store.dispatch).toHaveBeenCalledWith(new GetLanguages({
        languages: [].length = 64
      }))
      expect(store.dispatch).toHaveBeenCalledWith(new GetCurrencies({
        currencies: [].length = 79
      }))
    })
  })

  describe('#languageSelected', () => {
    beforeEach(() => {
      component.selectedLanguageChange.emit = jasmine.createSpy('emit').and.returnValue({
        selectedLanguage: "en"
      })
    })
    it('should emitting selectedLanguage with selected language', () => {
      // arrange / act
      component.languageSelected();
      // assert
      expect(component.languageControl.value).toHaveBeenCalledWith(new GetLanguages({
        language: 'en',
      }))
    })
  })

  describe('#currencySelected', () => {
    beforeEach(() => {
      component.selectedCurrencyChange.emit = jasmine.createSpy('emit').and.returnValue({
        currencySelected: "usd"
      })
    })
    it('should emitting currencySelected with selected currency', () => {
      // arrange / act
      component.languageSelected();
      // assert
      expect(component.languageControl.value).toHaveBeenCalledWith(new GetCurrencies({
        language: 'usd',
      }))
    })
  })

  describe('#ngOnChanges', () => {
    beforeEach(() => {
      component.languageControl.setValue = jasmine.createSpy('setValue').and.returnValue({
        selectedLanguage: "en"
      });

      component.currencyControl.setValue = jasmine.createSpy('setValue').and.returnValue({
        selectedCurrency: "usd"
      })

    })
    it('should changed and set new value for currency and language', () => {
      // arrange / act
      component.ngOnChanges();
      // assert
      expect(component.selectedLanguage).toHaveBeenCalledWith(new GetCurrencies({
        language: 'en',
      }))

      expect(component.selectedCurrency).toHaveBeenCalledWith(new GetCurrencies({
        currency: 'usd',
      }))
    })
  })
});
