import { CalendarOfPricesPayload } from '../models/calendar-of-prices.model';

//-- Calendar State Actions --
export class CalendarOfPricesRequested {
  static readonly type = '[FlightInfo] CalendarOfPricesRequested';
}

export class CalendarOfPricesLoaded {
  static readonly type = '[FlightInfo] CalendarOfPricesLoaded';
  constructor(public payload: CalendarOfPricesPayload) {}
}

export class CalendarOfPricesFailed {
  static readonly type = '[FlightInfo] CalendarOfPricesFailed';
  constructor(public payload: string) {}
}

export class GetSpecialOffers {
  static readonly type = '[FlightInfo] Get Special Offers';
  constructor(public payload: {
    cityOrigin: string, cityDestination: string, language: string, currency: string
  }) {}
}

export type FlightInfoActions =
  | CalendarOfPricesRequested
  | CalendarOfPricesLoaded
  | CalendarOfPricesFailed;
