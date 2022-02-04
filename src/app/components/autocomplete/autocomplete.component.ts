import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CitiesModel } from 'src/app/models/cities.model';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AutocompleteComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() items: CitiesModel[] = [];
  @Input() label: string = '';
  @Input() flightInfo: any;

  @Input() selectedItem: CitiesModel;
  @Output() selectedItemChange = new EventEmitter<string>();

  filteredItems: CitiesModel[] = [];
  autoCompleteControl: FormControl = new FormControl('');
  private onChange: any = () => {};

  ngOnInit(): void {
    // Search filter
    this.autoCompleteControl.valueChanges.subscribe((value: string) => {
      this.filteredItems =
        value !== ''
          ? this.items.filter((city: CitiesModel) =>
              city.name.toLowerCase().includes(value.toLowerCase())
            )
          : [];

      if (!this.filteredItems.length) this.onChange({ name: '', code: '' });
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
    const matchedCity = this.items.find(
      (item: CitiesModel) => item.name === this.autoCompleteControl.value
    );
    this.onChange(matchedCity);
  }

  validate({ value }: FormControl) {
    const isNotValid = !value.code;
    return (
      isNotValid && {
        invalid: true,
      }
    );
  }
}
