import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCalendarOfPricesRequestModel } from '../models/calendar-of-prices.model';
import { DOCUMENT } from "@angular/common";

@Injectable()
export class FlightsInfoService {

  private baseUrl: string;
  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.baseUrl = this.document.location.origin;
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
  RequestGetCalendarOfPrices() {
    const headerDict = {
      'x-access-token': '51b362c72de38be9bcfdc31c8339c019',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get<GetCalendarOfPricesRequestModel>(
      '/v2/prices/week-matrix?currency=usd&origin=LED&destination=HKT&show_to_affiliates=true&depart_date=2022-01-17&return_date=2022-01-24&token=51b362c72de38be9bcfdc31c8339c019',
      requestOptions
    );
  }
  getSpecialOffers(cityOrign: string, locale: string, currency: string): Observable<any> {
    return this.http.get<any>(
      `/aviasales/v3/get_special_offers?origin=${cityOrign}&locale=${locale}&currency=${currency}&token=b482025a8bf39817b6b6f219686b4799`
    );
  }

  requestGetNonStopTickets(): Observable<any> {
    const headerDict = {
      'x-access-token': '4df3f89d6861e092b8f5d30e3d49cde8',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(
      '/v1/prices/direct?origin=MOW&destination=LED&token=4df3f89d6861e092b8f5d30e3d49cde8',
      requestOptions
    );
  }

  getFlightPriceTrends(): Observable<any> {
    const headerDict = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'x-access-token': '51b362c72de38be9bcfdc31c8339c019',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(
      '/v1/prices/calendar?depart_date=2021–11&origin=MOW&destination=BCN&calendar_type=departure_date&token=51b362c72de38be9bcfdc31c8339c019',
      requestOptions
    );
  }
}
