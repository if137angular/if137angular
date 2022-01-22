import { CalendarOfPricesPayload } from '../models/calendar-of-prices.model';

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
