import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { appState } from '../../store/app.state';
<<<<<<< HEAD
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
=======
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
>>>>>>> 35197bc3078bb65e378e0452199fd93b92b985c6
import { RequestDataState } from '../../store/request-data.state';
import { FlightInfoState } from '../../store/flight-info.state';
import { FlightsInfoService } from '../../services/flights-info.service';
import { RequestDataService } from '../../services/request-data.service';
import { GetPopularDestinations } from 'src/app/store/flight-info.action';
import { SetFormDate } from "../../store/request-data.action";
import { CityDestinationComponent } from './city-destination.component';



fdescribe('CityDestinationComponent', () => {
  let component: CityDestinationComponent;
  let fixture: ComponentFixture<CityDestinationComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: any;
  let windowMock: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
<<<<<<< HEAD
  let windowMock: any;
  let currencySubject = new BehaviorSubject('USD');
  let popularDestinationSubject = new Subject();
=======
  let currencySubject = new BehaviorSubject('USD');
  let popularDestinationsSubject = new Subject();
  let loadingSubject = new Subject();
>>>>>>> 35197bc3078bb65e378e0452199fd93b92b985c6

  beforeEach(() => {
    windowMock = {
      scrollTo: jasmine.createSpy('scrollTo')
    };
    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.currency)
        .and.returnValue(currencySubject.asObservable())
        .withArgs(FlightInfoState.popularDestinations)
<<<<<<< HEAD
        .and.returnValue(popularDestinationSubject.asObservable()),
      selectSnapshot: jasmine.createSpy('selectSnapshot'),
=======
        .and.returnValue(popularDestinationsSubject.asObservable())
        .withArgs(FlightInfoState.loading)
        .and.returnValue(loadingSubject.asObservable()),
      dispatch: jasmine.createSpy('dispatch'),
>>>>>>> 35197bc3078bb65e378e0452199fd93b92b985c6
    };
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});
    currencySubject.next('USD')

    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        })
      ],
      declarations: [CityDestinationComponent],
      providers: [
        { provide: Store, useValue: storeMock },
<<<<<<< HEAD
        {provide: 'Window', useValue: windowMock},
=======
        { provide: 'Window', useValue: windowMock },
>>>>>>> 35197bc3078bb65e378e0452199fd93b92b985c6
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CityDestinationComponent);
    debugElement = fixture.debugElement;
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    currencySubject.complete();
<<<<<<< HEAD
    popularDestinationSubject.complete();
=======
    popularDestinationsSubject.complete();
    loadingSubject.complete();
>>>>>>> 35197bc3078bb65e378e0452199fd93b92b985c6
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

<<<<<<< HEAD
  // xdescribe('#ngOnit', () => {
  //   it('It should dispatch GetPopularDestinations whith arg IEV, LWO, DNK, ODS', () => {
  //     // arrange
  //     // act
  //     component.ngOnInit()
  //     // assert
  //     expect(store.dispatch).toHaveBeenCalledWith())
      
  //   }) 
  // });

});
=======
  describe('#ngOninit', () => {
    it('should dispatch GetPopularDestination with appropriate params', () => {
      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalledWith(
        new GetPopularDestinations(['IEV', 'LWO', 'DNK', 'ODS']
        )
      )
    })
  })


  describe('# selectDestination', () => {
    it('#should dispatch SetFormDate with appropriate params', () => {
      component.selectedCities = 'LWO';
      component.selectedDestinstion = 'WAW';

      storeMock.selectSnapshot = jasmine.createSpy('selectSnapshot')
        .and.returnValue({
          startDate: new Date(2022, 1, 11),
          endDate: new Date(2022, 1, 13)
        })
      component.selectDestination({
        origin: 'LWO',
        originName: 'Lviv',
        destination: 'WAW',
        destinationName: 'Warsaw'
      } as any);

      expect(store.dispatch).toHaveBeenCalledWith(
        new SetFormDate({
          destinationFrom: {
            name: 'Lviv',
            code: 'LWO',
          },
          destinationTo: {
            name: 'Warsaw',
            code: 'WAW',
          },
          endDate: new Date(2022, 1, 13),
          startDate: new Date(2022, 1, 11),
        })
      )
    });
  })
})
>>>>>>> 35197bc3078bb65e378e0452199fd93b92b985c6
