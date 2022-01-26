export interface FlightInfo {
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
