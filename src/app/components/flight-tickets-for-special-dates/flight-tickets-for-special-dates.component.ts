import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';
import { FlightInfo } from 'src/app/models/flight-tickets-for-date.model';
import { GetTiketsForSpecialDate, StartLoading } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';


@Component({
  selector: 'app-flight-tickets-for-special-dates',
  templateUrl: './flight-tickets-for-special-dates.component.html',
  styleUrls: ['./flight-tickets-for-special-dates.component.scss']
})
export class FlightTicketsForSpecialDatesComponent implements OnInit, OnDestroy {
  @Select(RequestDataState.formData)
  formData$: Observable<any> // TODO: type

  formData: any;
  flightInfo: FlightInfo[];
  // flightInfo: any;

  loading: boolean;

  constructor(private flightInfoService: FlightsInfoService, private store: Store) { }

  ngOnInit(): void {
    this.store
      .select(FlightInfoState.flightTiketsForDate)
      .subscribe((state) => (this.flightInfo = state));

    this.store.select(FlightInfoState.loading)
      .subscribe(loading => this.loading = loading);

    this.formData = this.formData$.subscribe(formData => {

      const payload = {
        codeFrom: formData.destinationFrom.code,
        codeTo: formData.destinationTo.code,
        startDate: formData.startDate.toISOString().slice(0, 10),
        endDate: formData.endDate.toISOString().slice(0, 10),
        direct: formData.transfers  === 'Directly'
      }

      this.store.dispatch([new StartLoading(), new GetTiketsForSpecialDate(payload)])
        .subscribe((data: any) => {
          this.flightInfo = data
        })
    });
  }

  ngOnDestroy(): void {
      this.formData.unsubscribe()
  }

}
