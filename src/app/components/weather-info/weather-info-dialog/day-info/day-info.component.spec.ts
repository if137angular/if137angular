import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

import { DayInfoComponent } from './day-info.component';

fdescribe('DayInfoComponent', () => {
  let component: DayInfoComponent;
  let fixture: ComponentFixture<DayInfoComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: Store;
  let flightsInfoServiceMock: any;
  let requestDataServiceMock: any;
  let dayInfo = new Subject();

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
    debugElement = fixture.debugElement;
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
