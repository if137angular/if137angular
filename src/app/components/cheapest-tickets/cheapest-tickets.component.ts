import {Component} from '@angular/core';
import {FlightsInfoService} from 'src/app/services/flights-info.service'
import {TicketsRequestParam} from "../../models/cheapest-tickets.model";
import {Observable} from "rxjs";
import {Select} from "@ngxs/store";
import {RequestDataState} from "../../store/request-data.state";

@Component({
  selector: 'app-cheapest-tickets',
  templateUrl: './cheapest-tickets.component.html',
  styleUrls: ['./cheapest-tickets.component.scss']
})
export class CheapestTicketsComponent {
  ticketsParam: TicketsRequestParam = {
    origin: 'MOW',
    destination: 'HKT',
    departDate: '2022-08',
    returnDate: '2022-09',
    currency: 'USD',
  }

  @Select(RequestDataState.airlines) airlines$: Observable<string[]>;
  ticketsData: any = null

  constructor(private httpService: FlightsInfoService) {}

  requestTickets(ticketsParam: TicketsRequestParam) {
    this.httpService.requestCheapestTickets(ticketsParam)
      .subscribe((response: any) => {

        this.ticketsData = formatDataRequest(response)
        this.airlines$.subscribe(res => {
          findAirlineInfo(this.ticketsData.ticketsArray, Array.from(res))
        });
      })
  }

}


const findAirlineInfo = (ticketsArray: any, airlinesArray : any) => {
  ticketsArray.forEach((ticket : any) => {
    airlinesArray.find((airline: any) => {
      if(airline.id === ticket.airline) {
        ticket.airlineInfo = airline
        delete ticket.airline
      }
    })
  })
}


const formatDataRequest = (requestData: any) => {
  // make new constant value of the key, because API return variable
  const tickets = requestData.data[`${requestData.destination}`]
  // make array from object objects {{}, {}, {}} => [{}, {}, {}]
  requestData.ticketsArray = Object.values(tickets)
  // delete not needed value
  delete requestData.data

  return requestData
}
