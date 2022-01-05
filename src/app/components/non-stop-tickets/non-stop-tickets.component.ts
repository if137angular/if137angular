import { Component, OnInit } from '@angular/core';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { Store } from '@ngxs/store';
import { GetAirports, GetCities, GetCountries } from 'src/app/store/request-data.action';

@Component({
  selector: 'app-non-stop-tickets',
  templateUrl: './non-stop-tickets.component.html',
  styleUrls: ['./non-stop-tickets.component.scss']
})
export class NonStopTicketsComponent implements OnInit {

  constructor(private store: Store, private flightsInfoService: FlightsInfoService) { }

  ngOnInit(): void {
    this.store.dispatch([new GetCountries(), new GetAirports(), new GetCities()]);

    this.flightsInfoService.requestGetNonStopTickets().subscribe((res) => {
      console.log(res);
    });
  }

}
