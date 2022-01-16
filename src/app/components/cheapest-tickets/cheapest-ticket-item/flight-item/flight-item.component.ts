import {Component, Input, OnInit} from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'app-flight-item',
  templateUrl: './flight-item.component.html',
  styleUrls: ['./flight-item.component.scss']
})
export class FlightItemComponent implements OnInit {
  @Input() flightInfo: any
  departDate : string
  departTime : string
  constructor() { }
  ngOnInit() {
    this.departDate = moment(this.flightInfo.departureDate).format('D MMM YYYY')
    this.departTime = moment(this.flightInfo.departureDate).format('HH:mm')
  }
}
