import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import * as FlightInfoActions from './flight-info.action';
import { CalendarOfPricesStateModel } from '../models/calendar-of-prices.model';
import { FlightsInfoService } from '../services/flights-info.service';

export interface FlightInfoStateModel {
  calendarOfPrices: CalendarOfPricesStateModel;
  specialOffers: any; // TODO: create model
}

@State<FlightInfoStateModel>({
  name: 'FlightInfoState',
  defaults: {
    calendarOfPrices: {
      loading: false,
      currency: 'uah',
      data: [],
      error: '',
    },
    specialOffers: [],
  },
})
@Injectable()
export class FlightInfoState {
  constructor(
    private flightInfoService: FlightsInfoService,
    private store: Store
  ) {}

  @Selector()
  static calendarOfPrices(
    state: FlightInfoStateModel
  ): CalendarOfPricesStateModel {
    return state.calendarOfPrices;
  }

  @Selector()
  static specialOffers(state: FlightInfoStateModel): any {
    return state.specialOffers;
  }

  @Action(FlightInfoActions.CalendarOfPricesRequested)
  RequestCalendarOfPrices(context: StateContext<FlightInfoStateModel>) {
    const state = context.getState();
    context.patchState({
      calendarOfPrices: {
        ...state.calendarOfPrices,
        loading: true,
      },
    });
  }

  @Action(FlightInfoActions.CalendarOfPricesLoaded)
  LoadCalendarOfPrices(
    context: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CalendarOfPricesLoaded
  ) {
    this.flightInfoService
      .RequestGetCalendarOfPrices(payload)
      .subscribe(({ data, currency }) => {
        const state = context.getState();
        context.patchState({
          calendarOfPrices: {
            ...state,
            loading: false,
            data,
            currency,
          },
        });
      }),
      (error: string) =>
        this.store.dispatch(
          new FlightInfoActions.CalendarOfPricesFailed(error)
        );
  }

  @Action(FlightInfoActions.CalendarOfPricesFailed)
  ErrorCalendarOfPrices(
    context: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CalendarOfPricesFailed
  ) {
    const state = context.getState();
    context.patchState({
      calendarOfPrices: {
        ...state.calendarOfPrices,
        error: payload,
      },
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
}
