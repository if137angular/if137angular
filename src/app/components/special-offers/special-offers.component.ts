import { RequestDataState } from 'src/app/store/request-data.state';
import { Select, Store } from '@ngxs/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormDataModel } from 'src/app/models/formData.model';
import { GetSpecialOffers } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss'],
})
export class SpecialOffersComponent implements OnInit, OnDestroy {
  @Select(RequestDataState.formData)
  formData$: Observable<FormDataModel>;

  @Select(FlightInfoState.specialOffers)
  offers$: Observable<any>;

  language: string = 'en';
  currency: string = 'usd';
  cityOrigin: string = 'IEV';

  private unsubscribe$ = new Subject<null>();
  constructor(public store: Store) { }

  gotToLink(link: any) {
    window.open(
      `https://search.jetradar.com/flights/${link}&currency=${this.currency}&locale=${this.language}`,
      '_blank'
    );
  }

  getCurrency(number: any) {
    let language = this.language;
    return new Intl.NumberFormat(language.substring(0, 2), {
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

  ngOnInit(): void {
    this.formData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((formData: FormDataModel) => {
        if (!formData.isFormValid) { return };
        this.dispatchSpecialOffers(formData);
      });
  }

  dispatchSpecialOffers(formData: FormDataModel): void {
    const payload = {
      cityOrigin: formData.destinationFrom
        ? formData.destinationFrom.code
        : this.cityOrigin,
      cityDestination: '',
      language: this.language,
      currency: this.currency,
    };
    this.store.dispatch(new GetSpecialOffers(payload));
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
