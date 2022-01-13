import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';
import { FlightInfo } from 'src/app/models/flight-tickets-for-date.model';


@Component({
  selector: 'app-flight-tickets-for-special-dates',
  templateUrl: './flight-tickets-for-special-dates.component.html',
  styleUrls: ['./flight-tickets-for-special-dates.component.scss']
})
export class FlightTicketsForSpecialDatesComponent implements OnInit {

  formData: any;
  flightInfo: FlightInfo[] = [];

  constructor(private flightInfoService: FlightsInfoService, private store: Store) { }

  ngOnInit(): void {
    // this.getFlightInfo()
  }

  getFlightInfo() {
    this.formData = this.store.selectSnapshot(RequestDataState.formData);

    console.log(this.formData)

    const codeFrom: string = this.formData.destinationFrom.code;
    const codeTo: string = this.formData.destinationTo.code;
    const startDate: string = this.formData.startDate.toISOString().slice(0, 10);
    const endDate: string = this.formData.endDate.toISOString().slice(0, 10);

    this.flightInfoService.getFlightTicketsForDate(codeFrom, codeTo, startDate, endDate).subscribe(data => {
      this.flightInfo = data.data
      console.log(data)
    })

    // ********* Code below only for test ****************

    // this.flightInfoService.getFlightTicketsForDate('LWO', 'MIL', '2022-01-15', '2022-01-22')
    //   .subscribe(data => {
    //     this.flightInfo = data.data
    //     console.log(data)
    //   })
    // *************************************
  }

}
