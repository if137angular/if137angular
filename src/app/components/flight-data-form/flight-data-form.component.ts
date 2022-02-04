import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, skip } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';
import { CitiesModel } from 'src/app/models/cities.model';
import { SetFormDate } from 'src/app/store/request-data.action';
import { FormDataModel } from 'src/app/models/formData.model';
import { GetLocationModel } from 'src/app/models/GetLocation.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-flight-data-form',
  templateUrl: './flight-data-form.component.html',
  styleUrls: ['./flight-data-form.component.scss'],
})
export class FlightDataFormComponent implements OnInit {
  cities: CitiesModel[] = [];
  location: any;
  transfers: string = '';
  minDate: Date = new Date();

  flightDataFormGroup: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    destinationFrom: new FormControl(''),
    destinationTo: new FormControl(''),
    transfers: new FormControl(),
  });

  @Select(RequestDataState.cities) cities$: Observable<CitiesModel[]>;
  @Select(RequestDataState.location) location$: Observable<GetLocationModel[]>;
  @Select(RequestDataState.formData) formData$: Observable<FormDataModel>;
  @Select(RequestDataState.currency) selectedCurrency$: Observable<any>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.location$
      .pipe(untilDestroyed(this))
      .subscribe((location: GetLocationModel[]) => {
        this.location = location;
      });

    this.cities$
      .pipe(untilDestroyed(this))
      .subscribe((cities: CitiesModel[]) => {
        this.cities = cities;
      });

    this.selectedCurrency$.pipe(untilDestroyed(this), skip(1)).subscribe(() => {
      this.store.dispatch(
        new SetFormDate(
          Object.assign(this.flightDataFormGroup.value, {
            isFormValid: this.flightDataFormGroup.valid,
          })
        )
      );
    });

    this.formData$
      .pipe(untilDestroyed(this))
      .subscribe((formData: FormDataModel) => {
        this.flightDataFormGroup.patchValue({
          destinationFrom: formData.destinationFrom,
          destinationTo: formData.destinationTo,
          startDate: formData.startDate,
          endDate: formData.endDate,
          transfers: formData.transfers,
        });
      });
  }

  onSubmitForm() {
    this.store.dispatch(
      new SetFormDate(
        Object.assign(this.flightDataFormGroup.value, {
          isFormValid: this.flightDataFormGroup.valid,
        })
      )
    );

    if (!this.router.url.startsWith('/search')) {
      this.router.navigate(['/search/flight-tickets']);
    }
  }

  onResetForm() {
    this.flightDataFormGroup.reset({});
  }
}
