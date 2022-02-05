import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CalendarOfPricesModel,
  CalendarOfPricesPayload,
} from 'src/app/models/calendar-of-prices.model';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
})
export class CalendarDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: CalendarOfPricesModel & CalendarOfPricesPayload
  ) {}

  getHours(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    let min = Math.floor(minutes % 60);

    if (min === 0) {
      return `${hours}h`;
    }
    if (hours === 0) {
      return `${min}m`;
    }
    return `${hours}h ${min}m`;
  }

  getFlightClass(c: number): string {
    if (c === 0) {
      return 'Economy class';
    }
    if (c === 1) {
      return 'Business class';
    }
    return 'First class';
  }
}
