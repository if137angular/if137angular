export type FlightInfo = {
	loading: boolean;
	airline: string;
	departure_at: string;
	destination: string;
	duration: number;
	flight_number: string;
	origin: string;
	price: number;
	return_at: string;
}

export type FlightTiketsForDatePayload = {
	codeFrom: string;
	codeTo: string;
	startDate: string;
	endDate: string;
	direct: boolean;
}

export type Destinations = {
	code: string;
	name: string;
}

export type TicketsType = {
	destinationFrom: Destinations;
	destinationTo: Destinations;
	endDate: Date;
	startDate: Date;
	transfers: string;
}
