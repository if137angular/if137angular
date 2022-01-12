import { Component, Input, Output, EventEmitter, OnChanges, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CitiesModel } from "src/app/models/cities.model";

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => TransfersComponent),
  } ]
})
export class TransfersComponent implements OnChanges  {
  @Input() selectedItem: string = '';
  @Output() selectedItemChange = new EventEmitter<string>();

  transfersControl: FormControl = new FormControl('');
  private onChange: any = () => {};

  form: FormGroup;
  transfers: string[] = [
    'Directly',
    'Transfers',
  ];

  constructor() {
    this.form = new FormGroup({
      transfer: this.transfersControl,
    });
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: string) => void): void {
    // no need in touch handlers
  }

  writeValue(value: CitiesModel): void {
    if (!value) { return; }
    this.transfersControl.setValue(value.name);
  }

  ngOnChanges(): void {
    this.transfersControl.setValue(this.selectedItem);
  }

  transferSelected(): void {
    this.selectedItem = this.transfersControl.value;
    this.onChange(this.selectedItem);
    this.transfersControl.setValue(this.selectedItem);
  }
}
