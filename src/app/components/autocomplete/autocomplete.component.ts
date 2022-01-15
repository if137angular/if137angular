import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { CitiesModel } from "src/app/models/cities.model";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: [ './autocomplete.component.scss' ],
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => AutocompleteComponent),
  } ]
})

export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() items: CitiesModel[] = [];
  @Input() label: string = '';

  @Input() selectedItem: CitiesModel;
  @Output() selectedItemChange = new EventEmitter<string>();

  filteredItems: CitiesModel[] = [];
  autoCompleteControl: FormControl = new FormControl('');
  private onChange: any = () => {
  };

  ngOnInit(): void {
    // Search filter
    this.autoCompleteControl.valueChanges.pipe(
      filter(Boolean)
    ).subscribe((value: string) => {
      this.filteredItems = this.items.filter((city: CitiesModel) =>
        city.name.toLowerCase().startsWith(value.toLowerCase())
      )
    });
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: string) => void): void {
    // no need in touch handlers
  }

  writeValue(value: CitiesModel): void {
    if (!value) {
      return;
    }
    this.autoCompleteControl.setValue(value.name);
  }

  optionSelected(): void {
    const matchedCity = this.items.find((item: CitiesModel) => item.name === this.autoCompleteControl.value);
    this.onChange(matchedCity);
  }
}
