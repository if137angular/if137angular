import { CalendarOfPricesModel } from '../models/calendar-of-prices.model';

//-- Calendar State Actions --
export class CalendarOfPricesRequested {
  static readonly type = '[FlightInfo] CalendarOfPricesRequested';
}

export class CalendarOfPricesLoaded {
  static readonly type = '[FlightInfo] CalendarOfPricesLoaded';
}

export class CalendarOfPricesFailed {
  static readonly type = '[FlightInfo] CalendarOfPricesFailed';
  constructor(public payload: string) {}
}

export class FetchCalendarOfPrices {
  static readonly type = '[FlightInfo] FetchCalendarOfPrices';
}

export type FlightInfoActions =
  | CalendarOfPricesRequested
  | CalendarOfPricesLoaded
  | CalendarOfPricesFailed
  | FetchCalendarOfPrices;
