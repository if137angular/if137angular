import { Component, Input } from '@angular/core';
import { CalendarOfPricesModel } from '../calendar-of-prices.component';

@Component({
  selector: 'app-calendar-of-prices-item',
  templateUrl: './calendar-of-prices-item.component.html',
  styleUrls: ['./calendar-of-prices-item.component.scss'],
})
export class CalendarOfPricesItemComponent {
  @Input() data!: CalendarOfPricesModel;

  isActive: boolean = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }
}
