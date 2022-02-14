import { RequestDataState } from './../../store/request-data.state';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetFilter } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

type filterElementsModel = {
  formControlName: string;
  label: string;
  options: string[];
};

@UntilDestroy()
@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.scss'],
})
export class FlightFilterComponent implements OnInit {
  @Select(FlightInfoState.filterConfig) filterConfig$: Observable<any>;
  @Select(FlightInfoState.filter) filter$: Observable<any>;

  minPrice: number = 0;
  maxPrice: number = 0;

  minDuration: number;
  maxDuration: number;

  currency: string;

  checkTrue: boolean = true;

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
    {
      formControlName: 'airline_titles',
      label: 'Airline',
      options: ['All', 'Ryanair', 'Wizz Air', 'Bees Airline'],
    },
  ];

  filterGroup: FormGroup = new FormGroup({
    flightClass: new FormControl(null),
    gate: new FormControl(null),
    transfers: new FormControl(null),
    airline_titles: new FormControl(null),
    priceRange: new FormControl(null),
    durationRange: new FormControl(null),
    airline: new FormControl(null),
  });

  constructor(public store: Store) {}

  ngOnInit(): void {
    this.filterConfig$.pipe(untilDestroyed(this)).subscribe((filterConfig) => {
      this.minPrice = filterConfig.minPrice;
      this.maxPrice = filterConfig.maxPrice;

      this.minDuration = filterConfig.minDuration;
      this.maxDuration = filterConfig.maxDuration;

      this.filterGroup.patchValue({
        priceRange: [this.minPrice, this.maxPrice],
        durationRange: [this.minDuration, this.maxDuration],
      });

      this.currency = this.store.selectSnapshot(RequestDataState.currency);
    });
  }

  onResetFilter() {
    this.store.dispatch(
      new SetFilter({
        minPrice: null,
        maxPrice: null,
        minDuration: null,
        maxDuration: null,
      })
    );

    this.filterGroup.patchValue({
      priceRange: [this.minPrice, this.maxPrice],
      durationRange: [this.minDuration, this.maxDuration],
    });
  }

  onFilterChange() {
    const [minPrice, maxPrice] = this.filterGroup.value.priceRange;

    this.store.dispatch(
      new SetFilter(
        Object.assign(this.filterGroup.value, { minPrice, maxPrice })
      )
    );
  }

  onDurationChange() {
    const [minDuration, maxDuration] = this.filterGroup.value.durationRange;

    this.store.dispatch(
      new SetFilter(
        Object.assign(this.filterGroup.value, { minDuration, maxDuration })
      )
    );
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  getHours(min: any) {
    let hours = Math.trunc(min / 60);
    let minutes = min % 60;
    if (minutes === 0) {
      return `${hours}h`;
    }
    if (hours === 0 && minutes !== 0) {
      return ` ${minutes}m`;
    }
    return `${hours}h:${minutes}m`;
  }
}
