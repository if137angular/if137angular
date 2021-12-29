import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import * as countriesData from '../../assets/countries.json';
import * as citiesData from '../../assets/cities.json';
import * as airportsData from '../../assets/airports.json';
import { DOCUMENT } from "@angular/common";
import { take } from 'rxjs/operators';

@Injectable()
export class RequestDataService {
  baseUrl: string;
  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.baseUrl = this.document.location.origin;
  }

  getCountriesData(): Observable<any> {
    return of(countriesData).pipe(
      take(1)
    )
  }

  getCitiesData(): Observable<any> {
    return of(citiesData).pipe(
      take(1)
    )
  }

  getAirportsData(): Observable<any> {
    return of(airportsData).pipe(
      take(1)
    )
  }

  exampleRequestGetChipTickets() {
    const headerDict = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'x-access-token': 'a178f5b65a824a9f54d30f2f37421ac2'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.request('get', this.baseUrl + '/prices/cheap?origin=LWO&destination=HKT&token=a178f5b65a824a9f54d30f2f37421ac2', requestOptions)
  }
}