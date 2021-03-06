import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as countriesData from '../../assets/countries.json';
import * as citiesData from '../../assets/cities.json';
import * as airportsData from '../../assets/airports.json';
import * as airlinesData from '../../assets/airlines.json';
import * as currenciesData from '../../assets/currencies.json';

@Injectable()
export class RequestDataService {
  constructor() {}

  getCountriesData(): Observable<any> {
    return of(Array.from(countriesData));
  }

  getCitiesData(): Observable<any> {
    return of(Array.from(citiesData));
  }

  getAirportsData(): Observable<any> {
    return of(airportsData);
  }

  getCurrenciesData(): Observable<any> {
    return of(Array.from(currenciesData));
  }

  getAirlinesData(): Observable<any> {
    return of(airlinesData);
  }
}
