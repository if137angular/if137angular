import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {RequestDataState} from '../../store/request-data.state';
import {Observable} from 'rxjs';
import {FormDataModel} from '../../models/formData.model';
import {CheapestTicketsRequest} from '../../store/flight-info.action';
import {FlightInfoState} from '../../store/flight-info.state';
import {CheapestTicketModel} from '../../models/cheapest-tickets.model';

@Component({
  selector: 'app-cheapest-tickets',
  templateUrl: './cheapest-tickets.component.html',
  styleUrls: ['./cheapest-tickets.component.scss']
})
export class CheapestTicketsComponent implements OnInit {

  @Select(RequestDataState.formData) formData$: Observable<FormDataModel>
  @Select(FlightInfoState.cheapestTickets) cheapestTickets$: Observable<CheapestTicketModel[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.formData$.subscribe(((formData: FormDataModel) => {
      if (!formData.isFormValid) { return; }
      this.store.dispatch(new CheapestTicketsRequest(formData))
    }))
  }

}
