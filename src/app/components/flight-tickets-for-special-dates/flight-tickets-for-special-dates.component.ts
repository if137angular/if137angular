import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';
import { FlightInfo } from 'src/app/models/flight-tickets-for-date.model';


@Component({
  selector: 'app-flight-tickets-for-special-dates',
  templateUrl: './flight-tickets-for-special-dates.component.html',
  styleUrls: ['./flight-tickets-for-special-dates.component.scss']
})
export class FlightTicketsForSpecialDatesComponent implements OnInit, OnDestroy {
  @Select(RequestDataState.formData)
  formData$: Observable<any>

  formData: any;
  flightInfo: FlightInfo[] = [];

  constructor(private flightInfoService: FlightsInfoService) { }

  ngOnInit(): void {
    this.formData = this.formData$.subscribe(formData => {

      const codeFrom: string = formData.destinationFrom.code;
      const codeTo: string = formData.destinationTo.code;
      const startDate: string = formData.startDate.toISOString().slice(0, 10);
      const endDate: string = formData.endDate.toISOString().slice(0, 10);
      const direct: boolean = formData.transfers  === 'Directly';
      
      this.flightInfoService.getFlightTicketsForDate(codeFrom, codeTo, startDate, endDate, direct)
        .subscribe((data: any) => {
        this.flightInfo = data.data
        })
    });
  }

  ngOnDestroy(): void {
      this.formData.unsubscribe()
  }

}
