import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { RequestDataState } from 'src/app/store/request-data.state';
import { FlightInfo, TicketsType } from 'src/app/models/flight-tickets-for-date.model';
import { GetTiketsForSpecialDate, StartLoading } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-flight-tickets-for-special-dates',
  templateUrl: './flight-tickets-for-special-dates.component.html',
  styleUrls: ['./flight-tickets-for-special-dates.component.scss']
})
export class FlightTicketsForSpecialDatesComponent implements OnInit {
  @Select(RequestDataState.formData)
  formData$: Observable<TicketsType>

  flightInfo: FlightInfo[];
  currency: string;

  loading: boolean;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store
      .select(FlightInfoState.flightTiketsForDate)
      .pipe(untilDestroyed(this))
      .subscribe((state) => (this.flightInfo = state));

    this.store.select(FlightInfoState.loading)
      .pipe(untilDestroyed(this))
      .subscribe(loading => this.loading = loading);

    this.formData$.pipe(untilDestroyed(this)).subscribe(formData => {
      const payload = {
        codeFrom: formData.destinationFrom.code,
        codeTo: formData.destinationTo.code,
        startDate: formData.startDate.toISOString().slice(0, 10),
        endDate: formData.endDate.toISOString().slice(0, 10),
        direct: formData.transfers  === 'Directly',
        currency: this.currency
      }
      this.store.dispatch([new StartLoading(), new GetTiketsForSpecialDate(payload)])
        .subscribe((data: any) => {
          this.flightInfo = data
        })
    
      this.store.select(RequestDataState.currency)
      .pipe(untilDestroyed(this))
      .subscribe((currency: string) => this.currency = currency.toUpperCase())

    })
  }
}
