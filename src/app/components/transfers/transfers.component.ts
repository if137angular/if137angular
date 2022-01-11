import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

interface Transfer {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent {

  form: FormGroup;
  transfers: Transfer[] = [
    {value: 'directly-0', viewValue: 'Directly'},
    {value: 'transfers-1', viewValue: 'Transfers'},
  ];
  transferControl = new FormControl(this.transfers[1].value);

  constructor() {
    this.form = new FormGroup({
      transfer: this.transferControl,
    });
  }
}
