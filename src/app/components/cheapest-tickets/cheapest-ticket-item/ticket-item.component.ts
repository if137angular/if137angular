import {Component, Input, OnInit} from '@angular/core'
import * as moment from 'moment';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  @Input() ticketData : any
  @Input() currency: any
  @Input() origin: string
  @Input() destination: string

  ticketInfo: any
  constructor() { }

  ngOnInit(): void {
    this.ticketInfo = {
      ...this.ticketData,
      origin: this.origin,
      destination: this.destination,
      expires_at: createDateParts(this.ticketData.expires_at),
      departure_at:  createDateParts(this.ticketData.departure_at),
      return_at:  createDateParts(this.ticketData.return_at),
      price: createPriceInfo(this.ticketData.price, this.currency)
    }
  }

}

const createDateParts = (dateUTC: any) => ({
  departureDate: moment(dateUTC).format('E MMM YYYY'),
  departureTime: moment(dateUTC).format('HH:mm'),
  departureFullDate: dateUTC,
})

const createPriceInfo = (price: any, currency: any) => {
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



