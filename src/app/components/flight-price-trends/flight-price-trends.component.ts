import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';
import { FormDataModel } from 'src/app/models/formData.model';
import { FlightPriceTrends } from 'src/app/models/flight-price-trends.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-flight-price-trends',
  templateUrl: './flight-price-trends.component.html',
  styleUrls: ['./flight-price-trends.component.scss']
})
export class FlightPriceTrendsComponent implements OnInit, OnDestroy {
  @Select(RequestDataState.formData)
  formData$: Observable<FormDataModel>;

  data: FlightPriceTrends[] = [];
  currency: string = 'USD';
  cityFrom: string;
  cityTo: string;

  private unsubscribe$ = new Subject<null>();
  constructor(private flightInfoService: FlightsInfoService, private store: Store) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.formData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(formData => {
        this.flightInfoService.getFlightPriceTrends(formData.destinationFrom.code, formData.destinationTo.code, formData.startDate.toISOString().slice(0, 7), formData.endDate.toISOString().slice(0, 7), this.currency)
        .subscribe((response: any) => {
          this.data = Object.values(response.data);
          this.cityFrom = formData.destinationFrom.name;
          this.cityTo = formData.destinationTo.name;
          if (formData.transfers === "Directly") {
            this.getDirectlyFlights(this.data);
          };
          if (formData.transfers === "Transfers") {
            this.getFlightsWithTransfers(this.data);
          };
        });
      })
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

