import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as FlightInfoActions from './flight-info.action';
import { CalendarOfPricesModel } from '../models/calendar-of-prices.model';
import { FlightsInfoService } from '../services/flights-info.service';
import { FilterModel } from '../models/filter.model';
import filterArray from 'src/utils/filterFunc';

export interface FlightInfoStateModel {
  calendarOfPrices: CalendarOfPricesModel[];
  specialOffers: any; // TODO: create model
  currency: string;
  filter: FilterModel;
  loading: boolean;
}

@State<FlightInfoStateModel>({
  name: 'FlightInfoState',
  defaults: {
    calendarOfPrices: [],
    specialOffers: [],
    currency: 'uah',
    filter: {
      flightClass: null,
      gate: null,
      transfers: null,
      minPrice: null,
      maxPrice: null,
    },
    loading: false,
  },
})
@Injectable()
export class FlightInfoState {
  constructor(private flightInfoService: FlightsInfoService) {}

  @Selector()
  static calendarOfPrices(state: FlightInfoStateModel): any {
    return filterArray(state.calendarOfPrices, state.filter);
  }

  @Selector()
  static specialOffers(state: FlightInfoStateModel): any {
    return filterArray(state.specialOffers, state.filter);
  }

  @Selector()
  static currency(state: FlightInfoStateModel): string {
    return state.currency;
  }

  @Selector()
  static filter(state: FlightInfoStateModel): FilterModel {
    return state.filter;
  }

  @Selector()
  static loading(state: FlightInfoStateModel): boolean {
    return state.loading;
  }

  @Action(FlightInfoActions.CalendarOfPricesLoaded)
  LoadCalendarOfPrices(
    context: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CalendarOfPricesLoaded
  ) {
    this.flightInfoService
      .RequestGetCalendarOfPrices(payload)
      .subscribe(({ data, currency }) => {
        context.patchState({
          calendarOfPrices: data,
          currency,
          loading: false,
        });
      });
  }

  @Action(FlightInfoActions.GetSpecialOffers)
  GetSpecialOffers(
    context: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.GetSpecialOffers
  ) {
    this.flightInfoService
      .getSpecialOffers(
        payload.cityOrigin,
        payload.cityDestination,
        payload.language,
        payload.currency
      )
      .subscribe((specialOffers: { data: any }) => {
        context.patchState({ specialOffers: specialOffers.data });
      });
  }

  @Action(FlightInfoActions.SetFilter)
  SetFilter(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.SetFilter
  ) {
    patchState({
      filter: payload,
    });
  }

  @Action(FlightInfoActions.StartLoading)
  StartLoading({ patchState }: StateContext<FlightInfoStateModel>) {
    patchState({
      loading: true,
    });
  }

  @Action(FlightInfoActions.StopLoading)
  StopLoading({ patchState }: StateContext<FlightInfoStateModel>) {
    patchState({
      loading: false,
    });
  }
}
