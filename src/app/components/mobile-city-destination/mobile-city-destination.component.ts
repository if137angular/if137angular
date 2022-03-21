import {Component, Inject, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {FlightInfoState} from "../../store/flight-info.state";
import {Observable} from "rxjs";
import {CityInfo, DestinationPopular, GetDestinationPopular} from "../../models/city-destination.model";
import {RequestDataState} from "../../store/request-data.state";
import {CurrencyDropdownModel} from "../../models/Currency-dropdown.model";
import {GetPopularDestinations} from "../../store/flight-info.action";
import {SetFormDate} from "../../store/request-data.action";

@Component({
  selector: 'app-mobile-city-destination',
  templateUrl: './mobile-city-destination.component.html',
  styleUrls: ['./mobile-city-destination.component.scss']
})
export class MobileCityDestinationComponent implements OnInit {

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
    this.store.dispatch(
        new GetPopularDestinations(this.popularDestinationCities)
      );
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
