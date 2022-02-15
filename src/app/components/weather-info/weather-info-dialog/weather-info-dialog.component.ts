import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherDataModel } from 'src/app/models/weather-data.model';

@Component({
  selector: 'app-weather-info-dialog',
  templateUrl: './weather-info-dialog.component.html',
  styleUrls: ['./weather-info-dialog.component.scss'],
})
export class WeatherInfoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public weatherData: WeatherDataModel
  ) {}
}
