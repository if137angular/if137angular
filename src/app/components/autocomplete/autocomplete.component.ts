import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() items: string[] = [];
  @Input() label: string = '';

  @Input() selectedItem: string = '';
  @Output() selectedItemChange = new EventEmitter<string>();

  filteredItems: string[] = [];
  autoCompleteControl: FormControl = new FormControl('');

  ngOnInit(): void {
    // Search filter
    this.autoCompleteControl.valueChanges.subscribe((value) => {
      this.filteredItems =
        value !== ''
          ? this.items.filter((city: any) =>
              city.toLowerCase().startsWith(value.toLowerCase())
            )
          : [];
    });
  }

  ngOnChanges(): void {
    this.autoCompleteControl.setValue(this.selectedItem);
  }

  optionSelected(): void {
    this.selectedItem = this.autoCompleteControl.value;
    this.selectedItemChange.emit(this.selectedItem);
  }
}
