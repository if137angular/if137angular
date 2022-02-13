export interface FlightPriceTrendsModel {
  airline: string;
  departure_at: string;
  destination: string;
  expires_at: string;
  flight_number: number;
  origin: string;
  price: number;
  return_at: string;
  transfers: number;
}

export interface FlightPriceTrendsRequest {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
}
