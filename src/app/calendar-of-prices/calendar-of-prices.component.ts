import { Component, OnInit } from '@angular/core';
import { FlightsInfoService } from '../services/flights-info.service';

@Component({
  selector: 'app-calendar-of-prices',
  templateUrl: './calendar-of-prices.component.html',
  styleUrls: ['./calendar-of-prices.component.scss'],
})
export class CalendarOfPricesComponent implements OnInit {
  constructor(private flightInfoService: FlightsInfoService) {}

  prices: any = [];

  ngOnInit(): void {
    this.flightInfoService
      .RequestGetCalendarOfPrices()
      .subscribe(({ data }: any) => (this.prices = data));
  }
}
