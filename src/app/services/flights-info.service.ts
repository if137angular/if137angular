import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CalendarOfPricesPayload,
  GetCalendarOfPricesRequestModel,
} from '../models/calendar-of-prices.model';
import { CheapestTicketsResponseModel } from '../models/cheapest-tickets.model';
import { FormDataModel } from '../models/formData.model';
import * as moment from 'moment';
import { GetDestinationPopular } from '../models/city-destination.model';
import { Store } from '@ngxs/store';
import { RequestDataState } from 'src/app/store/request-data.state';
import { environment } from 'src/environments/environment';

@Injectable()
export class FlightsInfoService {
  // TODO change to our own domain
  proxy: string = environment.production ? 'https://fdi.kplsp.com.ua' : '';

  constructor(private http: HttpClient, private store: Store) {}

  getCalendarOfPrices({
    originCode,
    destinationCode,
    depart_date,
    return_date,
  }: CalendarOfPricesPayload): Observable<any> {
    const currency = this.store.selectSnapshot(RequestDataState.currency);
    return this.http.get<GetCalendarOfPricesRequestModel>(
      `${this.proxy}/v2/prices/week-matrix?currency=${currency}&origin=${originCode}&destination=${destinationCode}&show_to_affiliates=true&depart_date=${depart_date}&return_date=${return_date}`
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
      `${this.proxy}/aviasales/v3/get_special_offers?origin=${cityOrigin}&destination=${cityDestination}&locale=${locale}&currency=${currencyFromStore}`
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
      `${this.proxy}/v1/prices/direct?origin=${city}&destination=${destination}&depart_date=${startDate}&return_date=${endDate}&currency=${currencyFromStore}`
    );
  }

  getCheapestTickets(
    formData: FormDataModel
  ): Observable<CheapestTicketsResponseModel> {
    const currencyFromStore = this.store.selectSnapshot(
      RequestDataState.currency
    );

    let paramsURL = new HttpParams()
      .append('origin', formData.destinationFrom.code)
      .append('destination', formData.destinationTo.code)
      .append('depart_date', moment(formData.startDate).format('YYYY-MM-DD'))
      .append('return_date', moment(formData.endDate).format('YYYY-MM-DD'))
      .append('currency', currencyFromStore);

    return this.http.get<CheapestTicketsResponseModel>(
      `${this.proxy}/v1/prices/cheap`,
      {
        params: paramsURL,
      }
    );
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
      `${this.proxy}/v1/prices/calendar?origin=${origin}&destination=${destination}&departure_date=${departDate}&return_date=${returnDate}&currency=${currencyFromStore}&calendar_type=departure_date`
    );
  }

  getFlightTicketsForDate(
    codeFrom: string,
    codeTo: string,
    startDate: string,
    endDate: string,
    direct: boolean,
    numCards: number
  ): Observable<any> {
    const currencyFromStore = this.store.selectSnapshot(
      RequestDataState.currency
    );

    return this.http.get(
      `${this.proxy}/aviasales/v3/prices_for_dates?origin=${codeFrom}&destination=${codeTo}&departure_at=${startDate}&return_at=${endDate}&unique=false&sorting=price&direct=${direct}&currency=${currencyFromStore}&limit=${numCards}&page=1&one_way=true`
    );
  }

  requestPopularDestination(origin: string): Observable<GetDestinationPopular> {
    const currencyFromStore = this.store.selectSnapshot(
      RequestDataState.currency
    );

    return this.http.get<GetDestinationPopular>(
      `${this.proxy}/v1/city-directions?origin=${origin}&currency=${currencyFromStore}`
    );
  }

  getIpAddress(): Observable<any> {
    return this.http.get('https://api.ipify.org/?format=json');
  }

  getGEOLocation(ip: string): Observable<any> {
    let url = `https://api.ipgeolocation.io/ipgeo?ip=${ip}&apiKey=a4503669913f4ef28711027d136d2d68`;
    return this.http.get(url);
  }

  getCovidStatistic(): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': '000debadb3mshd605b33161f98c7p1cfaacjsn38d27d9d7d8e',
    });
    return this.http.get('https://covid-193.p.rapidapi.com/statistics', {
      headers: headers,
    });
  }

  getWeatherForWeek(lat: string, lon: string): Observable<any> {
    let url = `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=2985eb313867605617f21eabece2b4b2`;
    return this.http.get(url);
  }
}
