import { IpFullModel } from '../models/ip.model';

//-- Request State Actions --
export class GetCountries {
  static readonly type = '[Request] Get All Countries Data';
  constructor(public payload: any = null) {}
}

export class GetLocation {
  static readonly type = '[Request] Get Location Data';
  constructor(public payload: any = null) {}
}

export class GetCities {
  static readonly type = '[Request] Get All Cities Data';
  constructor(public payload: any = null) {}
}

export class GetAirports {
  static readonly type = '[Request] Get All Airports Data';
  constructor(public payload: any = null) {}
}

export class GetAirlines {
  static readonly type = '[Request] Get All Airlines Data';

  constructor(public payload: any = null) {}
}

export class GetCurrencies {
  static readonly type = '[Request] Get All Currencies Data';
  constructor(public payload: any = null) {}
}

export class GetLanguages {
  static readonly type = '[Request] Get All Languages Data';
  constructor(public payload: any = null) {}
}

export class SetFormDate {
  static readonly type = '[Request] Set Form Data';
  constructor(public payload: any) {}
}

export class SetUserData {
  static readonly type = '[Request] Set User Data from Ip';
  constructor() {}
}

export type RequestDataActions =
  | GetCountries
  | GetCities
  | GetAirports
  | GetAirlines
  | GetCurrencies
  | GetLanguages
  | SetUserData;
