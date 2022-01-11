import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnChanges  {
  @Input() selectedItem: string = '';
  @Output() selectedItemChange = new EventEmitter<string>();

  transfersControl: FormControl = new FormControl('');

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

  ngOnChanges(): void {
    this.transfersControl.setValue(this.selectedItem);
  }

  transferSelected(): void {
    this.selectedItem = this.transfersControl.value;
    this.selectedItemChange.emit(this.selectedItem);
  }
}
