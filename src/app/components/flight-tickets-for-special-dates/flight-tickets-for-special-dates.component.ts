import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { RequestDataState } from 'src/app/store/request-data.state';
import { TicketsType } from 'src/app/models/flight-tickets-for-date.model';
import { GetTicketsForSpecialDate } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-flight-tickets-for-special-dates',
  templateUrl: './flight-tickets-for-special-dates.component.html',
  styleUrls: ['./flight-tickets-for-special-dates.component.scss'],
})
export class FlightTicketsForSpecialDatesComponent implements OnInit {
  @Select(RequestDataState.formData)
  formData$: Observable<TicketsType>;
  @Select(FlightInfoState.flightTicketsForDate)
  flightInfo$: Observable<any>;
  @Select(FlightInfoState.loading)
  loading$: Observable<boolean>;

  loading: boolean;
  cardsNumber: number = 10;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getFlightInfo();
  }

  getFlightInfo() {
    this.formData$.pipe(untilDestroyed(this)).subscribe((formData: TicketsType) => {
      const payload = {
        codeFrom: formData.destinationFrom.code,
        codeTo: formData.destinationTo.code,
        startDate: formData.startDate.toISOString().slice(0, 10),
        endDate: formData.endDate.toISOString().slice(0, 10),
        direct: formData.transfers === 'Directly',
        cardsNumber: this.cardsNumber,
      };
      this.store.dispatch(new GetTicketsForSpecialDate(payload));
    });
  }

  onScroll() {
    this.cardsNumber += 4;
    this.getFlightInfo();
  }
}
