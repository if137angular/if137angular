import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';
import { FormDataModel } from '../models/formData.model';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { catchError, throwError } from 'rxjs';

describe('FlightsInfoService', () => {
  let service: FlightsInfoService;
  let httpMock: any;
  let storeMock: any;
  beforeEach(() => {
    httpMock = {
      get: jasmine.createSpy('get'),
    };
    storeMock = {
      selectSnapshot: jasmine
        .createSpy('selectSnapshot')
        .withArgs(RequestDataState.currency)
        .and.returnValue('USD'),
    };
    service = new FlightsInfoService(httpMock, storeMock);
  });

  describe('#getSpecialOffers', () => {
    it('should call http with appropriate params', () => {
      // arrange
      storeMock.selectSnapshot = jasmine
        .createSpy('selectSnapshot')
        .and.returnValue('USD');
      const expectedParams =
        '/aviasales/v3/get_special_offers?origin=LWO&destination=WAW&locale=EN&currency=USD';
      // act
      service.getSpecialOffers('LWO', 'WAW', 'EN', 'USD');
      // assert
      expect(httpMock.get).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe('#getCalendarOfPrices', () => {
    it('should call http with appropriate params for calendar request', () => {
      storeMock.selectSnapshot = jasmine
        .createSpy('selectSnapshot')
        .and.returnValue('USD');
      const requestParams = {
        originCode: 'LWO',
        destinationCode: 'WAW',
        depart_date: '2021-09-18',
        return_date: '2021-09-19',
      };
      const expectedParams =
        '/v2/prices/week-matrix?currency=USD&origin=LWO&destination=WAW&show_to_affiliates=true&depart_date=2021-09-18&return_date=2021-09-19';
      service.getCalendarOfPrices(requestParams);
      expect(httpMock.get).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe('#getIpAddress', () => {
    it('should call http for ip request', () => {
      const expectedParams = 'https://api.ipify.org/?format=json';
      service.getIpAddress();
      expect(httpMock.get).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe('#getGEOLocation', () => {
    it('should call http with appropriate params for ip request', () => {
      const requestParams = '192.192.192';
      const expectedParams =
        'https://api.ipgeolocation.io/ipgeo?apiKey=a4503669913f4ef28711027d136d2d68&ip=192.192.192';
      service.getGEOLocation(requestParams);
      expect(httpMock.get).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe('#getWeatherForWeek', () => {
    it('should call http with appropriate params for weather request', () => {
      const lat = '1';
      const lon = '1';
      const expectedParams =
        'https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=1&lon=1&exclude=current,minutely,hourly,alerts&appid=2985eb313867605617f21eabece2b4b2';
      service.getWeatherForWeek(lat, lon);
      expect(httpMock.get).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe('#getFlightPriceTrends', () => {
    it('should call http with appropriate params', () => {
      const expectedParams = `/v1/prices/calendar?origin=LWO&destination=MIL&departure_date=2022-02&return_date=2022-02&currency=USD&calendar_type=departure_date`;

      service.getFlightPriceTrends('LWO', 'MIL', '2022-02', '2022-02');

      expect(httpMock.get).toHaveBeenCalledWith(expectedParams);
    });
  });
  describe('#getCheapestTickets', () => {
    it('should call http with appropriate params', () => {
      // arrange
      storeMock.selectSnapshot = jasmine
        .createSpy('selectSnapshot')
        .and.returnValue('uah');

      const expectedUrl = '/v1/prices/cheap';
      let expectedParamsURL = new HttpParams()
        .append('origin', 'LWO')
        .append('destination', 'IEV')
        .append('depart_date', '2022-02-06')
        .append('return_date', '2022-03-07')
        .append('currency', 'uah');
      const fakeFormData: FormDataModel = {
        startDate: new Date('2022-02-06'),
        endDate: new Date('2022-03-07'),
        destinationFrom: {
          cases: { su: 'Lviv' },
          code: 'LWO',
          coordinates: { lat: 49.816418, lon: 23.955318 },
          country_code: 'UA',
          name: 'Lviv',
          name_translations: { en: 'Lviv' },
          time_zone: 'Europe/Kiev',
        },
        destinationTo: {
          cases: { su: 'Kyiv' },
          code: 'IEV',
          coordinates: { lat: 50.45, lon: 30.5 },
          country_code: 'UA',
          name: 'Kyiv',
          name_translations: { en: 'Kyiv' },
          time_zone: 'Europe/Kiev',
        },
      };
      // act
      service.getCheapestTickets(fakeFormData);
      // assert
      expect(httpMock.get).toHaveBeenCalledWith(expectedUrl, {
        params: expectedParamsURL,
      });
    });
  });
});
