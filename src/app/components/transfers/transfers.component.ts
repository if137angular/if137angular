import { Component, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TransfersComponent),
    },
  ],
})
export class TransfersComponent {
  transfersControl: FormControl = new FormControl('');
  private onChange: any = () => {};

  transfers: [string, string, string] = ['All', 'Directly', 'Transfers'];

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: string) => void): void {}

  writeValue(value: 'Directly' | 'Transfers'): void {
    if (!value) {
      return;
    }
    this.transfersControl.setValue(value);
  }

  transferSelected(): void {
    this.onChange(this.transfersControl.value);
  }
}
