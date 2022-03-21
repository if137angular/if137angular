import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataService } from 'src/app/services/request-data.service';
import { appState } from 'src/app/store/app.state';
import { RequestDataState } from 'src/app/store/request-data.state';
import { DayInfoComponent } from './day-info/day-info.component';

import { WeatherInfoDialogComponent } from './weather-info-dialog.component';

describe('WeatherInfoDialogComponent', () => {
  let component: WeatherInfoDialogComponent;
  let fixture: ComponentFixture<WeatherInfoDialogComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: Store;
  let flightsInfoServiceMock: any;
  let requestDataServiceMock: any;
  let weatherDataMock = new Subject();

  beforeEach(() => {
    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.weatherData)
        .and.returnValue(weatherDataMock.asObservable()),
      dispatch: jasmine.createSpy('dispatch'),
      selectSnapshot: jasmine
        .createSpy('selectSnapshot')
        .and.returnValue('USD'),
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatIconModule,
        MatDialogModule,
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        }),
        NgxsLoggerPluginModule.forRoot(),
      ],
      declarations: [DayInfoComponent, WeatherInfoDialogComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherInfoDialogComponent);
    debugElement = fixture.debugElement;
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
