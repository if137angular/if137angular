import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as countriesData from '../../assets/countries.json';
import * as locationData from '../../assets/location.json';
import * as citiesData from '../../assets/cities.json';
import * as airportsData from '../../assets/airports.json';
import * as airlinesData from '../../assets/airlines.json';
import * as currenciesData from '../../assets/currencies.json';
import * as languagesData from '../../assets/languages.json';


@Injectable()
export class RequestDataService {
  constructor() {
  }

  getCountriesData(): Observable<any> {
    return of(Array.from(countriesData))
  }

  getLocationData(): Observable<any> {
    return of(Array.from(locationData))
  }

  getCitiesData(): Observable<any> {
    return of(Array.from(citiesData))
  }

  getAirportsData(): Observable<any> {
    return of(airportsData)
  }

  getCurrenciesData(): Observable<any> {
    return of(Array.from(currenciesData))
  }

  getLanguagesData(): Observable<any> {
    return of(Array.from(languagesData))
  }

  getAirlinesData(): Observable<any> {
    return of(airlinesData)
  }
}