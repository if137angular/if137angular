import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetFilter } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';

type filterElementsModel = {
  formControlName: string;
  label: string;
  options: string[];
};

@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.scss'],
})
export class FlightFilterComponent {
  @Select(FlightInfoState.filterConfig)
  filterConfig$: Observable<any>;

  filterElements: filterElementsModel[] = [
    {
      formControlName: 'flightClass',
      label: 'Flight Class',
      options: ['All', 'Economy class', 'Business class', 'First class'],
    },
    {
      formControlName: 'gate',
      label: 'Gate',
      options: ['All', 'Kiwi.com', 'Aviakassa', 'Tickets.ua'],
    },
    {
      formControlName: 'transfers',
      label: 'Transfers',
      options: ['All', 'Directly', 'Transfers'],
    },
  ];

  filterGroup: FormGroup = new FormGroup({
    flightClass: new FormControl(null),
    gate: new FormControl(null),
    transfers: new FormControl(null),
    minPrice: new FormControl(null),
    maxPrice: new FormControl(null),
  });

  constructor(public store: Store) {}

  onFilterChange() {
    this.store.dispatch(new SetFilter(this.filterGroup.value));
  }
}
