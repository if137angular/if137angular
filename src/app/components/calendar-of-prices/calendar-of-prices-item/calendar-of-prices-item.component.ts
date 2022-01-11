import { Component, Input } from '@angular/core';
import { CalendarOfPricesModel } from 'src/app/models/calendar-of-prices.model';

@Component({
  selector: 'app-calendar-of-prices-item',
  templateUrl: './calendar-of-prices-item.component.html',
  styleUrls: ['./calendar-of-prices-item.component.scss'],
})
export class CalendarOfPricesItemComponent {
  @Input() data: CalendarOfPricesModel;
  @Input() currency: string;

  isActive: boolean = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }
}
