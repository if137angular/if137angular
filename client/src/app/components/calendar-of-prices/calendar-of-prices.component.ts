import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import {
  CalendarOfPricesModel,
  CalendarOfPricesPayload,
} from 'src/app/models/calendar-of-prices.model';
import { FormDataModel } from 'src/app/models/formData.model';
import {
  CalendarOfPricesLoaded,
  SetFilter,
} from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { RequestDataState } from 'src/app/store/request-data.state';

type ClassOptionModel = {
  label: string;
  value: number;
};

@Component({
  selector: 'app-calendar-of-prices',
  templateUrl: './calendar-of-prices.component.html',
  styleUrls: ['./calendar-of-prices.component.scss'],
})
export class CalendarOfPricesComponent implements OnInit {
  calendarData: CalendarOfPricesModel[];
  formData: CalendarOfPricesPayload;
  loadingCardCount: number[];
  filter: any;
  currency: string;
  minValue: number;
  maxValue: number;

  classOptions: ClassOptionModel[] = [
    { label: 'Economy', value: 0 },
    { label: 'Bussiness', value: 1 },
    { label: 'First', value: 2 },
  ];
  filterForm: FormGroup = new FormGroup({
    class: new FormControl(),
    minValue: new FormControl(1),
    maxValue: new FormControl(100),
  });

  constructor(private store: Store) {
    this.loadingCardCount = Array(36).map((n) => n);
  }

  onFormValueChange() {
    this.store.dispatch(new SetFilter(this.filterForm.value));
    // this.store
    //   .select(FlightInfoState.calendarOfPrices)
    //   .subscribe((state) => (this.calendarData = state));
  }

  ngOnInit(): void {
    this.store
      .select(FlightInfoState.calendarOfPrices)
      .subscribe((state) => (this.calendarData = state));

    this.store
      .select(FlightInfoState.filter)
      .subscribe((state) => (this.filter = state));

    this.store
      .select(FlightInfoState.currency)
      .subscribe((currency) => (this.currency = currency));

    this.store
      .select(RequestDataState.formData)
      .pipe(
        map((state: FormDataModel) => ({
          origin: state.destinationFrom.name,
          destination: state.destinationTo.name,
          originCode: state.destinationFrom.code,
          destinationCode: state.destinationTo.code,
          return_date: state.endDate.toISOString().split('T')[0],
          depart_date: state.startDate.toISOString().split('T')[0],
        }))
      )
      .subscribe((data: CalendarOfPricesPayload) => {
        this.store.dispatch(new CalendarOfPricesLoaded(data));
        this.formData = data;
      });
  }
}
