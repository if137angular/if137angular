import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';

describe('FlightsInfoService', () => {
  let service: FlightsInfoService;
  let httpMock: any;
  let storeMock: any;
  beforeEach(() => {
    httpMock = {
      get: jasmine.createSpy('get')
    };
    storeMock = {
      selectSnapshot: jasmine.createSpy('selectSnapshot')
        .withArgs(RequestDataState.currency).and.returnValue('USD'),
    }
    service = new FlightsInfoService(httpMock, storeMock);
  })

  describe('#getSpecialOffers', () => {
    it('should call http with appropriate params', () => {
      // arrange
      storeMock.selectSnapshot = jasmine.createSpy('selectSnapshot').and.returnValue('USD');
      const expectedParams = '/aviasales/v3/get_special_offers?origin=LVO&destination=WAW&locale=EN&currency=USD&token=b482025a8bf39817b6b6f219686b4799';
      // act
      service.getSpecialOffers('LVO', 'WAW', 'EN');
      // assert
      expect(httpMock.get)
        .toHaveBeenCalledWith(expectedParams)
    })
  })
})
