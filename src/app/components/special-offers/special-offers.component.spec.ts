import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialOffersComponent } from './special-offers.component';
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
import { Subject, BehaviorSubject } from 'rxjs';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { RequestDataService } from 'src/app/services/request-data.service';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { GetSpecialOffers } from 'src/app/store/flight-info.action';
import { SortPipe } from 'src/utils/sort.pipe';

describe('SpecialOffersComponent', () => {
  let component: SpecialOffersComponent;
  let fixture: ComponentFixture<SpecialOffersComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
  let formDataSubject = new Subject();
  let specialOffersSubject = new BehaviorSubject([{}]);

  beforeEach(() => {
    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.formData)
        .and.returnValue(formDataSubject.asObservable())
        .withArgs(FlightInfoState.specialOffers)
        .and.returnValue(specialOffersSubject.asObservable()),
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
      declarations: [SpecialOffersComponent, SortPipe],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataService },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialOffersComponent);
    debugElement = fixture.debugElement;
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    formDataSubject.complete();
    specialOffersSubject.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      store.selectSnapshot = jasmine
        .createSpy('selectSnapshot')
        .and.returnValue("usd");

      formDataSubject.next({
        destinationFrom: {
          code: 'LWO',
        },
        destinationTo: {
          code: '',
        },

        isFormValid: true,
        currency: 'usd'
      });

    });
    it('should dispatch GetSpecialOffers with appropriate params', () => {
      // arrange / act
      component.ngOnInit();
      // assert
      expect(store.dispatch).toHaveBeenCalledWith(
        new GetSpecialOffers({
          cityOrigin: 'LWO',
          cityDestination: '',
          language: 'en',
          currency: 'usd',
        })
      );
    });
  });

  describe('#getHours', () => {
    it('should return 60h', () => {
      expect(component.getHours(221)).toEqual('3h:41m');
    });
    it('should return 1m', () => {
      expect(component.getHours(2024)).toEqual('33h:44m');
    });
    it('should return 60h 1m', () => {
      expect(component.getHours(3601)).toEqual('60h:1m');
    });
  });

  describe('#getCurrency', () => {
    it('should return UAH', () => {
      expect(component.getCurrency(23)).toEqual('UAH 23');
    });
  });

  describe('testing UI', () => {
    beforeEach(() => {
      store.select(FlightInfoState.specialOffers).subscribe();
    });
    it('should show message Sorry! No result found :-( if response is empty', (done) => {
      // arrange
      specialOffersSubject.next([]);
      // act
      component.ngOnInit();
      // assert
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const noDataDebugElements = debugElement.queryAll(By.css('.no-data'));
        console.log(noDataDebugElements);
        expect(noDataDebugElements.length > 0).toBeTruthy();
        done();
      });
    });
    it('should show result on a UI', (done) => {
      // arrange
      specialOffersSubject.next([
        {
          title: 'Title',
          airline: 'airline',
          airline_title: 'airline_title',
          flight_number: 'flight_number,',
          'departure_at:': new Date(),
          price: 1000,
          duration: '123',
          link: 'link',
        },
      ]);
      // act
      component.ngOnInit();
      // assert
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const noDataDebugElements = debugElement.queryAll(By.css('.no-data'));
        const cardGroupDebugElements = debugElement.queryAll(
          By.css('.card-group')
        );

        console.log(noDataDebugElements);
        console.log(cardGroupDebugElements);

        expect(noDataDebugElements.length).toBeFalsy();
        expect(cardGroupDebugElements.length > 0).toBeTruthy();
        done();
      });
    });
  });
});
