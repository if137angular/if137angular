import { Component, OnInit } from '@angular/core';
import { GetAirports, GetCities, GetCountries } from 'src/app/store/request-data.action';
import { Store } from '@ngxs/store';
import { FlightsInfoService } from './services/flights-info.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  response: any;

  constructor(private store: Store, private http: HttpClient, private flightsInfoService: FlightsInfoService) {
  }

  ngOnInit() {
    this.store.dispatch([new GetCountries(), new GetAirports(), new GetCities()]);
    
    this.flightsInfoService.getLocale().subscribe((res) => {
      console.log(this.response.city.name);
    });

    //  this.http.get('http://www.travelpayouts.com/whereami?locale=uk&ip=194.44.160.160').subscribe((response) => {
    //    this.response = response;
    //    console.log(this.response.city.name);
    //  })
  };

}
