import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheapestTicketItemComponent } from './cheapest-ticket-item.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgxsModule, Store} from "@ngxs/store";
import {appState} from "../../../store/appState";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {FlightsInfoService} from "../../../services/flights-info.service";
import {RequestDataService} from "../../../services/request-data.service";
import {RequestDataState} from "../../../store/request-data.state";
import {FlightInfoState} from "../../../store/flight-info.state";
import {Subject} from "rxjs";

fdescribe('CheapestTicketItemComponent', () => {
  let component: CheapestTicketItemComponent;
  let fixture: ComponentFixture<CheapestTicketItemComponent>;
  let storeMock: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
  let formDataSubject = new Subject();
  let cheapestTicketsSubject = new Subject();
  let store: any;
  let debugElement: DebugElement;

  beforeEach(async () => {
    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.formData)
        .and.returnValue(formDataSubject.asObservable())
        .withArgs(FlightInfoState.cheapestTickets)
        .and.returnValue(cheapestTicketsSubject.asObservable()),
      dispatch: jasmine.createSpy('dispatch'),
      selectSnapshot: jasmine.createSpy('selectSnapshot'),
    };
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

    await TestBed.configureTestingModule({
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
      declarations: [ CheapestTicketItemComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CheapestTicketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
