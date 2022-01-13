import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';


@Component({
  selector: 'app-flight-tickets-for-special-dates',
  templateUrl: './flight-tickets-for-special-dates.component.html',
  styleUrls: ['./flight-tickets-for-special-dates.component.scss']
})
export class FlightTicketsForSpecialDatesComponent implements OnInit {

  formData: any;

  constructor(private flightInfoService: FlightsInfoService, private store: Store) { }

  ngOnInit(): void {
    // this.formData = this.store.selectSnapshot(RequestDataState.formData);

  }

  consoleFormData() {
    const formData = this.store.selectSnapshot(RequestDataState.formData);

    const codeFrom: string = formData.destinationFrom.code;
    const codeTo: string = formData.destinationTo.code;
    const startDate: string = formData.startDate.toISOString().slice(0, 10);
    const endDate: string = formData.endDate.toISOString().slice(0, 10);

    console.log('Data start: ', startDate )
    console.log('Data end: ', endDate )
    console.log('From city ', codeFrom)
    console.log('To city ', codeTo)

    this.flightInfoService.getFlightTicketsForDate(codeFrom, codeTo, startDate, endDate).subscribe(data => {
      console.log(data)
    })
  }

}
