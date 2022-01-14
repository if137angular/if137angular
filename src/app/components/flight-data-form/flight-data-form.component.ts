import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';
import { CitiesModel } from "src/app/models/cities.model";
import { SetFormDate } from "src/app/store/request-data.action";
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-data-form',
  templateUrl: './flight-data-form.component.html',
  styleUrls: ['./flight-data-form.component.scss']
})
export class FlightDataFormComponent implements OnInit {
  cities: CitiesModel[] = [];
  transfers: string = ''

  flightDataFormGroup: FormGroup = new FormGroup({
    startDate: new FormControl({}),
    endDate: new FormControl({}),
    destinationFrom: new FormControl({
      code: "LWO",
      name: "Lviv"
    }),
    destinationTo: new FormControl(),
    transfers: new FormControl()
  });

  @Select(RequestDataState.cities) cities$: Observable<CitiesModel[]>;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.cities$.subscribe((cities: CitiesModel[]) => {
      this.cities = cities;
    });
  }

  onSubmitForm() {
    this.store.dispatch(new SetFormDate(this.flightDataFormGroup.value));
    this.router.navigate(['/flight-tickets']); // This code for need for component flight-tickets-for-special-date
  }

  onResetForm() {
    this.flightDataFormGroup.reset({});
  }
}
