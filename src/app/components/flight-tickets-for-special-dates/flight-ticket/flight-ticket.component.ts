import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FlightInfo } from 'src/app/models/flight-tickets-for-date.model';
import { FormDataModel } from 'src/app/models/formData.model';
import { RequestDataState } from 'src/app/store/request-data.state';

@Component({
  selector: 'app-flight-ticket',
  templateUrl: './flight-ticket.component.html',
  styleUrls: [ './flight-ticket.component.scss' ]
})
export class FlightTicketComponent implements OnInit {

  @Select(RequestDataState.currency) currency$: Observable<string>
  formData: FormDataModel;

  @Input() flightInfo: FlightInfo;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.formData = this.store.selectSnapshot(RequestDataState.formData)
  }

  flightDuration(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return `${hours} hrs ${minutes} mins`;
  }

}
