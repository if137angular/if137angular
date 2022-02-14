import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityDestinationComponent } from './city-destination.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxsModule, Store } from '@ngxs/store';
import { appState } from '../../store/app.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestDataState } from '../../store/request-data.state';
import { FlightInfoState } from '../../store/flight-info.state';
import { FlightsInfoService } from '../../services/flights-info.service';
import { RequestDataService } from '../../services/request-data.service';
import { SpecialOffersComponent } from '../special-offers/special-offers.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CitiesModel } from '../../models/cities.model';
import {GetCities, SetFormDate} from '../../store/request-data.action';
import {GetPopularDestinations} from "../../store/flight-info.action";

describe('CityDestinationComponent', () => {
  let component: CityDestinationComponent;
  let fixture: ComponentFixture<CityDestinationComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
  let citiesSubject = new Subject();

  beforeEach(() => {
    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.cities)
        .and.returnValue(citiesSubject.asObservable()),
      selectSnapshot: jasmine.createSpy('selectSnapshot'),
    };
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

    TestBed.configureTestingModule({
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
      declarations: [CityDestinationComponent],
      providers: [
        { provide: Store, useValue: storeMock },
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
    citiesSubject.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('#ngOninit',() =>{
 //   it('should dispatch GetPopularDestination with appropriate params',() => {
 //     component.ngOnInit();
 //     expect(store.dispatch).toHaveBeenCalledWith(
 //       new GetPopularDestinations({
 //         this.popularDestinationCities
 //       })
 //     )
 //   })
 // } )

  describe('# selectDestination',() => {
    it('#should dispatch  SetFormDate with appropriate params', () => {
      component.selectedCities = 'LWO';
      component.selectedDestinstion = 'WAW';
      const formData = {
        destinationFrom: {
          name: 'Lviv',
          code: 'LWO',
        },
        destinationTo:{
          name: 'Warsaw',
          code: 'WAW',
        },
        endDate: new Date(),
        startDate: new Date(),
      } as any;

      component.selectDestination(formData);

      expect(store.dispatch).toHaveBeenCalledWith(
        new SetFormDate(formData)
      );
    });
  });

});
