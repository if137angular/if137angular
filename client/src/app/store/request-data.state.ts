import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { RequestDataService } from 'src/app/services/request-data.service';
import { tap } from 'rxjs/operators';
import * as RequestDataActions from './request-data.action';
import { CitiesModel } from 'src/app/models/cities.model';
import { FormDataModel } from '../models/formData.model';
import { IpFullModel, IpShortModel } from '../models/ip.model';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { patch } from "@ngxs/store/operators";

export interface RequestDataStateModel {
  countries: any[];
  location: any[];
  cities: CitiesModel[];
  airports: any[];
  airlines: any[];
  currencies: any[];
  languages: any[];
  formData: FormDataModel;
  userData: IpFullModel;
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
    languages: [],
    formData: {
      destinationFrom: {
        code: '',
        name: '',
      },
      destinationTo: {
        name: '',
        code: '',
      },
      endDate: new Date(),
      startDate: new Date(),
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
  },
})
@Injectable()
export class RequestDataState {
  constructor(private requestService: RequestDataService,
    private flightsInfoService: FlightsInfoService) {
  }

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
  static languages(state: RequestDataStateModel): any[] {
    return state.languages;
  }

  @Selector()
  static formData(state: RequestDataStateModel): any {
    return state.formData;
  }

  @Selector()
  static userData(state: RequestDataStateModel): any {
    return state.userData;
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

  @Action(RequestDataActions.GetLanguages)
  GetLanguagesData({ patchState }: StateContext<RequestDataStateModel>) {
    return this.requestService.getLanguagesData().pipe(
      tap((languages: any[]) => {
        patchState({ languages });
      })
    );
  }

  @Action(RequestDataActions.SetFormDate)
  SetFormData(
    { patchState }: StateContext<RequestDataStateModel>,
    { payload }: RequestDataActions.SetFormDate
  ) {
    return patchState({ formData: payload });
  }

  @Action(RequestDataActions.SetUserData)
  GetUserGeolocation(
    ctx: StateContext<RequestDataStateModel>,
  ) {
    return this.flightsInfoService.getIpAddress()
      .pipe(
        tap(
          (ip: IpShortModel) => {
            this.flightsInfoService.getGEOLocation(Object.values(ip)[0])
              .subscribe((userData: IpFullModel) => {
                const state = ctx.getState();
                const defaultCity = state.cities.find((city: CitiesModel) => city.name === userData.city) ||
                {
                  code: 'LWO',
                  name: 'Lviv'
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
                  endDate: new Date(),
                  startDate: new Date(),
                  transfers: '',
                }
                ctx.patchState({
                  ...state,
                  userData,
                  formData
                });
              });
          })
      );
  }
}
