import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersComponent } from './transfers.component';

import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxsModule, Store } from '@ngxs/store';
import { appState } from 'src/app/store/app.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RequestDataState } from 'src/app/store/request-data.state';
import { Subject } from 'rxjs';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { RequestDataService } from 'src/app/services/request-data.service';
import { FlightInfoState } from 'src/app/store/flight-info.state';

fdescribe('TransfersComponent', () => {
  let component: TransfersComponent;
  let fixture: ComponentFixture<TransfersComponent>;
  let storeMock: any;
  let flightsInfoServiceMock: any;
  let requestDataService: any;
  let formDataSubject = new Subject();
  let specialOffersSubject = new Subject();

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
        MatNativeDateModule,
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        }),
        NgxsLoggerPluginModule.forRoot(),
      ],
      declarations: [TransfersComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    component = new TransfersComponent();
    fixture = TestBed.createComponent(TransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.transfersControl.value;
  });

  it('should create TransfersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('registerOnChange', () => {
    expect(component.transfersControl.value).toBe('');
  });

  it('writeValue', () => {
    // arrange
    const testVal = 'Directly';
    // act
    component.writeValue(testVal);
    // assert
    expect(component.transfersControl.value).toBe('Directly');
  });

  it('transferSelected', () => {
    expect(component.transfersControl.value).toBe('');
  });
});
