import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';
import { CitiesModel } from 'src/app/models/cities.model';
import { SetFormDate } from 'src/app/store/request-data.action';
import { FormDataModel } from 'src/app/models/formData.model';
import { GetLocationModel } from 'src/app/models/GetLocation.model';
import { IpFullModel } from 'src/app/models/ip.model';

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
  userData: IpFullModel;

  flightDataFormGroup: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    destinationFrom: new FormControl(),
    destinationTo: new FormControl(),
    transfers: new FormControl(),
  });

  @Select(RequestDataState.cities) cities$: Observable<CitiesModel[]>;
  @Select(RequestDataState.location) location$: Observable<GetLocationModel[]>;
  @Select(RequestDataState.formData) formData$: Observable<FormDataModel>;

  constructor(
    private store: Store,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.location$.subscribe((location: GetLocationModel[]) => {
      this.location = location;
    });

    this.cities$.subscribe((cities: CitiesModel[]) => {
      this.cities = cities;
    });

    this.formData$.subscribe((formData: FormDataModel) => {
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
    this.store.dispatch(new SetFormDate(this.flightDataFormGroup.value));

    if (!this.router.url.startsWith('/search')) {
      this.router.navigate(['/search/special-offers']);
    }
  }

  onResetForm() {
    this.flightDataFormGroup.reset({});
  }
}
