import { CalendarOfPricesPayload } from '../models/calendar-of-prices.model';
import { FilterModel } from '../models/filter.model';
import { FlightTiketsForDatePayload } from '../models/flight-tickets-for-date.model';

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

// ***** Code for Flight-Tikets-For-Special-Date *******


export class GetTiketsForSpecialDate {
  static readonly type = '[FlightInfo] Get Tikets For Special Date';
  constructor(public payload: FlightTiketsForDatePayload) {}
}

// ***** End code Flight-Tikets-For-Special-Price  ******

export class SetFilter {
  static readonly type = '[Filter] Set Filter Data';
  constructor(public payload: FilterModel) {}
}

export class StartLoading {
  static readonly type = '[Loading] Start Loading';
}
