import { Component, Inject, OnInit } from '@angular/core';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { zip, of } from "rxjs";
import { mergeMap, groupBy, reduce } from 'rxjs/operators';
import { Select, Store } from "@ngxs/store";
import { CitiesModel } from "src/app/models/cities.model";
import { RequestDataState } from "src/app/store/request-data.state";
import { SetFormDate } from "../../store/request-data.action";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { GetPopularDestinations } from "src/app/store/flight-info.action";
import { FlightInfoState } from "src/app/store/flight-info.state";
import { Observable } from "rxjs";
import { DOCUMENT } from "@angular/common";

export type DestinationPopular = {
  origin: string;
  destination: string;
  departure_at: Date;
  return_at: Date;
  expires_at: Date;
  number_of_changes: number;
  price: number;
  found_at: Date;
  transfers: number;
  airline: string;
  flight_number: number;
}
export type GetDestinationPopular = {
  success: boolean;
  data: Map<string, DestinationPopular>;
  currency: string;
};

@UntilDestroy()
@Component({
  selector: 'app-city-destination',
  templateUrl: './city-destination.component.html',
  styleUrls: [ './city-destination.component.scss' ]
})

export class CityDestinationComponent implements OnInit {
  @Select(FlightInfoState.popularDestinations)
  popularDestinations$: Observable<Map<string, DestinationPopular[]>>;

  private popularDestinationCities = [ 'IEV', 'LWO', 'DNK', 'ODS' ];
  constructor(private flightInfoService: FlightsInfoService, private store: Store,
              @Inject('Window') private window: Window) {
  }

  items: GetDestinationPopular[] = []
  response: Map<string, DestinationPopular[]> = new Map<string, DestinationPopular[]>();
  cities: DestinationPopular[];
  selectedDestinstion: string = '';
  selectedOrigin: string = '';
  selectedCities: string

  ngOnInit(): void {
    this.store.dispatch(new GetPopularDestinations(this.popularDestinationCities));
  }

  getCityNameByKey(cityKey: string): string {
    const matchedCity = this.store.selectSnapshot(RequestDataState.cities).find((city: CitiesModel) => city.code === cityKey);
    return matchedCity ? matchedCity.name : ''
  }

  getCountryCodeByCityCode(countryKey: string): string {
    const matchedCountry = this.store.selectSnapshot(RequestDataState.cities).find((city: CitiesModel) => city.code === countryKey);
    return matchedCountry ? matchedCountry.country_code : ''
  }


  selectDestination(selectedDestination: any) {
    this.selectedCities = this.getCityNameByKey(selectedDestination.origin);
    this.selectedDestinstion = this.getCityNameByKey(selectedDestination.destination);
    const formData = {
      destinationFrom: {
        name: this.getCityNameByKey(selectedDestination.origin),
        code: this.getCountryCodeByCityCode(selectedDestination.origin)
      },
      destinationTo: {
        name: this.getCityNameByKey(selectedDestination.destination),
        code: this.getCountryCodeByCityCode(selectedDestination.destination)
      },
      endDate: new Date(),
      startDate: new Date()
    }
    this.store.dispatch(new SetFormDate(formData));
    this.window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
