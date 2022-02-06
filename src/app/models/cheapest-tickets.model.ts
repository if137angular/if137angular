export interface CheapestTicketsResponseModel {
  currency?: string
  data: DestinationFromTicketsModel
  success: boolean,
  error?: string,
  status?: number
}

export interface DestinationFromTicketsModel {
  [key: string]: TicketsObjModel
}

export interface TicketsObjModel {
  [key: string]: CheapestTicketModel
}

export interface CheapestTicketModel {
  airline: string
  departure_at: string
  expires_at: string
  flight_number: number
  price: number
  return_at: string
  duration: number
}

export interface AirlineModel {
  'id': string,
  'lcc': string,
  'name': string,
  'logo': string
}





