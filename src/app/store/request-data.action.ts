//-- Request State Actions --
export class GetCountries {
  static readonly type = '[Request] Get All Countries Data';
  constructor(public payload: any = null) { }
}

export class GetLocation {
  static readonly type = '[Request] Get Location Data';
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


export class GetAirlines {
  static readonly type = '[Request] Get All Airlines Data';

  constructor(public payload: any = null) {
  }
}

export class SetFormDate {
  static readonly type = '[Request] Set Form Data';
  constructor(public payload: any) { }
}

export type RequestDataActions =
  GetCountries |
  GetCities |
  GetAirports |
  GetAirlines;
