import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  CalendarOfPricesPayload,
  GetCalendarOfPricesRequestModel,
} from '../models/calendar-of-prices.model';
import { catchError } from 'rxjs/operators';
import { CheapestTicketsResponseModel } from '../models/cheapest-tickets.model';
import { FormDataModel } from '../models/formData.model';
import * as moment from 'moment';
import { GetDestinationPopular } from '../models/city-destination.model';
import { Store } from '@ngxs/store';
import { RequestDataState } from 'src/app/store/request-data.state';

@Injectable()
export class FlightsInfoService {
  constructor(private http: HttpClient, private store: Store) {}

  RequestGetCalendarOfPrices({
    originCode,
    destinationCode,
    depart_date,
    return_date,
  }: CalendarOfPricesPayload): Observable<any> {
    const currency = this.store.selectSnapshot(RequestDataState.currency);
    return this.http.get<GetCalendarOfPricesRequestModel>(
      `/v2/prices/week-matrix?currency=${currency}&origin=${originCode}&destination=${destinationCode}&show_to_affiliates=true&depart_date=${depart_date}&return_date=${return_date}`
    );
  }

  getSpecialOffers(
    cityOrigin: string,
    cityDestination: string,
    locale: string,
    currencyFromStore: string
  ): Observable<any> {
    currencyFromStore = this.store.selectSnapshot(RequestDataState.currency);

    return this.http.get(
      `/aviasales/v3/get_special_offers?origin=${cityOrigin}&destination=${cityDestination}&locale=${locale}&currency=${currencyFromStore}`
    );
  }

  requestGetNonStopTickets(
    city: string,
    destination: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const currencyFromStore = this.store.selectSnapshot(
      RequestDataState.currency
    );

    return this.http.get(
      `/v1/prices/direct?origin=${city}&destination=${destination}&depart_date=${startDate}&return_date=${endDate}&currency=${currencyFromStore}`
    );
  }

  getCheapestTickets(
    formData: FormDataModel
  ): Observable<CheapestTicketsResponseModel> {
    const currencyFromStore = this.store.selectSnapshot(RequestDataState.currency);

    let paramsURL = new HttpParams()
      .append('origin', formData.destinationFrom.code)
      .append('destination', formData.destinationTo.code)
      .append('depart_date', moment(formData.startDate).format('YYYY-MM-DD'))
      .append('return_date', moment(formData.startDate).format('YYYY-MM-DD'))
      .append('currency', currencyFromStore);

    return this.http.get<CheapestTicketsResponseModel>('/v1/prices/cheap', {
      params: paramsURL,
    });
  }

  getFlightPriceTrends(
    origin: string,
    destination: string,
    departDate: string,
    returnDate: string
  ): Observable<any> {
    const currencyFromStore = this.store.selectSnapshot(
      RequestDataState.currency
    );

    return this.http.get(
      `/v1/prices/calendar?origin=${origin}&destination=${destination}&departure_date=${departDate}&return_date=${returnDate}&currency=${currencyFromStore}&calendar_type=departure_date`
    );
  }

  getIpAddress(): Observable<any> {
    return this.http
      .get('https://api.ipify.org/?format=json')
      .pipe(catchError(this.handleError));
  }

  getGEOLocation(ip: string): Observable<any> {
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=a4503669913f4ef28711027d136d2d68&ip=${ip}`;
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
    codeFrom: string,
    codeTo: string,
    startDate: string,
    endDate: string,
    direct: boolean
  ): Observable<any> {
    const currencyFromStore = this.store.selectSnapshot(
      RequestDataState.currency
    );

    return this.http.get(
      `/aviasales/v3/prices_for_dates?origin=${codeFrom}&destination=${codeTo}&departure_at=${startDate}&return_at=${endDate}&unique=false&sorting=price&direct=${direct}&currency=${currencyFromStore}&limit=15&page=1&one_way=true`
    );
  }

  requestPopularDestination(origin: string): Observable<GetDestinationPopular> {
    const currencyFromStore = this.store.selectSnapshot(
      RequestDataState.currency
    );

    return this.http.get<GetDestinationPopular>(
      `/v1/city-directions?origin=${origin}&currency=${currencyFromStore}`
    );
  }
}
