import { CalendarOfPricesPayload } from '../models/calendar-of-prices.model';
import { FilterModel } from '../models/filter.model';

//-- Calendar State Actions --

export class CalendarOfPricesLoaded {
  static readonly type = '[FlightInfo] CalendarOfPricesLoaded';
  constructor(public payload: CalendarOfPricesPayload) {}
}

export class GetSpecialOffers {
  static readonly type = '[FlightInfo] Get Special Offers';
  constructor(
    public payload: {
      cityOrigin: string;
      cityDestination: string;
      language: string;
      currency: string;
    }
  ) {}
}

export class SetFilter {
  static readonly type = '[Filter] Set Filter Data';
  constructor(public payload: FilterModel) {}
}

export type FlightInfoActions = CalendarOfPricesLoaded;
