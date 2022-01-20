import {Component, OnInit} from '@angular/core';
import {FlightsInfoService} from 'src/app/services/flights-info.service'
import {map, Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {RequestDataState} from "../../store/request-data.state";
import {FormDataModel} from "../../models/formData.model";
import * as moment from 'moment';

@Component({
  selector: 'app-cheapest-tickets',
  templateUrl: './cheapest-tickets.component.html',
  styleUrls: ['./cheapest-tickets.component.scss']
})
export class CheapestTicketsComponent implements OnInit {
  @Select(RequestDataState.airlines) airlines$: Observable<string[]>;
  ticketsData: any = null
  isTicketData: boolean

  constructor(
    private httpService: FlightsInfoService,
    private store: Store
  ) {}


  ngOnInit() {
    this.store
      .select(RequestDataState.formData)
      .pipe(
        map((state: FormDataModel) => ({
          originInfo: {
            cityName: state.destinationFrom.name,
            cityCode: state.destinationFrom.code,
          },
          destinationInfo: {
            cityName: state.destinationTo.name,
            cityCode: state.destinationTo.code,
          },
          returnDate: moment(state.endDate).format('YYYY-MM-DD'),
          departDate: moment(state.startDate).format('YYYY-MM-DD'),
          currency: 'USD',
        }))
      )
      .subscribe((state) => {
        if(state.originInfo.cityCode && state.destinationInfo.cityCode)
          this.requestTickets(state)
      })

  }



  requestTickets(ticketsParam: any) {
    this.httpService.requestCheapestTickets(ticketsParam)
      .subscribe((response: any) => {
        if(Object.entries(response.data).length === 0 && response.data.constructor === Object) {
          this.isTicketData = false
          return
        }
        this.isTicketData = true
        this.ticketsData = preparingData(response)
        this.airlines$.subscribe(res => {
          findAirlineInfo(this.ticketsData, Array.from(res))
        });
      })
  }

}

const preparingData = (requestData: any) => {
  const reqestTickets = formatTicketsRequest(requestData)

  reqestTickets.forEach((ticket: any) => {
    ticket.departureInfo = {
      cityFrom: requestData.originInfo,
      cityTo: requestData.destinationInfo,
      departureDate: ticket.departure_at
    }

    ticket.returnInfo = {
      cityFrom: requestData.destinationInfo,
      cityTo: requestData.originInfo,
      departureDate: ticket.return_at
    }

    ticket.priceInfo = createPriceInfo(ticket.price, requestData.currency)

    delete ticket.departure_at
    delete ticket.return_at
    delete ticket.price
  })

  return reqestTickets
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


const formatTicketsRequest = (requestData: any) => {
  // make new constant value of the key, because API return variable
  const tickets = requestData.data[`${requestData.destinationInfo.cityCode}`]
  // make array from object objects {{}, {}, {}} => [{}, {}, {}]
  requestData.ticketsArray = Object.values(tickets)

  return requestData.ticketsArray
}

const createPriceInfo = (price: number, currency: string) => {
  let priceInfo = { priceValue: price }
  curencyInfo.find((cur) => {
    if(cur.currencyName === currency) priceInfo = {
      ...priceInfo,
      ...cur
    }
  })
  return priceInfo
}

const curencyInfo = [
  {
    'currencyName': 'USD',
    'currencySymbol': '$',
  },
  {
    'currencyName': 'EUR',
    'currencySymbol': '€',
  },
  {
    'currencyName': 'RUD',
    'currencySymbol': '₽',
  },
]
