import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAirports, GetCities, GetCountries } from "src/app/store/request-data.action";
import { RequestDataService } from 'src/app/services/request-data.service';
import { FlightsInfoService } from 'src/app/services/flights-info.service';

@Component({
  selector: 'app-non-stop-tickets',
  templateUrl: './non-stop-tickets.component.html',
  styleUrls: ['./non-stop-tickets.component.scss']
})
export class NonStopTicketsComponent implements OnInit {
    title: string = "Non-Stop Tickets";

  constructor(private store: Store, private flightsInfoService: FlightsInfoService) { }

  ngOnInit(): void {}

}
