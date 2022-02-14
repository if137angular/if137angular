import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { DailyModel } from 'src/app/models/weather-data.model';

@Component({
  selector: 'day-info',
  templateUrl: './day-info.component.html',
  styleUrls: ['./day-info.component.scss'],
})
export class DayInfoComponent {
  @Input() dayInfo: DailyModel;
  @Input() idx: number;

  constructor() {}

  getDate(): Date {
    return moment().add(this.idx, 'days').toDate();
  }

  floorTemp(temp: number): number {
    return Math.floor(temp);
  }
}
