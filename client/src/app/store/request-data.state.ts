import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { RequestDataService } from 'src/app/services/request-data.service';
import { tap } from 'rxjs/operators';
import * as RequestDataActions from './request-data.action';
import { CitiesModel } from 'src/app/models/cities.model';
import { FormDataModel } from '../models/formData.model';
import { SpecialOffersSelectModel } from './../models/special-offers.model';

export interface RequestDataStateModel {
  countries: any[];
  location: any[];
  cities: CitiesModel[];
  airports: any[];
  airlines: any[];
  currencies: any[],
  languages: any[],
  formData: FormDataModel; // TODO: create model
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
        name: '',
        code: '',
      },
      destinationTo: {
        name: '',
        code: '',
      },
      endDate: new Date(),
      startDate: new Date(),
      transfers: '',
    },
  },
})
@Injectable()
export class RequestDataState {
  constructor(private requestService: RequestDataService) { }

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

  @Action(RequestDataActions.GetCountries)
  GetCountriesData({ patchState }: StateContext<RequestDataStateModel>) {
    return this.requestService.getCountriesData().pipe(
      tap((countries: any[]) => {
        patchState({ countries });
      })
    );
  }

  @Action(RequestDataActions.GetLocation)
  GetLocationData({ patchState }: StateContext<RequestDataStateModel>) {
    return this.requestService.getLocationData().pipe(
      tap((location: any[]) => {
        patchState({ location });
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
}
