import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { appState } from '../../store/app.state';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { RequestDataState } from '../../store/request-data.state';
import { FlightInfoState } from '../../store/flight-info.state';
import { FlightsInfoService } from '../../services/flights-info.service';
import { RequestDataService } from '../../services/request-data.service';
import { GetPopularDestinations } from 'src/app/store/flight-info.action';
import { SetFormDate } from "../../store/request-data.action";
import { MobileCityDestinationComponent } from './mobile-city-destination.component';



describe('MobileCityDestinationComponent', () => {
  let component: MobileCityDestinationComponent;
  let fixture: ComponentFixture<MobileCityDestinationComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: any;
  let windowMock: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
  let currencySubject = new BehaviorSubject('USD');
  let popularDestinationsSubject = new Subject();
  let loadingSubject = new Subject();

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
        .and.returnValue(popularDestinationsSubject.asObservable())
        .withArgs(FlightInfoState.loading)
        .and.returnValue(loadingSubject.asObservable()),
      dispatch: jasmine.createSpy('dispatch'),
    };
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});
    currencySubject.next('USD')

    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        })
      ],
      declarations: [MobileCityDestinationComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: 'Window', useValue: windowMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileCityDestinationComponent);
    debugElement = fixture.debugElement;
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    currencySubject.complete();
    popularDestinationsSubject.complete();
    loadingSubject.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
