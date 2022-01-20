import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CityDestinationComponent} from './city-destination.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
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
import {MatToolbarModule} from "@angular/material/toolbar";
import { NgxsModule, Store } from '@ngxs/store';
import {appState} from "../../store/appState";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {DebugElement} from "@angular/core";
import {Subject} from "rxjs";
import {RequestDataState} from "../../store/request-data.state";
import {FlightInfoState} from "../../store/flight-info.state";
import {FlightsInfoService} from "../../services/flights-info.service";
import {RequestDataService} from "../../services/request-data.service";

describe('CityDestinationComponent', () => {
  let component: CityDestinationComponent;
  let fixture: ComponentFixture<CityDestinationComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
  let formDataSubject = new Subject();
  let cityDestinationSubject = new Subject();


  beforeEach(() => {
    storeMock = {
      select: jasmine.createSpy('select')
        .withArgs(RequestDataState.formData).and.returnValue(formDataSubject.asObservable())
        .withArgs(FlightInfoState.specialOffers).and.returnValue(cityDestinationSubject.asObservable()),
      dispatch: jasmine.createSpy('dispatch'),
      selectSnapshot: jasmine.createSpy('selectSnapshot')
    };
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({})
  })
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [CityDestinationComponent]
  //   })
  //     .compileComponents();
  // });
  TestBed.configureTestingModule({
    imports: [BrowserModule,
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
      MatToolbarModule,
      NgxsModule.forRoot(appState, {
        developmentMode: true,
      }),
      NgxsLoggerPluginModule.forRoot()
    ],
    declarations: [CityDestinationComponent],
    providers: [
      {provide: Store, useValue: storeMock},
      {provide: FlightsInfoService, useValue: flightsInfoServiceMock},
      {provide: RequestDataService, useValue: requestDataService}
    ]
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
