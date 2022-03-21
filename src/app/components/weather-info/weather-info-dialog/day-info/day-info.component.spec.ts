import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataService } from 'src/app/services/request-data.service';
import { appState } from 'src/app/store/app.state';
import { RequestDataState } from 'src/app/store/request-data.state';

import { DayInfoComponent } from './day-info.component';

describe('DayInfoComponent', () => {
  let component: DayInfoComponent;
  let fixture: ComponentFixture<DayInfoComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: Store;
  let flightsInfoServiceMock: any;
  let requestDataServiceMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        }),
        NgxsLoggerPluginModule.forRoot(),
      ],
      declarations: [DayInfoComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DayInfoComponent);
    store = TestBed.inject(Store);
    debugElement = fixture.debugElement;
    component = fixture.debugElement.componentInstance;
    const inputValue = {
      dt: 1,
      sunrise: 1,
      sunset: 1,
      moonrise: 1,
      moonset: 1,
      moon_phase: 1,
      temp: {
        day: 1,
        min: 1,
        max: 1.412,
        night: 1,
        eve: 1,
        morn: 1,
      },
      feels_like: {
        day: 1,
        night: 1,
        eve: 1,
        morn: 1,
      },
      pressure: 1,
      humidity: 1,
      dew_point: 1,
      wind_speed: 1,
      wind_deg: 1,
      wind_gust: 1,
      weather: [
        {
          id: 1,
          main: 'string',
          description: 'string',
          icon: 'string',
        },
      ],
      clouds: 1,
      pop: 1,
      uvi: 1,
    };
    component.dayInfo = inputValue;
    component.idx = 1;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getDate', () => {
    it('should return date, which depends on index of it', () => {
      expect(component.getDate()).toEqual(
        moment().add(component.idx, 'days').toDate()
      );
    });
  });

  describe('#floorTemp', () => {
    it('should return floored temperature', () => {
      expect(component.floorTemp(component.dayInfo.temp.max)).toEqual(
        Math.floor(component.dayInfo.temp.max)
      );
    });
  });
});
