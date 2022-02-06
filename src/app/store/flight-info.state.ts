import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { from, of } from 'rxjs';
import { mergeMap, toArray, map } from 'rxjs/operators';
import * as _ from 'lodash';

import { RequestDataState } from './request-data.state';
import * as FlightInfoActions from './flight-info.action';
import { FlightsInfoService } from '../services/flights-info.service';
import filterArray from 'src/utils/filterFunc';

import {
  CheapestTicketModel,
  CheapestTicketsResponseModel,
  TicketsObjModel,
} from '../models/cheapest-tickets.model';

import {
  DestinationPopular,
  GetDestinationPopular,
  CityInfo,
} from '../models/city-destination.model';

import {
  CheapestTicketsRequestFail,
  CheapestTicketsRequestSuccess,
} from './flight-info.action';

import { FlightPriceTrends } from 'src/app/models/flight-price-trends.model';
import { FilterModel } from '../models/filter.model';
import { FilterConfigModel } from 'src/app/models/filter-config.model';
import { CitiesModel } from '../models/cities.model';
import { CalendarOfPricesModel } from '../models/calendar-of-prices.model';
import { FlightInfo } from '../models/flight-tickets-for-date.model';

export interface FlightInfoStateModel {
  calendarOfPrices: CalendarOfPricesModel[];
  specialOffers: any; // TODO: create model;
  nonStopTickets: any; // TODO: create model
  // flightTiketsForDate: UniversalComponentModel[];
  flightTiketsForDate: any;
  flightPriceTrends: any;
  popularDestinations: Map<CityInfo, DestinationPopular[]>;
  filter: FilterModel;
  filterConfig: FilterConfigModel;
  loading: boolean;
  cheapestTickets: any;
  errors: string;
}

@State<FlightInfoStateModel>({
  name: 'FlightInfoState',
  defaults: {
    calendarOfPrices: [],
    specialOffers: [],
    flightTiketsForDate: [],
    cheapestTickets: [],
    nonStopTickets: [],
    flightPriceTrends: [],
    popularDestinations: new Map<CityInfo, DestinationPopular[]>(),
    filter: {
      flightClass: null,
      gate: null,
      transfers: null,
      minPrice: null,
      maxPrice: null,
    },
    filterConfig: {
      maxPrice: 150,
      minPrice: 1,
      airline: false,
      expires: false,
      destination: false,
    },
    loading: false,
    errors: '',
  },
})
@Injectable()
export class FlightInfoState {
  constructor(
    private flightInfoService: FlightsInfoService,
    private store: Store
  ) {}

