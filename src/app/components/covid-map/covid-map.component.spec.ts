import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidMapComponent } from './covid-map.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Store } from '@ngxs/store';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataService } from 'src/app/services/request-data.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
	
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { exp } from '@amcharts/amcharts5/.internal/core/util/Ease';


describe('CovidMapComponent', () => {
  let component: CovidMapComponent;
  let fixture: ComponentFixture<CovidMapComponent>;
  let storeMock:any;
  let flightsInfoServiceMock: any;
  let requestDataService:any;
  let httpMock: any;
  let httpClient: any;

  beforeEach(() => {
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientTestingModule,
      ],
      declarations: [ CovidMapComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useClass: FlightsInfoService },
        { provide: RequestDataService, useValue: requestDataService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CovidMapComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('getCovidLevel', () => {
    it('should return low', () => {
      const element = {
        cases: {
          total: 100
        },
        population: 177000
      } as any

      const result = component.getCovidLevel(element);
      expect(result).toEqual('low')
    });
    it('should return medium', () => {
      const element = {
        cases: {
          total: 1400
        },
        population: 177000
      } as any

      const result = component.getCovidLevel(element);
      expect(result).toEqual('medium')
    });
    it('should return low', () => {
      const element = {
        cases: {
          total: 2000
        },
        population: 177000
      } as any

      const result = component.getCovidLevel(element);
      expect(result).toEqual('high')
    });
  });
});
