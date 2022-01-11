import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CalendarOfPricesStateModel } from 'src/app/models/calendar-of-prices.model';
import { FetchCalendarOfPrices } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';

@Component({
  selector: 'app-calendar-of-prices',
  templateUrl: './calendar-of-prices.component.html',
  styleUrls: ['./calendar-of-prices.component.scss'],
})
export class CalendarOfPricesComponent implements OnInit {
  constructor(private store: Store) {}

  calendatData: CalendarOfPricesStateModel;

  ngOnInit(): void {
    this.store.dispatch(new FetchCalendarOfPrices());
    this.store
      .select(FlightInfoState.calendarOfPrices)
      .subscribe((state) => (this.calendatData = state));
  }
}
