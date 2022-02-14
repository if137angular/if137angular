import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { RequestDataService } from 'src/app/services/request-data.service';
import { tap } from 'rxjs/operators';
import * as RequestDataActions from './request-data.action';
import { CitiesModel } from 'src/app/models/cities.model';
import { FormDataModel } from '../models/formData.model';
import { IpFullModel, IpShortModel } from '../models/ip.model';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import * as moment from 'moment';
import { WeatherDataModel } from '../models/weather-data.model';

export interface RequestDataStateModel {
  countries: any[];
  location: any[];
  cities: CitiesModel[];
  airports: any[];
  airlines: any[];
  currencies: any[];
  currency: string;
  formData: FormDataModel;
  userData: IpFullModel;
  weatherData: WeatherDataModel;
}

@State<RequestDataStateModel>({
  name: 'RequestDataState',
  defaults: {
    countries: [],
    location: [],
    cities: [],
    airports: [],
    airlines: [],
    currencies: [],
    currency: localStorage.getItem('currency') ?? 'uah',
    formData: {
      destinationFrom: {
        code: '',
        name: '',
      },
      destinationTo: {
        name: '',
        code: '',
      },
      startDate: new Date(),
      endDate: new Date(),
      transfers: '',
    },
    userData: {
      calling_code: '',
      city: '',
      connection_type: '',
      continent_code: '',
      continent_name: '',
      country_capital: '',
      country_code2: '',
      country_code3: '',
      country_flag: '',
      country_name: '',
      country_tld: '',
      currency: {
        code: '',
        name: '',
        symbol: '',
      },
      district: '',
      geoname_id: '',
      ip: '',
      is_eu: false,
      isp: '',
      languages: '',
      latitude: '',
      longitude: '',
      organization: '',
      state_prov: '',
      time_zone: {
        current_time: '',
        current_time_unix: 0,
        dst_savings: 0,
        is_dst: false,
        name: '',
        offset: 0,
      },
      zipcode: '',
    },
    weatherData: {
      lat: 33.44,
      lon: -94.04,
      timezone: 'America/Chicago',
      timezone_offset: -21600,
      daily: [
        {
          dt: 1,
          sunrise: 1,
          sunset: 1,
          moonrise: 1,
          moonset: 1,
          moon_phase: 0.44,
          temp: {
            day: 1.97,
            min: 1.78,
            max: 1.41,
            night: 1.15,
            eve: 1.34,
            morn: 1.16,
          },
          feels_like: {
            day: 1.42,
            night: 1.2,
            eve: 1.01,
            morn: 1.79,
          },
          pressure: 1,
          humidity: 1,
          dew_point: 0.37,
          wind_speed: 1.83,
          wind_deg: 1,
          wind_gust: 1.69,
          weather: [
            {
              id: 1,
              main: '',
              description: '',
              icon: '',
            },
          ],
          clouds: 0,
          pop: 0,
          uvi: 1.38,
        },
      ],
    },
  },
})
@Injectable()
export class RequestDataState {
  constructor(
    private requestService: RequestDataService,
    private flightsInfoService: FlightsInfoService
  ) {}

  @Selector()
  static countries(state: RequestDataStateModel): any[] {
    return state.countries;
  }

  @Selector()
  static location(state: RequestDataStateModel): any[] {
    return state.location;
  }

  @Selector()
  static cities(state: RequestDataStateModel): any[] {
    return state.cities;
  }

  @Selector()
  static airports(state: RequestDataStateModel): any[] {
    return state.airports;
  }

  @Selector()
  static airlines(state: RequestDataStateModel): any[] {
    return state.airlines;
  }

  @Selector()
  static currencies(state: RequestDataStateModel): any[] {
    return state.currencies;
  }

  @Selector()
  static currency(state: RequestDataStateModel): string {
    return state.currency;
  }

  @Selector()
  static formData(state: RequestDataStateModel): any {
    return state.formData;
  }

  @Selector()
  static userData(state: RequestDataStateModel): any {
    return state.userData;
  }

  @Selector()
  static weatherData(state: RequestDataStateModel): any {
    return state.weatherData;
  }

  @Action(RequestDataActions.GetCountries)
  GetCountriesData({ patchState }: StateContext<RequestDataStateModel>) {
    return this.requestService.getCountriesData().pipe(
      tap((countries: any[]) => {
        patchState({ countries });
      })
    );
  }

  @Action(RequestDataActions.GetCities)
  GetCitiesData({ patchState }: StateContext<RequestDataStateModel>) {
    return this.requestService.getCitiesData().pipe(
      tap((cities: any[]) => {
        patchState({ cities });
      })
    );
  }

  @Action(RequestDataActions.GetAirports)
  GetAirportsData({ patchState }: StateContext<RequestDataStateModel>) {
    return this.requestService.getAirportsData().pipe(
      tap((airports: any[]) => {
        patchState({ airports });
      })
    );
  }

  @Action(RequestDataActions.GetAirports)
  GetAirLinesData({ patchState }: StateContext<RequestDataStateModel>) {
    return this.requestService.getAirlinesData().pipe(
      tap((airlines: any[]) => {
        patchState({ airlines });
      })
    );
  }

  @Action(RequestDataActions.GetCurrencies)
  GetCurrenciesData({ patchState }: StateContext<RequestDataStateModel>) {
    return this.requestService.getCurrenciesData().pipe(
      tap((currencies: any[]) => {
        patchState({ currencies });
      })
    );
  }

  @Action(RequestDataActions.SetCurrency)
  SetCurrencyData(
    { patchState }: StateContext<RequestDataStateModel>,
    payload: RequestDataActions.SetCurrency
  ) {
    patchState({ currency: payload.currency });
    localStorage.setItem('currency', payload.currency);
  }

  @Action(RequestDataActions.SetFormDate)
  SetFormData(
    { patchState }: StateContext<RequestDataStateModel>,
    { formData }: RequestDataActions.SetFormDate
  ) {
    patchState({ formData });
  }

  @Action(RequestDataActions.GetWeather)
  GetWeather(
    { patchState }: StateContext<RequestDataStateModel>,
    { lat, lon }: RequestDataActions.GetWeather
  ) {
    this.flightsInfoService
      .getWeatherForWeek(lat, lon)
      .subscribe((data) => patchState({ weatherData: data }));
  }

  @Action(RequestDataActions.SetUserData)
  GetUserGeolocation({
    patchState,
    getState,
    dispatch,
  }: StateContext<RequestDataStateModel>) {
    return this.flightsInfoService.getIpAddress().pipe(
      tap((ip: IpShortModel) => {
        this.flightsInfoService
          .getGEOLocation(Object.values(ip)[0])
          .subscribe((userData: IpFullModel) => {
            const state = getState();

            const defaultCity = state.cities.find(
              (city: CitiesModel) => city.name === userData.city
            ) || {
              code: 'LWO',
              name: 'Lviv',
            };

            const formData = {
              destinationFrom: {
                code: defaultCity.code,
                name: defaultCity.name,
              },
              destinationTo: {
                name: '',
                code: '',
              },
              startDate: new Date(),
              endDate: moment().add(7, 'days').toDate(),
              transfers: 'All',
            };

            dispatch(
              new RequestDataActions.GetWeather(
                userData.latitude,
                userData.longitude
              )
            );

            patchState({
              ...state,
              userData,
              formData,
            });
          });
      })
    );
  }
}
