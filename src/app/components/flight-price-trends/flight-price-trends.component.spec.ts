import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightPriceTrendsComponent } from './flight-price-trends.component';
import { BrowserModule, By } from '@angular/platform-browser';
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
import { GetFlightPriceTrends } from 'src/app/store/flight-info.action';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';

describe('FlightPriceTrendsComponent', () => {
  let component: FlightPriceTrendsComponent;
  let fixture: ComponentFixture<FlightPriceTrendsComponent>;
  let storeMock: any;
  let store: any;
  let debugElement: DebugElement;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
  let formData = new Subject();
  let flightPriceTrends = new Subject();

  beforeEach(() => {
    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.formData)
        .and.returnValue(formData.asObservable())
        .withArgs(FlightInfoState.flightPriceTrends)
        .and.returnValue(flightPriceTrends.asObservable()),
      dispatch: jasmine.createSpy('dispatch'),
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
      declarations: [FlightPriceTrendsComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightPriceTrendsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  afterAll(() => {
    formData.complete();
    flightPriceTrends.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#filterDataOnFieldTransfers', () => {
    it('should return data with { transfers: 0}', () => {
      const data = [{ transfers: 1 }, { transfers: 0 }] as any;

      component.getDirectlyFlights(data);

      expect(component.data).toContain({ transfers: 0 });
    });

    it('should return data without { transfers: 0}', () => {
      const data = [{ transfers: 1 }, { transfers: 0 }] as any;

      component.getFlightsWithTransfers(data);

      expect(component.data).not.toContain({ transfers: 0 });
    });

    it('should return data without { transfers: 1}', () => {
      const data = [{ transfers: 1 }, { transfers: 0 }] as any;

      component.getDirectlyFlights(data);

      expect(component.data).not.toContain({ transfers: 1 });
    });

    it('should return data with { transfers: 1}', () => {
      const data = [{ transfers: 1 }, { transfers: 0 }] as any;

      component.getFlightsWithTransfers(data);

      expect(component.data).toContain({ transfers: 1 });
    });
  });

  describe('#dispatchFlightPriceTrends', () => {
    it('should dispatch GetFlightPriceTrends with appropriate params', () => {
      const formData = {
        destinationFrom: {
          code: 'LWO',
        },
        destinationTo: {
          code: 'MIL',
        },
        endDate: new Date(2022, 1, 11),
        startDate: new Date(2022, 1, 13),
        transfers: 'All',
      } as any;

      component.dispatchFlightPriceTrends(formData);

      expect(store.dispatch).toHaveBeenCalledWith(
        new GetFlightPriceTrends({
          origin: 'LWO',
          destination: 'MIL',
          departDate: '2022-02',
          returnDate: '2022-02',
        })
      );
    });
  });
});
