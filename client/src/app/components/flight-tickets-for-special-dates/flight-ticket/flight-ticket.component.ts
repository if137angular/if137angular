import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { FlightInfo } from 'src/app/models/flight-tickets-for-date.model';
import { RequestDataState } from 'src/app/store/request-data.state';

@Component({
  selector: 'app-flight-ticket',
  templateUrl: './flight-ticket.component.html',
  styleUrls: [ './flight-ticket.component.scss' ]
})
export class FlightTicketComponent implements OnInit {

  formData: any;

  @Input() flightInfo: FlightInfo;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.formData = this.store.selectSnapshot(RequestDataState.formData)
  }

  myTime(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return hours + ' hrs ' + minutes + ' mins';
  }

}
