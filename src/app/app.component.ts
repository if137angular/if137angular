import { Component, OnInit } from '@angular/core';
import {
  GetAirports,
  GetCities,
  GetCountries,
  SetUserData,
} from 'src/app/store/request-data.action';
import { Store } from '@ngxs/store';
import { FlightsInfoService } from './services/flights-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch([
      new GetCountries(),
      new GetAirports(),
      new GetCities(),
      new SetUserData()
    ]);
  }
}
