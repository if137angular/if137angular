
export interface CheapestTicketsResponseModel {
  currency: string
  data: DestinationFromTicketsModel
  success: boolean
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
}




