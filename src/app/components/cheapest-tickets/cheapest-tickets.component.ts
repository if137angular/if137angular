import {Component} from '@angular/core';
import {FlightsInfoService} from 'src/app/services/flights-info.service'
import {TicketsRequestParam} from "../../models/cheapest-tickets.model";

@Component({
  selector: 'app-cheapest-tickets',
  templateUrl: './cheapest-tickets.component.html',
  styleUrls: ['./cheapest-tickets.component.scss']
})
export class CheapestTicketsComponent {
  ticketsParam: TicketsRequestParam = {
    origin: 'MOW',
    destination: 'HKT',
    departDate: '2022-10',
    returnDate: '2022-02',
    currency: 'USD',
  }
  ticketsData: any = null

  constructor(private httpService: FlightsInfoService) {
  }

  requestTickets(ticketsParam: TicketsRequestParam) {
    this.httpService.requestCheapestTickets(ticketsParam).subscribe((response: any) => {

      // make new constant value of the key, because API return variable
      const tickets = response.data[`${response.destination}`]
      // make array from object objects {{}, {}, {}} => [{}, {}, {}]
      response.ticketsArray = Object.values(tickets)
      // delete not needed value
      delete response.data;

      this.ticketsData = response
      console.log(this.ticketsData)
    })
  }

}
