export type IpShortModel = {
  ip: string;
};

export type IpFullModel = {
  calling_code: string;
  city: string;
  connection_type: string;
  continent_code: string;
  continent_name: string;
  country_capital: string;
  country_code2: string;
  country_code3: string;
  country_flag: string;
  country_name: string;
  country_tld: string;
  currency: IpFullModelCurrency;
  district: string;
  geoname_id: string;
  ip: string;
  is_eu: boolean;
  isp: string;
  languages: string;
  latitude: string;
  longitude: string;
  organization: string;
  state_prov: string;
  time_zone: IpFullModelTimeZone;
  zipcode: string;
};

export type IpFullModelCurrency = {
  code: string;
  name: string;
  symbol: string;
};

export type IpFullModelTimeZone = {
  current_time: string;
  current_time_unix: number;
  dst_savings: number;
  is_dst: boolean;
  name: string;
  offset: number;
};
