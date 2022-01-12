import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';

@Component({
  selector: 'app-flight-data-form',
  templateUrl: './flight-data-form.component.html',
  styleUrls: ['./flight-data-form.component.scss'],
})
export class FlightDataFormComponent implements OnInit {
  cities: string[] = [];
  destinationFrom: string = '';
  destinationTo: string = '';
  transfers: string = ''

  flightDataFormGroup: FormGroup = new FormGroup({
    startDate: new FormControl({}),
    endDate: new FormControl({}),
  });

  @Select(RequestDataState.cities) cities$: Observable<string[]>;

  ngOnInit(): void {
    this.cities$.subscribe((res) => {
      this.cities = Array.from(res).map((city: any) => city.name);
    });
  }

  onSubmitForm() {
    console.log(
      `City From: ${this.destinationFrom}, To: ${this.destinationTo}`
    );
    console.log(
      `Date From: ${this.flightDataFormGroup.controls['startDate'].value}, To: ${this.flightDataFormGroup.controls['endDate'].value}`
    );
    console.log(
      `Transfers: ${this.transfers}`
    );
  }

  onResetForm() {
    this.flightDataFormGroup.reset({});
    this.destinationFrom = '';
    this.destinationTo = '';
    this.transfers = '';

    this.destinationFrom = '';
    this.destinationTo = '';
  }
}
