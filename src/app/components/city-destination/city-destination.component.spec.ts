import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule} from '@angular/platform-browser';
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
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RequestDataState } from 'src/app/store/request-data.state';
import { Subject } from 'rxjs';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { RequestDataService } from 'src/app/services/request-data.service';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { GetPopularDestinations} from 'src/app/store/flight-info.action';
import {RouterTestingModule} from "@angular/router/testing";
import {SetFormDate} from "../../store/request-data.action";
import {HttpClientModule} from "@angular/common/http";
import {CityDestinationComponent} from "./city-destination.component";

 describe('CityDestinationComponent', () => {
  let component: CityDestinationComponent;
  let fixture: ComponentFixture<CityDestinationComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
  let popularDestinations = new Subject();
  let currency = new Subject();
  let windowMock: any;

  beforeEach(() => {
    windowMock = {
      scroll: jasmine.createSpy("scroll")
    };
    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.currency)
        .and.returnValue(currency.asObservable())
        .withArgs(FlightInfoState.popularDestinations)
        .and.returnValue(popularDestinations.asObservable()),
      dispatch: jasmine.createSpy('dispatch'),
      selectSnapshot: jasmine.createSpy('selectSnapshot'),
    };
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
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
        NgxsModule,
        NgxsLoggerPluginModule.forRoot(),
      ],
      declarations: [CityDestinationComponent],
      providers: [
        {provide: Window, useValue: windowMock},
        {provide: Store, useValue: storeMock},
        {provide: FlightsInfoService, useValue: flightsInfoServiceMock},
        {provide: RequestDataService, useValue: requestDataService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDestinationComponent);
    debugElement = fixture.debugElement;
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    currency.complete();
    popularDestinations.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('#ngOnInit', () => {
    beforeEach(() => {
      currency.next({
        code: "WAW",
        name: "Warsaw",
      });
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
  });

  describe('# selectDestination', () => {
    it('#should dispatch  SetFormDate with appropriate params', () => {
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
          endDate: new Date(2022, 1, 11),
          startDate: new Date(2022, 1, 13),
        })
      );
    });
  });
});

