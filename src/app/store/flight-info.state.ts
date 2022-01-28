import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as FlightInfoActions from './flight-info.action';
import { CalendarOfPricesModel } from '../models/calendar-of-prices.model';
import { FlightsInfoService } from '../services/flights-info.service';
import { FilterModel } from '../models/filter.model';
import filterArray from 'src/utils/filterFunc';
import { startOfDay } from 'date-fns';

import { CheapestTicketModel, CheapestTicketsResponseModel, TicketsObjModel } from "../models/cheapest-tickets.model";
import { CheapestTicketsRequestFail, CheapestTicketsRequestSuccess, StartLoading } from "./flight-info.action";


export interface FlightInfoStateModel {
  calendarOfPrices: CalendarOfPricesModel[];
  specialOffers: any; // TODO: create model;
  nonStopTickets: any // TODO: create model
  flightTiketsForDate: any;
  flightPriceTrends: any;
  currency: string;
  filter: FilterModel;
  loading: boolean;
  cheapestTickets: CheapestTicketModel[] | null,
  errors: string | null
}

@State<FlightInfoStateModel>({
  name: 'FlightInfoState',
  defaults: {
    calendarOfPrices: [],
    specialOffers: [],
    flightTiketsForDate: [],
    cheapestTickets: null,
    nonStopTickets: [],
    flightPriceTrends: [],
    currency: 'uah',
    filter: {
      flightClass: null,
      gate: null,
      transfers: null,
      minPrice: null,
      maxPrice: null,
    },
    loading: false,
    errors: null
  },
})
@Injectable()
export class FlightInfoState {
  constructor(private flightInfoService: FlightsInfoService) {
  }

  @Selector()
  static calendarOfPrices(state: FlightInfoStateModel): any {
    return state.calendarOfPrices.map(
      ({ depart_date, return_date, value, found_at, gate }) => ({
        start: startOfDay(new Date(found_at)),
        title: `Price: ${value} Gate: ${gate} ${depart_date}-${return_date} `,

      })
    );
  }

  @Selector()
  static specialOffers(state: FlightInfoStateModel): any {
    return filterArray(state.specialOffers, state.filter);
  }

  @Selector()
  static flightTiketsForDate(state: FlightInfoStateModel): any {
    return filterArray(state.flightTiketsForDate, state.filter);
  }
  @Selector()
  static nonStopTickets(state: FlightInfoStateModel): any {
    return filterArray(state.nonStopTickets, state.filter);
  }

  @Selector()
  static flightPriceTrends(state: FlightInfoStateModel): any {
    return filterArray(state.flightPriceTrends, state.filter);
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

  @Selector()
  static cheapestTickets(state: FlightInfoStateModel): any {
    return state.cheapestTickets;
  }

  @Action(FlightInfoActions.CalendarOfPricesLoaded)
  LoadCalendarOfPrices(
    context: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CalendarOfPricesLoaded
  ) {
    context.patchState({ loading: true });
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

// **** Action for my component ***
  @Action(FlightInfoActions.GetTiketsForSpecialDate)
  LoadTiketsForSpecialDate(
    context: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.GetTiketsForSpecialDate
  ) {
    context.patchState({ loading: true });
    this.flightInfoService
      .getFlightTicketsForDate(
        payload.codeFrom,
        payload.codeTo,
        payload.startDate,
        payload.endDate,
        payload.direct,
      )
      .subscribe((flightTiketsForDate: { data: any }) => {
        context.patchState({ flightTiketsForDate: flightTiketsForDate.data, loading: false })
      })
  }

  // **** End Action for my component ***

  @Action(FlightInfoActions.GetSpecialOffers)
  GetSpecialOffers(
    context: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.GetSpecialOffers
  ) {
    context.patchState({ loading: true });
    this.flightInfoService
      .getSpecialOffers(
        payload.cityOrigin,
        payload.cityDestination,
        payload.language,
        payload.currency
      )
      .subscribe((specialOffers: { data: any }) => {
        context.patchState({ specialOffers: specialOffers.data, loading: false });
      });
  }

  @Action(FlightInfoActions.GetFlightPriceTrends)
  GetFlightPriceTrends(
    context: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.GetFlightPriceTrends
  ) {
    context.patchState({ loading: true });
    this.flightInfoService
      .getFlightPriceTrends(
        payload.origin,
        payload.destination,
        payload.departDate,
        payload.returnDate,
      )
      .subscribe((response) => {
        const data = Object.values(response.data);
        context.patchState({ flightPriceTrends: data, loading: false })
      })
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

  @Action(FlightInfoActions.CheapestTicketsRequest)
  CheapestTicketsRequest(
    { patchState, dispatch }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CheapestTicketsRequest
  ) {
    dispatch(new StartLoading());

    if (!payload.destinationFrom.code)
      dispatch(new CheapestTicketsRequestFail('No destination from city'))
    else if (!payload.destinationTo.code)
      dispatch(new CheapestTicketsRequestFail('No destination to city'))

    else this.flightInfoService.getCheapestTickets(payload)
        .subscribe((response: CheapestTicketsResponseModel) => {
          dispatch(new CheapestTicketsRequestSuccess(response))
        })
  }

  @Action(FlightInfoActions.CheapestTicketsRequestSuccess)
  CheapestTicketsRequestSuccess(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CheapestTicketsRequestSuccess
  ) {
    const ticketsObj: TicketsObjModel = Object.values(payload.data)[0]
    patchState({
      cheapestTickets: Object.values(ticketsObj),
      errors: null,
      loading: false,
      currency: payload.currency
    })
  }

  @Action(FlightInfoActions.CheapestTicketsRequestFail)
  CheapestTicketsRequestFail(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CheapestTicketsRequestFail
  ) {
    patchState({ errors: payload, loading: false })
  }

  @Action(FlightInfoActions.GetNonStopTickets)
  GetNonStopTickets(
    { patchState }: StateContext<FlightInfoStateModel>,
    { formData }: FlightInfoActions.GetNonStopTickets
  ) {
    patchState({ loading: true })
    return this.flightInfoService.requestGetNonStopTickets(
      formData.destinationFrom.code,
      formData.destinationTo.code,
      formData.startDate.toISOString().slice(0, 7),
      formData.endDate.toISOString().slice(0, 7)
    ).subscribe((response: any) => {
      const nonStopTickets: any = Object.values(response.data)[0];
        patchState({ nonStopTickets: Object.values(nonStopTickets), loading: false })
      })
  }
}
