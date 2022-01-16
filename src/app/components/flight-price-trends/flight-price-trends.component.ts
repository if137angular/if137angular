import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';


@Component({
  selector: 'app-flight-price-trends',
  templateUrl: './flight-price-trends.component.html',
  styleUrls: ['./flight-price-trends.component.scss']
})
export class FlightPriceTrendsComponent implements OnInit, OnDestroy {
  @Select(RequestDataState.formData)
  formData$: Observable<any>;

  constructor(private flightInfoService: FlightsInfoService, private store: Store) { }
  data: any = [];
  currency: any = 'USD';
  cityFrom: any;
  cityTo: any;
  formData: any;

  ngOnInit(): void {
    this.formData = this.formData$.subscribe(formData => {
      this.flightInfoService.getFlightPriceTrends(formData.destinationFrom.code, formData.destinationTo.code, formData.startDate.toISOString().slice(0, 7), formData.endDate.toISOString().slice(0, 7), this.currency).subscribe((response: any) => {
        this.data = Object.values(response.data);
        console.log(this.data);
        this.cityFrom = formData.destinationFrom.name;
        console.log(this.cityFrom)
        this.cityTo = formData.destinationTo.name;

      });
    })
  }
  ngOnDestroy(): void {
    this.formData.unsubscribe()

  }
}

