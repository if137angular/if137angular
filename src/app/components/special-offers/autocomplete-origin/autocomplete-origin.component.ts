import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AutocopmpleteCityService } from './../../../services/autocopmplete-city.service';

export interface City {
  name: string;
}

@Component({
  selector: 'app-autocomplete-origin',
  templateUrl: './autocomplete-origin.component.html',
  styleUrls: ['./autocomplete-origin.component.scss']
})
export class AutocompleteOriginComponent implements OnInit {

  myControl = new FormControl();
  options: City[] = [];
  filteredOptions: Observable<City[]>;

  constructor(private getCityApi: AutocopmpleteCityService) { }
  getCity: any = [];
  ngOnInit(): void {
    this.getCityApi.getAutocompleteAPI().subscribe((offers => {
      this.options = offers;
    }));


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(City: City): string {
    return City && City.name ? City.name : '';
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
