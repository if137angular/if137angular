import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  cities: string[] = [];
  filteredCities: string[] = [];
  autoCompleteControl: FormControl = new FormControl('');

  @Select(RequestDataState.cities) cities$: Observable<string[]>;

  constructor() {}

  ngOnInit(): void {
    // Get cities
    this.cities$.subscribe((res) => {
      this.cities = Array.from(res).map((city: any) => city.name);
    });

    // Search filter
    this.autoCompleteControl.valueChanges.subscribe((value) => {
      this.filteredCities =
        value !== ''
          ? this.cities.filter((city: any) =>
              city.toLowerCase().startsWith(value.toLowerCase())
            )
          : [];
    });
  }
}
