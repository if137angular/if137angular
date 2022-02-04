import { Component, Inject, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SetFormDate } from '../../store/request-data.action';
import { UntilDestroy } from '@ngneat/until-destroy';
import { GetPopularDestinations } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { Observable } from 'rxjs';
import {
  GetDestinationPopular,
  DestinationPopular,
  CityInfo,
} from '../../models/city-destination.model';
import {RequestDataState} from "../../store/request-data.state";

@UntilDestroy()
@Component({
  selector: 'app-city-destination',
  templateUrl: './city-destination.component.html',
  styleUrls: ['./city-destination.component.scss'],
})
export class CityDestinationComponent implements OnInit {
  @Select(FlightInfoState.popularDestinations)
  popularDestinations$: Observable<Map<CityInfo, DestinationPopular[]>>;

  private popularDestinationCities = ['IEV', 'LWO', 'DNK', 'ODS'];
  constructor(private store: Store, @Inject('Window') private window: Window) {}

  items: GetDestinationPopular[] = [];
  response: Map<CityInfo, DestinationPopular[]> = new Map<
    CityInfo,
    DestinationPopular[]
  >();
  cities: DestinationPopular[];
  selectedDestinstion: string = '';
  selectedOrigin: string = '';
  selectedCities: string;
  language: string = 'en';
  currency: string = 'uah';

  ngOnInit(): void {
    this.store.dispatch(
      new GetPopularDestinations(this.popularDestinationCities)
    );
    this.currency = this.store.selectSnapshot(RequestDataState.currency);
  }


  getCurrency(number: any) {
    let language = this.language;
    return new Intl.NumberFormat(language.substring(0, 2), {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 0,
    }).format(number);
  }


  selectDestination(selectedDestination: DestinationPopular) {
    this.selectedCities = selectedDestination.originName;
    this.selectedDestinstion = selectedDestination.destination;
    const formData = {
      destinationFrom: {
        name: selectedDestination.originName,
        code: selectedDestination.origin,
      },
      destinationTo: {
        name: selectedDestination.destinationName,
        code: selectedDestination.destination,
      },
      endDate: new Date(),
      startDate: new Date(),
    };
    this.store.dispatch(new SetFormDate(formData));
    this.window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
