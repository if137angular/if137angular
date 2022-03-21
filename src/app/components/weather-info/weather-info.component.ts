import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WeatherDataModel } from 'src/app/models/weather-data.model';
import { RequestDataState } from 'src/app/store/request-data.state';
import { WeatherInfoDialogComponent } from './weather-info-dialog/weather-info-dialog.component';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
})
export class WeatherInfoComponent implements OnInit {
  @Select(RequestDataState.weatherData)
  weatherData$: Observable<WeatherDataModel>;

  weatherData: WeatherDataModel;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.weatherData$.subscribe((data) => (this.weatherData = data));
  }

  showDialog() {
    this.dialog.open(WeatherInfoDialogComponent, {
      data: this.weatherData,
    });
  }
}
