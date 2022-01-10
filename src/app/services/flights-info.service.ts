import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCalendarOfPricesRequestModel } from '../models/calendar-of-prices.model';

@Injectable()
export class FlightsInfoService {
  constructor(private http: HttpClient) { }

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
  RequestGetCalendarOfPrices() {
    const headerDict = {
      'x-access-token': '51b362c72de38be9bcfdc31c8339c019',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get<GetCalendarOfPricesRequest>(
      '/v2/prices/week-matrix?currency=usd&origin=LED&destination=HKT&show_to_affiliates=true&depart_date=2022-01-17&return_date=2022-01-24&token=51b362c72de38be9bcfdc31c8339c019',
      requestOptions
    );
  }
  getSpecialOffers(originCity: string): Observable<any> {
    return this.http.get<any>(`/aviasales/v3/get_special_offers?origin=${originCity}&currency=usd&token=b482025a8bf39817b6b6f219686b4799`)
  }
}
