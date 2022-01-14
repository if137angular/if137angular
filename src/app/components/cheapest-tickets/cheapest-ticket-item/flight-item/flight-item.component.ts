import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-flight-item',
  templateUrl: './flight-item.component.html',
  styleUrls: ['./flight-item.component.scss']
})
export class FlightItemComponent {
  @Input() flightDate: any
  @Input() flightFrom: any
  @Input() flightTo: any
  constructor() { }
}
