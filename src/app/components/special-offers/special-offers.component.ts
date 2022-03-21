import { RequestDataState } from 'src/app/store/request-data.state';
import { Select, Store } from '@ngxs/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormDataModel } from 'src/app/models/formData.model';
import { GetSpecialOffers } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss'],
})
export class SpecialOffersComponent implements OnInit {
  @Select(RequestDataState.formData) formData$: Observable<FormDataModel>;
  @Select(FlightInfoState.specialOffers) offers$: Observable<any>;

  language: string = 'en';
  currency: string = 'uah';
  cityOrigin: string = 'IEV';
  destinationCity: string;

  constructor(public store: Store) { }

  ngOnInit(): void {
    this.formData$
      .pipe(untilDestroyed(this))
      .subscribe((formData: FormDataModel) => {
        if (!formData.isFormValid) return;

        this.destinationCity = formData.destinationTo.name;
        this.currency = this.store.selectSnapshot(RequestDataState.currency);

        const payload = {
          cityOrigin: formData.destinationFrom
            ? formData.destinationFrom.code
            : this.cityOrigin,
          cityDestination: '',
          language: this.language,
          currency: this.currency,
        };
        this.store.dispatch(new GetSpecialOffers(payload));
      });
  }

  goToLink(link: any) {
    window.open(
      `https://search.jetradar.com/flights/${link}&currency=${this.currency}&locale=${this.language}`,
      '_blank'
    );
  }

  getCurrency(number: any) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 0,
    }).format(number);
  }

  getHours(min: any) {
    let hours = Math.trunc(min / 60);
    let minutes = min % 60;
    if (minutes === 0) {
      return `${hours}h`;
    }
    if (hours === 0 && minutes !== 0) {
      return ` ${minutes}m`;
    }
    return `${hours}h:${minutes}m`;
  }
}
