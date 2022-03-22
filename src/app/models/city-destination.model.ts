export type DestinationPopular = {
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  currencyCode: string;
  countryCode: string;
  departure_at: Date;
  return_at: Date;
  expires_at: Date;
  number_of_changes: number;
  price: number;
  found_at: Date;
  transfers: number;
  airline: string;
  flight_number: number;
};

export type GetDestinationPopular = {
  success: boolean;
  data: Map<string, DestinationPopular>;
  currency: string;
};

export type CityInfo = {
  cityName: string;
  countryCode: string;
};

export interface IMapData extends DestinationPopular {
  id: string;
  title: string;
  geometry: {
    type: string,
    coordinates: string[],
  };
}
