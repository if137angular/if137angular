import { Component, OnInit } from '@angular/core';
import {
  GetAirports,
  GetCities,
  GetCountries,
  SetUserData,
} from 'src/app/store/request-data.action';
import { Store } from '@ngxs/store';
import { FlightsInfoService } from './services/flights-info.service';
import { IpFullModel, IpShortModel } from './models/ip.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private visitorsService: FlightsInfoService
  ) {}

  ngOnInit() {
    this.store.dispatch([
      new GetCountries(),
      new GetAirports(),
      new GetCities(),
    ]);
    this.visitorsService.getIpAddress().subscribe((ip: IpShortModel) => {
      this.visitorsService
        .getGEOLocation(Object.values(ip)[0])
        .subscribe((userInfo: IpFullModel) => {
          console.log(userInfo);
          this.store.dispatch(new SetUserData(userInfo));
        });
    });
  }
}
