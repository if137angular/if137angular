import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';
import { FormDataModel } from 'src/app/models/formData.model';
import { FlightPriceTrends } from 'src/app/models/flight-price-trends.model';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { GetFlightPriceTrends } from 'src/app/store/flight-info.action';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-flight-price-trends',
  templateUrl: './flight-price-trends.component.html',
  styleUrls: ['./flight-price-trends.component.scss'],
})
export class FlightPriceTrendsComponent implements OnInit {
  @Select(RequestDataState.formData)
  formData$: Observable<FormDataModel>;

  data: any = [];
  currency: string = 'USD';
  cityFrom: string;
  cityTo: string;
  loading: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.store
      .select(FlightInfoState.flightPriceTrends)
      .pipe(untilDestroyed(this))
      .subscribe((state) => (this.data = state));

    this.store
      .select(FlightInfoState.loading)
      .pipe(untilDestroyed(this))
      .subscribe((loading) => (this.loading = loading));

    this.formData$.pipe(untilDestroyed(this)).subscribe((formData) => {
      const payload = {
        origin: formData.destinationFrom.code,
        destination: formData.destinationTo.code,
        departDate: formData.startDate.toISOString().slice(0, 7),
        returnDate: formData.endDate.toISOString().slice(0, 7),
      };
      this.store.dispatch([new GetFlightPriceTrends(payload)]);

      this.cityFrom = formData.destinationFrom.name;
      this.cityTo = formData.destinationTo.name;

      if (formData.transfers === 'Directly') {
        this.getDirectlyFlights(this.data);
      } else if (formData.transfers === 'Transfers') {
        this.getFlightsWithTransfers(this.data);
      }
    });
  }

  getDirectlyFlights(data: FlightPriceTrends[]) {
    const newArray: FlightPriceTrends[] = [];

    for (let item of data) {
      if (item.transfers === 0) {
        newArray.unshift(item);
      }
    }

    this.data = newArray;
  }

  getFlightsWithTransfers(data: FlightPriceTrends[]) {
    const newArray: FlightPriceTrends[] = [];

    for (let item of data) {
      if (item.transfers > 0) {
        newArray.unshift(item);
      }
    }

    this.data = newArray;
  }
}
