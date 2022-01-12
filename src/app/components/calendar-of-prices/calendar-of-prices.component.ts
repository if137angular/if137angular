import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { CalendarOfPricesStateModel } from 'src/app/models/calendar-of-prices.model';
import { FetchCalendarOfPrices } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { RequestDataState } from 'src/app/store/request-data.state';

type FormDataDestinations = {
  destination: string;
  origin: string;
};

@Component({
  selector: 'app-calendar-of-prices',
  templateUrl: './calendar-of-prices.component.html',
  styleUrls: ['./calendar-of-prices.component.scss'],
})
export class CalendarOfPricesComponent implements OnInit {
  constructor(private store: Store) {}

  calendarData: CalendarOfPricesStateModel;
  formData: FormDataDestinations;

  ngOnInit(): void {
    this.store.dispatch(new FetchCalendarOfPrices());
    this.store
      .select(FlightInfoState.calendarOfPrices)
      .subscribe((state) => (this.calendarData = state));
    this.store
      .select(RequestDataState.formData)
      .pipe(
        map((state) => ({
          destination: state.destinationFrom.name,
          origin: state.destinationTo.name,
        }))
      )
      .subscribe((data) => (this.formData = data));
  }
}
