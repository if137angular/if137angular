//-- Request State Actions --
export class GetCountries {
  static readonly type = '[Request] Get All Countries Data';
  constructor(public payload: any = null) { }
}

export class GetCities {
  static readonly type = '[Request] Get All Cities Data';
  constructor(public payload: any = null) { }
}

export class GetAirports {
  static readonly type = '[Request] Get All Airports Data';
  constructor(public payload: any = null) { }
}

export type RequestDataActions =
  GetCountries |
  GetCities |
  GetAirports;
