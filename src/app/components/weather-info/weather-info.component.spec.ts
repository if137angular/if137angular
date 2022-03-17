import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { of, Subject } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataService } from 'src/app/services/request-data.service';
import { appState } from 'src/app/store/app.state';
import { RequestDataState } from 'src/app/store/request-data.state';
import { WeatherInfoDialogComponent } from './weather-info-dialog/weather-info-dialog.component';

import { WeatherInfoComponent } from './weather-info.component';

describe('WeatherInfoComponent', () => {
  let component: WeatherInfoComponent;
  let fixture: ComponentFixture<WeatherInfoComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: Store;
  let flightsInfoServiceMock: any;
  let requestDataServiceMock: any;
  let weatherDataMock = new Subject();
  let dialog: MatDialog;

  beforeEach(() => {
    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.weatherData)
        .and.returnValue(weatherDataMock.asObservable()),
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
      declarations: [WeatherInfoComponent, WeatherInfoDialogComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: { open: () => of({ id: 1 }) } },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherInfoComponent);
    debugElement = fixture.debugElement;
    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      weatherDataMock.next({
        lat: 1,
        lon: 1,
        timezone: '',
        timezone_offset: 1,
        daily: [],
      });
    });
    it('should return weatherData from store', () => {
      const requestedData = {
        lat: 1,
        lon: 1,
        timezone: '',
        timezone_offset: 1,
        daily: [],
      };

      store
        .select(RequestDataState.weatherData)
        .subscribe((data) => (component.weatherData = data));

      expect(component.weatherData).toEqual(requestedData);
    });
  });

  describe('#showDialog', () => {
    it('should open dialog on trigger', () => {
      spyOn(dialog, 'open').and.returnValue({
        afterClosed: () => of({ id: 1 }),
      } as MatDialogRef<typeof WeatherInfoDialogComponent>);

      component.showDialog();

      expect(dialog.open).toHaveBeenCalled();
    });
  });
});
