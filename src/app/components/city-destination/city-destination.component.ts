import { Component, Inject, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SetFormDate } from '../../store/request-data.action';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GetPopularDestinations } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { Observable } from 'rxjs';
import {
  GetDestinationPopular,
  DestinationPopular,
  CityInfo,
} from '../../models/city-destination.model';
import { RequestDataState } from 'src/app/store/request-data.state';
import { CurrencyDropdownModel } from 'src/app/models/Currency-dropdown.model';

@UntilDestroy()
@Component({
  selector: 'app-city-destination',
  templateUrl: './city-destination.component.html',
  styleUrls: ['./city-destination.component.scss'],
})
export class CityDestinationComponent implements OnInit {
  @Select(FlightInfoState.popularDestinations)
  popularDestinations$: Observable<Map<CityInfo, DestinationPopular[]>>;
  @Select(RequestDataState.currency)
  currency$: Observable<CurrencyDropdownModel>;
  @Select(FlightInfoState.loading)
  loading$: Observable<any>;

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
  selectedCities: string = '';

  ngOnInit(): void {
    this.currency$.pipe(untilDestroyed(this)).subscribe(() => {
      this.store.dispatch(
        new GetPopularDestinations(this.popularDestinationCities)
      );
    });
  }

  selectDestination(selectedDestination: DestinationPopular) {
    this.selectedCities = selectedDestination.origin;
    this.selectedDestinstion = selectedDestination.destination;

    const { startDate, endDate } = this.store.selectSnapshot(
      RequestDataState.formData
    );

    const formData = {
      destinationFrom: {
        name: selectedDestination.originName,
        code: selectedDestination.origin,
      },
      destinationTo: {
        name: selectedDestination.destinationName,
        code: selectedDestination.destination,
      },
      startDate: startDate,
      endDate: endDate,
    };

    this.store.dispatch(new SetFormDate(formData));
    this.window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
