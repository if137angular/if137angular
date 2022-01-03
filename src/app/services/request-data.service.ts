import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as countriesData from '../../assets/countries.json';
import * as citiesData from '../../assets/cities.json';
import * as airportsData from '../../assets/airports.json';
import { DOCUMENT } from '@angular/common';
import { take } from 'rxjs/operators';

@Injectable()
export class RequestDataService {
  constructor(private httpClient: HttpClient) {}

  getCountriesData(): Observable<any> {
    return of(countriesData).pipe(take(1));
  }

  getCitiesData(): Observable<any> {
    return of(citiesData).pipe(take(1));
  }

  getAirportsData(): Observable<any> {
    return of(airportsData).pipe(take(1));
  }
}
