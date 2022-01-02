import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {
  @Input() text: string;
  @Input() color: string;
  @Output() btnClick = new EventEmitter();


  title = "countries";
  countries: string[] = [
    "New York",
    "Chicago",
    "Tampa"
  ];
  searchItem = new FormControl();
  filteredOptions: Observable<string[]> = new Subject();

  ngOnInit() {
    this.filteredOptions = this.searchItem.valueChanges.pipe(
      startWith(""),
      map((item) => {
        return this.countries.filter((country) => country.toLowerCase().includes(item))
      })
    )
  }
}
