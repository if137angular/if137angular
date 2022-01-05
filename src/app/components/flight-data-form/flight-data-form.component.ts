import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-flight-data-form',
  templateUrl: './flight-data-form.component.html',
  styleUrls: ['./flight-data-form.component.scss']
})
  
export class FlightDataFormComponent  {
  flightDataFormGroup: FormGroup = new FormGroup({
    startDate: new FormControl({}),
    endDate: new FormControl({}),
    flightTransfers: new FormControl(false),
  });
  onSubmitForm() {
  }
}