  @Selector()
  static calendarOfPrices(state: FlightInfoStateModel): any {
    return state.calendarOfPrices;
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
  static cheapestTickets(state: FlightInfoStateModel): any {
    return filterArray(state.cheapestTickets, state.filter);
  }

  @Selector()
  static specialOffers(state: FlightInfoStateModel): any {
    return filterArray(state.specialOffers, state.filter);
  }

  @Selector()
  static flightPriceTrends(state: FlightInfoStateModel): any {
    return filterArray(state.flightPriceTrends, state.filter);
  }
  @Selector()
  static popularDestinations(state: FlightInfoStateModel): any {
    return state.popularDestinations;
  }

  @Selector()
  static filter(state: FlightInfoStateModel): FilterModel {
    return state.filter;
  }
  @Selector()
  static filterConfig(state: FlightInfoStateModel): FilterConfigModel {
    return state.filterConfig;
  }

  @Selector()
  static loading(state: FlightInfoStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static errors(state: FlightInfoStateModel): string | null {
    return state.errors;
  }

  @Action(FlightInfoActions.CalendarOfPricesLoaded)
  LoadCalendarOfPrices(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CalendarOfPricesLoaded
  ) {
    this.flightInfoService
      .RequestGetCalendarOfPrices(payload)
      .subscribe(({ data }) => {
        patchState({
          calendarOfPrices: data,
        });
      });
  }

  @Action(FlightInfoActions.GetTiketsForSpecialDate)
  LoadTiketsForSpecialDate(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.GetTiketsForSpecialDate
  ) {
    patchState({ loading: true });

    this.flightInfoService
      .getFlightTicketsForDate(
        payload.codeFrom,
        payload.codeTo,
        payload.startDate,
        payload.endDate,
        payload.direct
      )
      .subscribe((response) => {
        const data: any = Object.values(response.data);
        const filterConfig: FilterConfigModel = {
          maxPrice:
            _.maxBy(
              data,
              (flightTiketsForDate: FlightInfo) => flightTiketsForDate.price
            )?.price || 150,
          minPrice:
            _.minBy(
              data,
              (flightTiketsForDate: FlightInfo) => flightTiketsForDate.price
            )?.price || 1,
          expires: false,
          destination: true,
          airline: true,
          flightClass: false,
          gate: false,
        };

        patchState({
          flightTiketsForDate: data,
          loading: false,
          filterConfig,
        });
      });
  }

  @Action(FlightInfoActions.GetSpecialOffers)
  GetSpecialOffers(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.GetSpecialOffers
  ) {
    patchState({ loading: true });

    this.flightInfoService
      .getSpecialOffers(
        payload.cityOrigin,
        payload.cityDestination,
        payload.language,
        payload.currency
      )
      .subscribe((response) => {
        const data: any = Object.values(response.data);
        const filterConfig: FilterConfigModel = {
          maxPrice:
            _.maxBy(data, (specialOffers: any) => specialOffers.price)?.price ||
            150,
          minPrice:
            _.minBy(data, (specialOffers: any) => specialOffers.price)?.price ||
            1,
          airline: true,
          expires: true,
          destination: true,
          // For test, change to your elements
          flightClass: false,
          gate: false,
        };

        patchState({
          specialOffers: data,
          loading: false,
          filterConfig,
        });
      });
  }

  @Action(FlightInfoActions.GetFlightPriceTrends)
  GetFlightPriceTrends(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.GetFlightPriceTrends
  ) {
    patchState({ loading: true });

    this.flightInfoService
      .getFlightPriceTrends(
        payload.origin,
        payload.destination,
        payload.departDate,
        payload.returnDate
      )
      .subscribe((response) => {
        const data: any = Object.values(response.data);
        const filterConfig: FilterConfigModel = {
          maxPrice:
            _.maxBy(
              data,
              (flightPriceTrend: FlightPriceTrends) => flightPriceTrend.price
            )?.price || 150,
          minPrice:
            _.minBy(
              data,
              (flightPriceTrend: FlightPriceTrends) => flightPriceTrend.price
            )?.price || 1,
          airline: true,
          expires: true,
          destination: true,
          // For test, change to your elements
          flightClass: true,
          gate: true,
        };

        patchState({
          flightPriceTrends: data,
          loading: false,
          filterConfig,
        });
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

  @Action(FlightInfoActions.CheapestTicketsRequest)
  CheapestTicketsRequest(
    { patchState, dispatch }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CheapestTicketsRequest
  ) {
    patchState({ loading: true });

    if (!payload.destinationFrom.code)
      dispatch(new CheapestTicketsRequestFail('No destination from city'));
    else if (!payload.destinationTo.code)
      dispatch(new CheapestTicketsRequestFail('No destination to city'));
    else
      this.flightInfoService
        .getCheapestTickets(payload)
        .subscribe((response: CheapestTicketsResponseModel) => {
          if (Object.keys(response.data).length == 0)
            dispatch(
              new CheapestTicketsRequestFail(
                'There are no tickets in the selected direction'
              )
            );
          else dispatch(new CheapestTicketsRequestSuccess(response));
        });
  }

  @Action(FlightInfoActions.CheapestTicketsRequestSuccess)
  CheapestTicketsRequestSuccess(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CheapestTicketsRequestSuccess
  ) {
    const ticketsObj: TicketsObjModel = Object.values(payload.data)[0];
    const ticketsArray: CheapestTicketModel[] = Object.values(ticketsObj);
    const filterConfig: FilterConfigModel = {
      maxPrice:
        _.maxBy(
          ticketsArray,
          (cheapestTickets: CheapestTicketModel) => cheapestTickets.price
        )?.price || 150,
      minPrice:
        _.minBy(
          ticketsArray,
          (cheapestTickets: CheapestTicketModel) => cheapestTickets.price
        )?.price || 1,
      expires: true,
      destination: true,
      airline: true,
      flightClass: false,
      gate: false,
    };

    patchState({
      cheapestTickets: ticketsArray,
      errors: '',
      loading: false,
      filterConfig,
    });
  }

  @Action(FlightInfoActions.CheapestTicketsRequestFail)
  CheapestTicketsRequestFail(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CheapestTicketsRequestFail
  ) {
    patchState({ errors: payload });
  }

  @Action(FlightInfoActions.GetNonStopTickets)
  GetNonStopTickets(
    { patchState }: StateContext<FlightInfoStateModel>,
    { formData }: FlightInfoActions.GetNonStopTickets
  ) {
    patchState({ loading: true });

    return this.flightInfoService
      .requestGetNonStopTickets(
        formData.destinationFrom.code,
        formData.destinationTo.code,
        formData.startDate.toISOString().slice(0, 7),
        formData.endDate.toISOString().slice(0, 7)
      )
      .subscribe((response: any) => {
        const nonStopTickets: any = Object.values(response.data)[0];

        patchState({
          nonStopTickets: nonStopTickets ? Object.values(nonStopTickets) : [],
          loading: false,
        });
      });
  }

  @Action(FlightInfoActions.GetPopularDestinations)
  GetPopularDestinations(
    { patchState }: StateContext<FlightInfoStateModel>,
    payload: FlightInfoActions.GetPopularDestinations
  ) {
    from(payload.payload)
      .pipe(
        mergeMap((cityCode: string) =>
          this.flightInfoService.requestPopularDestination(cityCode)
        ),
        toArray(),
        mergeMap((response: GetDestinationPopular[]) =>
          of(response).pipe(
            map((res: GetDestinationPopular[]) =>
              res.map((r: GetDestinationPopular) => Object.values(r.data))
            ),
            map((r: any) => _.flattenDeep(r)),
            map((r: any) => _.groupBy(r, (item) => item.destination))
          )
        )
      )
      .subscribe((popularDestinations: any) => {
        const response: Map<CityInfo, DestinationPopular[]> = new Map<
          CityInfo,
          DestinationPopular[]
        >();
        this.currency = this.store.selectSnapshot(RequestDataState.currency);
        Object.keys(popularDestinations).forEach((key: string) => {
          if (popularDestinations[key].length > 3) {
            popularDestinations[key].forEach((item: DestinationPopular) => {
              item.originName = this.getCityNameByKey(item.origin);
              item.destinationName = this.getCityNameByKey(item.destination);
              item.currencyCode = this.getCurrency(item.price);
            });
            const cityInfo: CityInfo = {
              cityName: this.getCityNameByKey(key),
              countryCode: this.getCountryCodeByCityCode(key),
            };
            response.set(cityInfo, popularDestinations[key]);
          }
        });
        patchState({ popularDestinations: response });
      });
  }

  getCityNameByKey(cityKey: string) {
    const matchedCity = this.store
      .selectSnapshot(RequestDataState.cities)
      .find((city: CitiesModel) => city.code === cityKey);
    return matchedCity ? matchedCity.name : '';
  }

  getCountryCodeByCityCode(countryKey: string): string {
    const matchedCountry = this.store
      .selectSnapshot(RequestDataState.cities)
      .find((city: CitiesModel) => city.code === countryKey);
    return matchedCountry ? matchedCountry.country_code : '';
  }

  language: string = 'en';
  currency: string = 'uah';

  getCurrency(number: any) {
    let language = this.language;
    return new Intl.NumberFormat(language.substring(0, 2), {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 0,
    }).format(number);
  }
}
