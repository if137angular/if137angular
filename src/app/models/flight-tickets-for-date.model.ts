export type FlightInfo = {
  airline: string; 
  departure_at: string;
  destination: string;
  destination_airport: string;
  duration: number; 
  flight_number: string;
  link: string;
  origin: string;
  price: number;
  return_at: string;
  return_transfers: number;
  transfers: number;
};

export type FlightTiketsForDatePayload = {
	codeFrom: string;
	codeTo: string;
	startDate: string;
	endDate: string;
	direct: boolean;
	cardsNumber: number;
}

export type Destinations = {
  code: string;
  name: string;
};

export type TicketsType = {
  destinationFrom: Destinations;
  destinationTo: Destinations;
  endDate: Date;
  startDate: Date;
  transfers: string;
};
