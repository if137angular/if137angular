import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { FilterModel } from 'src/app/models/filter.model';
import { SetFilter } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { RequestDataState } from 'src/app/store/request-data.state';

type OptionModel = {
  label: string;
  value: number | string | null;
};

@UntilDestroy()
@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.scss'],
})
export class FlightFilterComponent implements OnInit {
  classOptions: OptionModel[] = [
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'Economy class',
      value: 0,
    },
    {
      label: 'Business class',
      value: 1,
    },
    {
      label: 'First class',
      value: 2,
    },
  ];

  gateOptions: OptionModel[] = [
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'Kiwi.com',
      value: 'Kiwi.com',
    },
    {
      label: 'Aviakassa',
      value: 'Aviakassa',
    },
    {
      label: 'Tickets.ua',
      value: 'Tickets.ua',
    },
  ];

  transfersOptions: OptionModel[] = [
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'Directly',
      value: 'Directly',
    },
    {
      label: 'Transfers',
      value: 'Transfers',
    },
  ];

  filterGroup: FormGroup = new FormGroup({
    flightClass: new FormControl(null),
    gate: new FormControl(null),
    minPrice: new FormControl(null),
    maxPrice: new FormControl(null),
    transfers: new FormControl(null),
  });

  constructor(public store: Store) {}

  onFilterChange() {
    this.store.dispatch(new SetFilter(this.filterGroup.value));
  }

  ngOnInit(): void {}
}
