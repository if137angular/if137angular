import { Component, OnInit } from '@angular/core';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { zip, of } from "rxjs";
import { mergeMap, groupBy, reduce } from 'rxjs/operators';
import { Store } from "@ngxs/store";
import { CitiesModel } from "src/app/models/cities.model";
import { RequestDataState } from "src/app/store/request-data.state";



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

@Component({
  selector: 'app-city-destination',
  templateUrl: './city-destination.component.html',
  styleUrls: [ './city-destination.component.scss' ]
})

export class CityDestinationComponent implements OnInit {
  constructor(private flightInfoService: FlightsInfoService, private store: Store) {
  }

  items: GetDestinationPopular[] = []
  response: Map<string, DestinationPopular[]> = new Map<string, DestinationPopular[]>();
  cities: DestinationPopular[];
  selectedDestinstion: string = '';
  selectedOrigin: string = '';
  selectedCities: string

  ngOnInit(): void {
    zip(this.flightInfoService
        .requestPopularDestination("IEV"),
      this.flightInfoService
        .requestPopularDestination("LWO"),
      this.flightInfoService
        .requestPopularDestination("DNK"),
      this.flightInfoService
        .requestPopularDestination("ODS"))
      .subscribe(([ data1, data2, data3, data4 ]) => {

        this.cities = [ ...Object.values(data1.data), ...Object.values(data2.data), ...Object.values(data3.data), ...Object.values(data4.data), ];
        of(...this.cities).pipe(
          groupBy(p => p.destination),
          mergeMap((group$) => group$.pipe(reduce((acc: DestinationPopular[], cur) => [ ...acc, cur ], [])))
        )
          .subscribe(items => {
            if (items.length > 3) {
              this.response.set(items[0].destination, items)
            }
          });
      })
  }

  getCityNameByKey(cityKey: string): string {
    const matchedCity = this.store.selectSnapshot(RequestDataState.cities).find((city: CitiesModel) => city.code === cityKey);
    return matchedCity ? matchedCity.name : ''
  }

  getCountryCodeByCityCode(countryKey: string): string {
    const matchedCountry = this.store.selectSnapshot(RequestDataState.cities).find((city: CitiesModel) => city.code === countryKey);
    return matchedCountry ? matchedCountry.country_code : ''
  }


  onChangeObj(newObj: any) {
    this.selectedOrigin = this.getCityNameByKey(newObj.origin);
    console.log(this.selectedOrigin);
    this.selectedDestinstion = this.getCityNameByKey(newObj.destination);
    console.log(this.selectedDestinstion);
      const formData = {
        destinationFrom: this.selectedOrigin,
        destinationTo: this.selectedDestinstion,
        endDate: new Date(),
        startDate: new Date(),
        transfers: null,
      }
      this.store.dispatch(new SetFormDate(formData))
    }
}
