import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';

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

  describe('#getFlightPriceTrends', () => {
    it('should call http with appropriate params', () => {
      const expectedParams = `/v1/prices/calendar?origin=LWO&destination=MIL&departure_date=2022-02&return_date=2022-02&currency=USD&calendar_type=departure_date`;
      service.getFlightPriceTrends('LWO', 'MIL', '2022-02', '2022-02');
    });
  });
});
