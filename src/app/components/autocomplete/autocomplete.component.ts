import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Input() items: string[] = [];
  @Input() label: string = '';

  @Output() selectedItem = new EventEmitter<string>();

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

  optionSelected(): void {
    this.selectedItem.emit(this.autoCompleteControl.value);
  }
}
