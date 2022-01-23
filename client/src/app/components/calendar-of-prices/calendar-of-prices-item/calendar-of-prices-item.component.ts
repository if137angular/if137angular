import { Component, Input } from '@angular/core';
import { CalendarOfPricesModel } from 'src/app/models/calendar-of-prices.model';

@Component({
  selector: 'app-calendar-of-prices-item',
  templateUrl: './calendar-of-prices-item.component.html',
  styleUrls: ['./calendar-of-prices-item.component.scss'],
})
export class CalendarOfPricesItemComponent {
  @Input() data: CalendarOfPricesModel;
  @Input() currency: any;
  @Input() origin: string;
  @Input() destination: string;

  isActive: boolean = false;
  liked: boolean = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  isLiked() {
    this.liked = !this.liked;
  }

  calculateDuration(time: number): string {
    let hours = Math.floor(time / 60);
    let minutes = Math.floor(time % 60);
    if (minutes === 0) {
      return `${hours}h`;
    }
    if (hours === 0 && minutes !== 0) {
      return ` ${minutes}m`;
    }
    return `${hours}h ${minutes}m`;
  }

  getFlightClass(number: number): string {
    if (number === 0) {
      return 'Economy class';
    }
    if (number === 1) {
      return 'Business class';
    }
    return 'First class';
  }
}
