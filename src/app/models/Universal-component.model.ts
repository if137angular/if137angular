export type UniversalComponentModel = {
  value: number;
  trip_class?: number;
  show_to_affiliates?: boolean;
  origin?: string;
  destination?: string;
  gate?: string;
  depart_date?: Date;
  return_date?: Date;
  number_of_changes: number;
  found_at?: Date;
  duration: number;
  distance?: number;
  actual?: boolean;
  price: number;
  airline?: string;
  airline_title?: string;
  flight_number?: string;
  departure_at?: string;
  return_at?: string;
  expires_at?: string;
}