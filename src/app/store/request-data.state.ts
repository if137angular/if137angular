import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { RequestDataService } from "src/app/services/request-data.service";
import { tap } from "rxjs/operators";
import * as RequestDataActions from "./request-data.action";

export interface RequestDataStateModel {
  countries: any[],
  cities: any[],
  airports: any[]
}

@State<RequestDataStateModel>({
    name: 'RequestDataState',
    defaults: {
      countries: [],
      cities: [],
      airports: []
    }
  }
)

@Injectable()
export class RequestDataState {
  constructor(private requestService: RequestDataService) {
  }
  @Selector()
  static countries(state: RequestDataStateModel): any[] {
    return state.countries;
  }

  @Selector()
  static cities(state: RequestDataStateModel): any[] {
    return state.cities;
  }

  @Selector()
  static airports(state: RequestDataStateModel): any[] {
    return state.airports;
  }

  @Action(RequestDataActions.GetCountries)
  GetCountriesData({ patchState }: StateContext<RequestDataStateModel>) {
    return this.requestService.getCountriesData().pipe(
      tap((countries: any[]) => {
        patchState({ countries })
      })
    )
  }

  @Action(RequestDataActions.GetCities)
  GetCitiesData({ patchState }: StateContext<RequestDataStateModel>) {
    return this.requestService.getCitiesData().pipe(
      tap((cities: any[]) => {
        patchState({ cities })
      })
    )
  }

  @Action(RequestDataActions.GetAirports)
  GetAirportsData({ patchState }: StateContext<RequestDataStateModel>) {
    return this.requestService.getAirportsData().pipe(
      tap((airports: any[]) => {
        patchState({ airports })
      })
    )
  }
}
