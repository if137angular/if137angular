import { Injectable } from '@angular/core';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { FlightInfo } from '../models/flight-tickets-for-date.model';
import { UniversalComponentModel } from '../models/Universal-component.model';
import { FlightInfoState } from '../store/flight-info.state';
import { Observable, of } from 'rxjs';
import { max } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterPriceService {

  // flightInfo: Observable<FlightInfo>;

  constructor(private store: Store) {
    // this.store
    // .select(FlightInfoState.flightTiketsForDate)
    // .pipe(untilDestroyed(this))
    // .subscribe((state) => (this.flightInfo = state));

    // of(this.flightInfo)
    // .pipe(
    //   max<any>((a: FlightInfo, b: FlightInfo) => a.price < b.price ? -1 : 1)
    // )
    // .subscribe((item: FlightInfo) => (console.log('***Max Price ', item.price)))

    // console.log('***FlightInfo', this.flightInfo)
    
  }

  // getMaxPrice() {

  // }

}
