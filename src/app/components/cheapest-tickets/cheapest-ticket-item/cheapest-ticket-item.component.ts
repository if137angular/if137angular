import {Component, Input, OnInit} from '@angular/core';
import {AirlineModel, CheapestTicketModel} from "../../../models/cheapest-tickets.model";
import {FormDataModel} from "../../../models/formData.model";
import {Select} from "@ngxs/store";
import {RequestDataState} from "../../../store/request-data.state";
import {Observable} from "rxjs";
import * as moment from "moment";


@Component({
  selector: 'app-cheapest-ticket-item',
  templateUrl: './cheapest-ticket-item.component.html',
  styleUrls: ['./cheapest-ticket-item.component.scss']
})
export class CheapestTicketItemComponent implements OnInit {
  @Input() ticket: CheapestTicketModel
  @Input() formData: FormDataModel
  @Input() currency: string

  @Select(RequestDataState.airlines) airlines$: Observable<AirlineModel[]>

  airlines: AirlineModel[]
  airlineInfo: AirlineModel
  departTime: string
  departDate: string
  returnTime: string
  returnDate: string
  expiresDate: string

  constructor() { }
  ngOnInit(): void {
    this.initializeDateInfo()
    this.airlines$.subscribe((airlines: AirlineModel[]) => {
      Array.from(airlines).find((airline: AirlineModel) => {
        if(airline.id === this.ticket.airline) this.airlineInfo = airline
      })
    })

  }



  initializeDateInfo()  {
    this.departTime = moment(this.ticket.departure_at).format('HH:mm')
    this.departDate = moment(this.ticket.departure_at).format('D MMM YYYY')
    this.returnTime = moment(this.ticket.return_at).format('HH:mm')
    this.returnDate = moment(this.ticket.return_at).format('D MMM YYYY')
    this.expiresDate = moment(this.ticket.expires_at).format('D MMM YYYY HH:mm')
  }

}
