import { Component, OnInit } from '@angular/core';
import { FlightsInfoService } from 'src/app/services/flights-info.service';

export type CalendarOfPricesModel = {
  value: number;
  trip_class: number;
  show_to_affiliates: boolean;
  origin: string;
  destination: string;
  gate: string;
  depart_date: Date;
  return_date: Date;
  number_of_changes: number;
  found_at: Date;
  duration: number;
  distance: number;
  actual: boolean;
};

export type GetCalendarOfPricesRequest = {
  data: CalendarOfPricesModel[];
};

@Component({
  selector: 'app-calendar-of-prices',
  templateUrl: './calendar-of-prices.component.html',
  styleUrls: ['./calendar-of-prices.component.scss'],
})
export class CalendarOfPricesComponent implements OnInit {
  constructor(private flightInfoService: FlightsInfoService) {}

  prices: CalendarOfPricesModel[] = [];

  ngOnInit(): void {
    this.flightInfoService
      .RequestGetCalendarOfPrices()
      .subscribe(({ data }) => (this.prices = data));
  }
}
