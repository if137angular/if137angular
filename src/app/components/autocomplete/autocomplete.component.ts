import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  cities: any = [];
  filteredCities: any = [];
  autoCompleteControl: FormControl = new FormControl('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const headerDict = {
      'x-access-token': '8f399398f352163f2c3e4cb293d221e3',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.http
      .get('/data/uk/cities.json', requestOptions)
      .subscribe((res: any) => {
        this.cities = res;
        this.filteredCities = this.cities.slice(0, 5);
      });

    // Control filter
    this.autoCompleteControl.valueChanges.subscribe((value) => {
      this.filteredCities = this.cities.filter(
        (city: any) => city.name === value.toLowerCase()
      );
    });
  }
}
