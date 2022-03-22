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

import { FlightPriceTrendsModel } from 'src/app/models/flight-price-trends.model';
import { FilterModel } from '../models/filter.model';
import { FilterConfigModel } from 'src/app/models/filter-config.model';
import { CitiesModel } from '../models/cities.model';
import { CalendarOfPricesModel } from '../models/calendar-of-prices.model';
import { FlightInfo } from '../models/flight-tickets-for-date.model';
import { UniversalComponentModel } from '../models/universal-component.model';

export interface FlightInfoStateModel {
  flightTicketsForDate: UniversalComponentModel[];
  nonStopTickets: UniversalComponentModel[];
  cheapestTickets: UniversalComponentModel[];
  specialOffers: UniversalComponentModel[];
  flightPriceTrends: UniversalComponentModel[];

  calendarOfPrices: CalendarOfPricesModel[];
  popularDestinations: Map<CityInfo, DestinationPopular[]>;

  filter: FilterModel;
  filterConfig: FilterConfigModel;
  loading: boolean;
  errors: string;
  mapData: any;
}

@State<FlightInfoStateModel>({
  name: 'FlightInfoState',
  defaults: {
    calendarOfPrices: [],
    specialOffers: [],
    flightTicketsForDate: [],
    cheapestTickets: [],
    nonStopTickets: [],
    flightPriceTrends: [],
    popularDestinations: new Map<CityInfo, DestinationPopular[]>(),
    mapData: [],
    filter: {
      flightClass: null,
      gate: null,
      transfers: null,
      airline: null,
      airline_titles: null,
      minPrice: null,
      maxPrice: null,
      minDuration: null,
      maxDuration: null,
    },
    filterConfig: {
      maxPrice: 150,
      minPrice: 1,
      maxDuration: 150,
      minDuration: 1,
      airline: false,
      airline_titles: false,
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
  ) { }

  @Selector()
  static calendarOfPrices(state: FlightInfoStateModel): any {
    return state.calendarOfPrices;
  }

  @Selector()
  static nonStopTickets(state: FlightInfoStateModel): any {
    return state.nonStopTickets;
  }

  @Selector()
  static flightTicketsForDate(state: FlightInfoStateModel): any {
    return filterArray(state.flightTicketsForDate, state.filter);
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

  @Selector()
  static mapData(state: FlightInfoStateModel): any {
    return state.mapData;
  }

  @Action(FlightInfoActions.CalendarOfPrices)
  LoadCalendarOfPrices(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CalendarOfPrices
  ) {
    this.flightInfoService
      .getCalendarOfPrices(payload)
      .subscribe(({ data }) => {
        patchState({
          calendarOfPrices: data,
        });
      });
  }

  @Action(FlightInfoActions.GetTicketsForSpecialDate)
  LoadTicketsForSpecialDate(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.GetTicketsForSpecialDate
  ) {
    patchState({ loading: true });

    this.flightInfoService
      .getFlightTicketsForDate(
        payload.codeFrom,
        payload.codeTo,
        payload.startDate,
        payload.endDate,
        payload.direct,
        payload.cardsNumber
      )
      .subscribe((response) => {
        const data: any = Object.values(response.data);
        const filterConfig: FilterConfigModel = {
          maxPrice:
            _.maxBy(
              data,
              (flightTicketsForDate: FlightInfo) => flightTicketsForDate.price
            )?.price || 150,
          minPrice:
            _.minBy(
              data,
              (flightTicketsForDate: FlightInfo) => flightTicketsForDate.price
            )?.price || 1,

          maxDuration:
            _.maxBy(
              data,
              (flightTicketsForDate: FlightInfo) =>
                flightTicketsForDate.duration
            )?.duration || 150,
          minDuration:
            _.minBy(
              data,
              (flightTicketsForDate: FlightInfo) =>
                flightTicketsForDate.duration
            )?.duration || 1,
          expires: false,
          destination: true,
          airline: true,
          airline_titles: false,
          flightClass: false,
          gate: false,
        };

        patchState({
          flightTicketsForDate: data,
          loading: false,
          filter: {
            minPrice: null,
            maxPrice: null,
            minDuration: null,
            maxDuration: null,
          },
        });
        if (payload.cardsNumber === 10) {
          patchState({
            filterConfig,
          });
        }
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
            _.maxBy(data, (specialOffers: UniversalComponentModel) => specialOffers.price)?.price ||
            150,
          minPrice:
            _.minBy(data, (specialOffers: UniversalComponentModel) => specialOffers.price)?.price ||
            1,

          maxDuration:
            _.maxBy(data, (specialOffers: UniversalComponentModel) => specialOffers.duration)
              ?.duration || 150,
          minDuration:
            _.minBy(data, (specialOffers: UniversalComponentModel) => specialOffers.duration)
              ?.duration || 1,

          airline: true,
          airline_titles: true,
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
          filter: {
            minPrice: null,
            maxPrice: null,

            minDuration: null,
            maxDuration: null,
          },
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
        const data: any = Object.values(response.data).map((element: any) =>
          Object.assign(element, {
            airline_title: Object.values(
              this.store.selectSnapshot(RequestDataState.airlines)
            ).find((airline: any) => airline.id === element.airline).name,
          })
        );
        const filterConfig: FilterConfigModel = {
          maxPrice:
            _.maxBy(
              data,
              (flightPriceTrend: FlightPriceTrendsModel) =>
                flightPriceTrend.price
            )?.price || 150,
          minPrice:
            _.minBy(
              data,
              (flightPriceTrend: FlightPriceTrendsModel) =>
                flightPriceTrend.price
            )?.price || 1,

          airline: false,
          airline_titles: true,
          expires: true,
          destination: true,
          // For test, change to your elements
          flightClass: false,
          gate: false,
        };

        patchState({
          flightPriceTrends: data,
          loading: false,
          filterConfig,
          filter: {
            minPrice: null,
            maxPrice: null,

            minDuration: null,
            maxDuration: null,
          },
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
          if (!response.success && response.error) {
            dispatch(new CheapestTicketsRequestFail(response.error));
          } else if (
            response.success &&
            Object.keys(response.data).length === 0
          ) {
            dispatch(
              new CheapestTicketsRequestFail(
                'There are no tickets in the selected direction'
              )
            );
          } else if (
            response.success &&
            Object.keys(response.data).length > 0
          ) {
            dispatch(new CheapestTicketsRequestSuccess(response));
          }
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
        _.maxBy(ticketsArray, (cheapestTickets) => cheapestTickets.price)
          ?.price || 150,
      minPrice:
        _.minBy(ticketsArray, (cheapestTickets) => cheapestTickets.price)
          ?.price || 1,

      maxDuration:
        _.maxBy(ticketsArray, (cheapestTickets) => cheapestTickets.duration)
          ?.duration || 150,
      minDuration:
        _.minBy(ticketsArray, (cheapestTickets) => cheapestTickets.duration)
          ?.duration || 1,
      expires: false,
      airline: false,
      airline_titles: false,
    };

    patchState({
      cheapestTickets: ticketsArray,
      errors: '',
      loading: false,
      filterConfig,
      filter: {
        minPrice: null,
        maxPrice: null,

        minDuration: null,
        maxDuration: null,
      },
    });
  }

  @Action(FlightInfoActions.CheapestTicketsRequestFail)
  CheapestTicketsRequestFail(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.CheapestTicketsRequestFail
  ) {
    patchState({ errors: payload, loading: false });
  }

  @Action(FlightInfoActions.GetNonStopTickets)
  GetNonStopTickets(
    { patchState }: StateContext<FlightInfoStateModel>,
    { formData }: FlightInfoActions.GetNonStopTickets
  ) {
    patchState({ loading: true });

    this.flightInfoService
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
          filter: {
            minPrice: null,
            maxPrice: null,

            minDuration: null,
            maxDuration: null,
          },
        });
      });
  }

  @Action(FlightInfoActions.GetPopularDestinations)
  GetPopularDestinations(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.GetPopularDestinations
  ) {
    patchState({ loading: true });

    from(payload)
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
        const currencyFromStore = this.store.selectSnapshot(
          RequestDataState.currency
        );

        Object.keys(popularDestinations)
          .sort()
          .forEach((key: string) => {
            if (popularDestinations[key].length > 3) {
              popularDestinations[key].forEach((item: DestinationPopular) => {
                item.originName = this.getCityNameByKey(item.origin);
                item.destinationName = this.getCityNameByKey(item.destination);
                item.currencyCode =
                  item.price + ' ' + currencyFromStore.toUpperCase();
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

  @Action(FlightInfoActions.GetMapData)
  GetMapData(
    { patchState }: StateContext<FlightInfoStateModel>,
    { payload }: FlightInfoActions.GetMapData
  ) {
    this.flightInfoService
      .requestPopularDestination(payload)
      .subscribe((res: GetDestinationPopular) => {
        const objValues: DestinationPopular[] = Object.values(res.data);
        objValues.forEach((objValues: DestinationPopular) => {
          const matchedCity = this.getCityByCode(objValues.destination);
          Object.assign(objValues, {
            id: matchedCity ? matchedCity.name.toLowerCase() : '',
            title: matchedCity ? matchedCity.name : '',
            geometry: {
              type: 'Point',
              coordinates: matchedCity
                ? [matchedCity.coordinates.lon, matchedCity.coordinates.lat]
                : [],
            },
          });
        });
        patchState({ mapData: objValues, loading: false });
      });
  }

  getCityByCode(cityCode: string): CitiesModel {
    const cities = this.store.selectSnapshot(RequestDataState.cities);
    const matchedCity = cities.find(
      (city: CitiesModel) => city.code === cityCode && city.code !== 'MOW'
    );
    return matchedCity;
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
}
