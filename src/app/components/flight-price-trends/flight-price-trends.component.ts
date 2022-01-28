import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';
import { FormDataModel } from 'src/app/models/formData.model';
import { FlightPriceTrends } from 'src/app/models/flight-price-trends.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { GetFlightPriceTrends } from 'src/app/store/flight-info.action';

@Component({
  selector: 'app-flight-price-trends',
  templateUrl: './flight-price-trends.component.html',
  styleUrls: ['./flight-price-trends.component.scss'],
})
export class FlightPriceTrendsComponent implements OnInit, OnDestroy {
  @Select(RequestDataState.formData)
  formData$: Observable<FormDataModel>;

  data: any = [];
  currency: string = 'USD';
  cityFrom: string;
  cityTo: string;
  loading: boolean;

  private unsubscribe$ = new Subject<null>();
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.store
      .select(FlightInfoState.flightPriceTrends)
      .subscribe((state) => (this.data = state));

    this.store
      .select(FlightInfoState.loading)
      .subscribe((loading) => (this.loading = loading));

    this.formData$.pipe(takeUntil(this.unsubscribe$)).subscribe((formData) => {
      const payload = {
        origin: formData.destinationFrom.code,
        destination: formData.destinationTo.code,
        departDate: formData.startDate.toISOString().slice(0, 7),
        returnDate: formData.endDate.toISOString().slice(0, 7),
      };
      // this.store.dispatch([new GetFlightPriceTrends(payload)]);

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

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
