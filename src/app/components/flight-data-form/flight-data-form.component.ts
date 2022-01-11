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

  dates: string[] = [];
  startDate: string = '';
  endDate: string = '';

  flightDataFormGroup: FormGroup = new FormGroup({
    cities: new FormControl({}),
    startDate: new FormControl({}),
    endDate: new FormControl({}),
    flightTransfers: new FormControl(false),
  });

  @Select(RequestDataState.cities) cities$: Observable<string[]>;

  ngOnInit(): void {
    this.cities$.subscribe((res) => {
      this.cities = Array.from(res).map((city: any) => city.name);
    });
  }

  onSubmitForm() {
    console.log(`City From: ${this.destinationFrom}, To: ${this.destinationTo}`);
    console.log(`Date From: ${this.startDate}, To: ${this.endDate}`);
  }

  onResetForm() {
    this.flightDataFormGroup.reset({});
  }
}
