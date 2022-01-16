import { Component, OnInit } from '@angular/core';
import { GetAirports, GetCities, GetCountries } from 'src/app/store/request-data.action';
import { Store } from '@ngxs/store';
import { FlightsInfoService } from './services/flights-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ipaddress: string = '';

  constructor(
    private store: Store,
    private visitorsService: FlightsInfoService) {
  };

  ngOnInit() {
    this.store.dispatch([new GetCountries(), new GetAirports(), new GetCities()]);

    this.visitorsService.getIpAddress().subscribe(res => {
      console.log(res);

      this.visitorsService.getGEOLocation(this.ipaddress).subscribe(res => {
        console.log(res);
      });
    });
  }
}
