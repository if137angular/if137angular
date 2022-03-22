import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightTicketComponent } from './flight-ticket.component';
import { Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { RequestDataState } from 'src/app/store/request-data.state';
import { appState } from 'src/app/store/app.state';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataService } from 'src/app/services/request-data.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

//?
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

describe('FlightTicketComponent', () => {
  let component: FlightTicketComponent;
  let fixture: ComponentFixture<FlightTicketComponent>;
  let storeMock: any;
  let store: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
  let debugElement: any;
  let requestDataState: any;
  let formDataSubject = new Subject();
  let currency = new Subject();

  beforeEach(() => {
    storeMock ={
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.formData)
        .and.returnValue(formDataSubject.asObservable())
        .withArgs(RequestDataState.currency)
        .and.returnValue(currency.asObservable()),
      selectSnapshot: jasmine.createSpy('selectSnapshot')
    },
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({})

    TestBed.configureTestingModule({
      declarations: [ FlightTicketComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        appState,
        // ?
        MatSelectModule,
        MatAutocompleteModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTabsModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatIconModule,
        MatTableModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        //?
        NgxsModule.forRoot(appState, {
          developmentMode: true
        }),
        NgxsLoggerPluginModule.forRoot()
      ],
      providers: [
        {provide: Store, useValue: storeMock},
        {provide: FlightsInfoService, useValue: flightsInfoServiceMock},
        {provide: RequestDataService, useValue: requestDataService},
        {provide: RequestDataState, useValue: requestDataState}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTicketComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    store = TestBed.inject(Store)
    fixture.detectChanges();
  });

  afterAll(() => {
    formDataSubject.complete()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
