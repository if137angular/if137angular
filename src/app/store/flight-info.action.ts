import { CalendarOfPricesPayload } from '../models/calendar-of-prices.model';
import { FilterModel } from '../models/filter.model';
import { FlightTiketsForDatePayload } from '../models/flight-tickets-for-date.model';
import {FormDataModel} from "../models/formData.model";
import {CheapestTicketsResponseModel} from "../models/cheapest-tickets.model";
import { FlightPriceTrendsRequest } from '../models/flight-price-trends.model';


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

export class GetNonStopTickets {
  static readonly type = '[FlightInfo] Get Non Stop Tickets';
  constructor(public formData: FormDataModel) {
  }
}

// ***** Code for Flight-Tikets-For-Special-Date *******


export class GetTiketsForSpecialDate {
  static readonly type = '[FlightInfo] Get Tikets For Special Date';
  constructor(public payload: FlightTiketsForDatePayload) {}
}

// ***** End code Flight-Tikets-For-Special-Price  ******

export class GetFlightPriceTrends {
  static readonly type = '[FlightInfo] Get Tikets For Special Date';
  constructor(public payload: FlightPriceTrendsRequest) {}
}


export class SetFilter {
  static readonly type = '[Filter] Set Filter Data';
  constructor(public payload: FilterModel) {}
}

export class StartLoading {
  static readonly type = '[Loading] Start Loading';
}

export class StopLoading {
  static readonly type = '[Loading] Stop Loading';
}

export class CheapestTicketsRequest {
  static readonly type = '[FlightInfo] Cheapest Tickets Request'
  constructor(public payload: FormDataModel) {  }
}

export class CheapestTicketsRequestSuccess {
  static readonly type = '[FlightInfo] Cheapest Tickets Request Success'
  constructor(public payload: CheapestTicketsResponseModel) {  }
}

export class CheapestTicketsRequestFail {
  static readonly type = '[FlightInfo] Cheapest Tickets Request Fail'
  constructor(public payload: string) {  }
}
