import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import * as FlightInfoActions from './flight-info.action';
import {CalendarOfPricesModel} from '../models/calendar-of-prices.model';
import {FlightsInfoService} from '../services/flights-info.service';
import {FilterModel} from '../models/filter.model';
import filterArray from 'src/utils/filterFunc';
import {startOfDay} from 'date-fns';

import {CheapestTicketModel, CheapestTicketsResponseModel, TicketsObjModel} from "../models/cheapest-tickets.model";
import {
  CheapestTicketsRequestFail,
  CheapestTicketsRequestSuccess,
  StartLoading,
  StopLoading
} from "./flight-info.action";


export interface FlightInfoStateModel {
  calendarOfPrices: CalendarOfPricesModel[];
  specialOffers: any; // TODO: create model
  flightTiketsForDate: any;
  currency: string;
  filter: FilterModel;
  loading: boolean;
  cheapestTickets: CheapestTicketModel[] | null,
  errors: string
}

@State<FlightInfoStateModel>({
  name: 'FlightInfoState',
  defaults: {
    calendarOfPrices: [],
    specialOffers: [],
    flightTiketsForDate: [],
    cheapestTickets: null,
    currency: 'uah',
    filter: {
      flightClass: null,
      gate: null,
      transfers: null,
      minPrice: null,
      maxPrice: null,
    },
    loading: false,
    errors: ''
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
  static cheapestTickets(state: FlightInfoStateModel): CheapestTicketModel[] | null {
    return state.cheapestTickets
  }

  @Selector()
  static errors(state: FlightInfoStateModel): string | null {
    return state.errors
  }

  @Action(FlightInfoActions.CalendarOfPricesLoaded)
  LoadCalendarOfPrices(
    context: StateContext<FlightInfoStateModel>,
    {payload}: FlightInfoActions.CalendarOfPricesLoaded
  ) {
    this.flightInfoService
      .RequestGetCalendarOfPrices(payload)
      .subscribe(({data, currency}) => {
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
    {payload}: FlightInfoActions.GetTiketsForSpecialDate
  ) {
    this.flightInfoService
      .getFlightTicketsForDate(
        payload.codeFrom,
        payload.codeTo,
        payload.startDate,
        payload.endDate,
        payload.direct,
      )
      .subscribe((flightTiketsForDate: { data: any }) => {
        context.patchState({flightTiketsForDate: flightTiketsForDate.data, loading: false})
      })
  }

  // **** End Action for my component ***

  @Action(FlightInfoActions.GetSpecialOffers)
  GetSpecialOffers(
    context: StateContext<FlightInfoStateModel>,
    {payload}: FlightInfoActions.GetSpecialOffers
  ) {
    this.flightInfoService
      .getSpecialOffers(
        payload.cityOrigin,
        payload.cityDestination,
        payload.language,
        payload.currency
      )
      .subscribe((specialOffers: { data: any }) => {
        context.patchState({specialOffers: specialOffers.data});
      });
  }

  @Action(FlightInfoActions.SetFilter)
  SetFilter(
    {patchState}: StateContext<FlightInfoStateModel>,
    {payload}: FlightInfoActions.SetFilter
  ) {
    patchState({
      filter: payload,
    });
  }

  @Action(FlightInfoActions.StartLoading)
  StartLoading({patchState}: StateContext<FlightInfoStateModel>) {
    patchState({
      loading: true,
    });
  }

  @Action(FlightInfoActions.StopLoading)
  StopLoading({patchState}: StateContext<FlightInfoStateModel>) {
    patchState({
      loading: false,
    });
  }

  @Action(FlightInfoActions.CheapestTicketsRequest)
  CheapestTicketsRequest(
    {patchState, dispatch}: StateContext<FlightInfoStateModel>,
    {payload}: FlightInfoActions.CheapestTicketsRequest
  ) {
    dispatch(new StartLoading())

    if (!payload.destinationFrom.code)
      dispatch(new CheapestTicketsRequestFail('No destination from city'))
    else if (!payload.destinationTo.code)
      dispatch(new CheapestTicketsRequestFail('No destination to city'))

    else this.flightInfoService.getCheapestTickets(payload)
        .subscribe((response: CheapestTicketsResponseModel) => {
          if(Object.keys(response.data).length == 0) dispatch(
            new CheapestTicketsRequestFail('There are no tickets in the selected direction')
          )
          else dispatch(new CheapestTicketsRequestSuccess(response))
        })
  }

  @Action(FlightInfoActions.CheapestTicketsRequestSuccess)
  CheapestTicketsRequestSuccess(
    {patchState, dispatch}: StateContext<FlightInfoStateModel>,
    {payload}: FlightInfoActions.CheapestTicketsRequestSuccess
  ) {
    dispatch(new StopLoading())

    const ticketsObj: TicketsObjModel = Object.values(payload.data)[0]
    patchState({
      cheapestTickets: Object.values(ticketsObj),
      errors: '',
      currency: payload.currency
    })
  }

  @Action(FlightInfoActions.CheapestTicketsRequestFail)
  CheapestTicketsRequestFail(
    {patchState, dispatch}: StateContext<FlightInfoStateModel>,
    {payload}: FlightInfoActions.CheapestTicketsRequestFail
  ) {
    dispatch(new StopLoading())
    patchState({errors: payload})
  }
}
