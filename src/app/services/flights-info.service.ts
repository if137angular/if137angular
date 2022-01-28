import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {
  CalendarOfPricesPayload,
  GetCalendarOfPricesRequestModel,
} from '../models/calendar-of-prices.model';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { FlightTiketsForDatePayload } from '../models/flight-tickets-for-date.model';
import {CheapestTicketsResponseModel} from '../models/cheapest-tickets.model';
import {FormDataModel} from "../models/formData.model";
import * as moment from "moment";
import {GetDestinationPopular} from "../models/city-destination.model";
import { Store } from "@ngxs/store";
import { RequestDataState, RequestDataStateModel } from "src/app/store/request-data.state";

@Injectable()
export class FlightsInfoService {
  constructor(private http: HttpClient, private store: Store) {
  }

  exampleRequestGetChipTickets(): Observable<any> {
    const headerDict = {
      'x-access-token': 'PutYourTokenHere',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(
      '/v2/prices/cheap?origin=LWO&destination=HKT&token=PutYourTokenHere',
      requestOptions
    );
  }

  RequestGetCalendarOfPrices({
                               originCode,
                               destinationCode,
                               depart_date,
                               return_date,
                             }: CalendarOfPricesPayload): Observable<any> {
    const headerDict = {
      'x-access-token': '51b362c72de38be9bcfdc31c8339c019',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const currency = this.store.selectSnapshot(RequestDataState.currency);
    return this.http.get<GetCalendarOfPricesRequestModel>(
      `/v2/prices/week-matrix?currency=${currency}&origin=${originCode}&destination=${destinationCode}&show_to_affiliates=true&depart_date=${depart_date}&return_date=${return_date}&token=51b362c72de38be9bcfdc31c8339c019`,
      requestOptions
    );
  }

  getSpecialOffers(
    cityOrigin: string,
    cityDestination: string,
    locale: string,
    currency: string
  ): Observable<any> {
    const currencyFromStore = this.store.selectSnapshot(RequestDataState.currency);

    return this.http.get<any>(
      `/aviasales/v3/get_special_offers?origin=${cityOrigin}&destination=${cityDestination}&locale=${locale}&currency=${currencyFromStore}&token=b482025a8bf39817b6b6f219686b4799`
    );
  }

  requestGetNonStopTickets(city: string, destination: string, startDate: string, endDate:string): Observable<any> {
    const headerDict = {
      'x-access-token': '4df3f89d6861e092b8f5d30e3d49cde8',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const currency = this.store.selectSnapshot(RequestDataState.currency);

    return this.http.get(
      `/v1/prices/direct?origin=${city}&destination=${destination}&depart_date=${startDate}&return_date=${endDate}&currency=${currency}&token=4df3f89d6861e092b8f5d30e3d49cde8`,
      requestOptions
    );
  }

  requestCheapestTickets(ticketsParam: any): Observable<any> {
    const baseURL: string = '/v1/prices/cheap';
    const myToken: string = 'f29a4f3a27eb2f3ea190c91cd4e15fa5';
    let myHeadersURL = new HttpHeaders().append('x-access-token', myToken);
    const currency = this.store.selectSnapshot(RequestDataState.currency);

    let myParamsURL = new HttpParams()
      .append('origin', ticketsParam.originInfo.cityCode)
      .append('destination', ticketsParam.destinationInfo.cityCode)
      .append('depart_date', ticketsParam.departDate)
      .append('return_date', ticketsParam.returnDate)
      .append('currency', currency)
      .append('token', myToken);

    return this.http
      .get(baseURL, { headers: myHeadersURL, params: myParamsURL })
      .pipe(
        map((response) => ({
          ...response,
          originInfo: ticketsParam.originInfo,
          destinationInfo: ticketsParam.destinationInfo,
        }))
      );
  }

  getCheapestTickets(formData: FormDataModel): Observable<CheapestTicketsResponseModel> {
    const baseURL: string = '/v1/prices/cheap'
    const token: string = 'f29a4f3a27eb2f3ea190c91cd4e15fa5'
    const currency = this.store.selectSnapshot(RequestDataState.currency);

    let headersURL = new HttpHeaders().append('x-access-token', token)
    let paramsURL = new HttpParams()
      .append('origin', formData.destinationFrom.code)
      .append('destination', formData.destinationTo.code)
      .append('depart_date', moment(formData.startDate).format('YYYY-MM-DD'))
      .append('return_date', moment(formData.startDate).format('YYYY-MM-DD'))
      .append('currency', ['EUR', 'USD', 'RUB'].includes(currency) ? currency : 'USD')
      .append('token', token);

    return this.http
      .get<CheapestTicketsResponseModel>(baseURL, {headers: headersURL, params: paramsURL})
  }

  getFlightPriceTrends(
    origin: string,
    destination: string,
    departDate: string,
    returnDate: string,
    currency: string
  ): Observable<any> {
    const headerDict = {
      'x-access-token': '14bd9a873621d433eb0d10b3a2a7cceb',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const currencyFromStore = this.store.selectSnapshot(RequestDataState.currency);

    return this.http.get(
      `/v1/prices/calendar?origin=${origin}&destination=${destination}&departure_date=${departDate}&return_date=${returnDate}&currency=${currencyFromStore}&calendar_type=departure_date&token=14bd9a873621d433eb0d10b3a2a7cceb`,
      requestOptions
    );
  }

  getLocale(): Observable<any> {
    const headerDict = {
      'x-access-token': '8f399398f352163f2c3e4cb293d221e3',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(
      '/whereami?locale=uk&ip=194.44.160.160',
      requestOptions
    );
  }

  getIpAddress(): Observable<any> {
    return this.http
      .get('https://api.ipify.org/?format=json')
      .pipe(catchError(this.handleError));
  }

  getGEOLocation(ip: string): Observable<any> {
    let url =
      'https://api.ipgeolocation.io/ipgeo?apiKey=a4503669913f4ef28711027d136d2d68&ip=' +
      ip;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  getFlightTicketsForDate(
    // {
    //   codeFrom,
    //   codeTo,
    //   startDate,
    //   endDate,
    //   direct
    // }: FlightTiketsForDatePayload
    codeFrom: string,
    codeTo: string,
    startDate: string,
    endDate: string,
    direct: boolean
  ): Observable<any> {
    const headerDict = {
      'x-access-token': 'd077e8cd07cd09cedc63a920f064b1ab',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const currencyFromStore = this.store.selectSnapshot(RequestDataState.currency);

    return this.http.get(
      `/aviasales/v3/prices_for_dates?origin=${codeFrom}&destination=${codeTo}&departure_at=${startDate}&return_at=${endDate}&unique=false&sorting=price&direct=${direct}&currency=${currencyFromStore}&limit=15&page=1&one_way=true&token=d077e8cd07cd09cedc63a920f064b1ab`,
      requestOptions
    );
  }

  requestPopularDestination(origin: string): Observable<GetDestinationPopular> {
    const headerDict = {
      'x-access-token': 'fd45945b3cf27c0f371a6a177e5c8adc',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const currencyFromStore = this.store.selectSnapshot(RequestDataState.currency);

    return this.http.get<GetDestinationPopular>(
      `/v1/city-directions?origin=${origin}&currency=${currencyFromStore}&token=fd45945b3cf27c0f371a6a177e5c8adc`,
      requestOptions
    );
  }
}
