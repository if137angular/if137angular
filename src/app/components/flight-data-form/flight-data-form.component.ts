import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';
import { CitiesModel } from 'src/app/models/cities.model';
import { SetFormDate } from 'src/app/store/request-data.action';
import { FormDataModel } from 'src/app/models/formData.model';

@Component({
  selector: 'app-flight-data-form',
  templateUrl: './flight-data-form.component.html',
  styleUrls: ['./flight-data-form.component.scss'],
})
export class FlightDataFormComponent implements OnInit {
  cities: CitiesModel[] = [];
  transfers: string = '';

  flightDataFormGroup: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    destinationFrom: new FormControl(),
    destinationTo: new FormControl(),
    transfers: new FormControl(),
  });

  @Select(RequestDataState.cities) cities$: Observable<CitiesModel[]>;
  @Select(RequestDataState.formData) formData$: Observable<FormDataModel>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.cities$.subscribe((cities: CitiesModel[]) => {
      this.cities = cities;
    });

    this.formData$.subscribe((formData: FormDataModel) => {
      this.flightDataFormGroup.patchValue({
        destinationFrom:
          formData.destinationFrom.name === '' &&
          !this.router.url.startsWith('/search')
            ? {
                code: 'LWO',
                name: 'Lviv',
              }
            : formData.destinationFrom,
        destinationTo: formData.destinationTo,
        startDate: formData.startDate,
        endDate: formData.endDate,
        transfers: formData.transfers,
      });
    });
  }

  onSubmitForm() {
    this.store.dispatch(new SetFormDate(this.flightDataFormGroup.value));

    if (!this.router.url.startsWith('/search')) {
      this.router.navigate(['/search/special-offers']);
    }
  }

  onResetForm() {
    this.flightDataFormGroup.reset({});
  }
}
