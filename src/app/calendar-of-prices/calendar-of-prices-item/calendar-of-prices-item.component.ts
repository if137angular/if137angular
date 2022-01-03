import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-of-prices-item',
  templateUrl: './calendar-of-prices-item.component.html',
  styleUrls: ['./calendar-of-prices-item.component.scss'],
})
export class CalendarOfPricesItemComponent {
  @Input() data: any = {};

  isActive: boolean = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }
}
