import {Component, Input, OnInit} from '@angular/core';
import {AirlineModel, CheapestTicketModel} from "../../../models/cheapest-tickets.model";
import {FormDataModel} from "../../../models/formData.model";
import {Select, Store} from "@ngxs/store";
import {RequestDataState} from "../../../store/request-data.state";
import {Observable} from "rxjs";

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

  constructor() { }
  ngOnInit(): void {
    this.airlines$.subscribe((airlines: AirlineModel[]) => {
      Array.from(airlines).find((airline: AirlineModel) => {
        if(airline.id === this.ticket.airline) this.airlineInfo = airline
      })
    })
  }

}
