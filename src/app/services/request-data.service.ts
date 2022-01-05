import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import * as countriesData from '../../assets/countries.json';
import * as citiesData from '../../assets/cities.json';
import * as airportsData from '../../assets/airports.json';

@Injectable()
export class RequestDataService {
  constructor() {
  }

  getCountriesData(): Observable<any> {
    return of(countriesData)
  }

  getCitiesData(): Observable<any> {
    return of(citiesData)
  }

  getAirportsData(): Observable<any> {
    return of(airportsData)
  }
}