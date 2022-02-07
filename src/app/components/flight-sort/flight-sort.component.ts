import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-flight-sort',
  templateUrl: './flight-sort.component.html',
  styleUrls: ['./flight-sort.component.scss']
})
export class FlightSortComponent {

  constructor() { }

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  selected = this.foods[1].value

  sortTickets(val: any) {
    console.log(val)
  }

}
