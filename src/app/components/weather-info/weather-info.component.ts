import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WeatherDataModel } from 'src/app/models/weather-data.model';
import { RequestDataState } from 'src/app/store/request-data.state';

@Component({
  selector: 'weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
})
export class WeatherInfoComponent implements OnInit {
  weatherData: Observable<WeatherDataModel>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.weatherData = this.store.select(RequestDataState.weatherData);
  }
}
