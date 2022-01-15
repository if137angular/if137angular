import {Component, OnInit} from '@angular/core';
import {FlightsInfoService} from 'src/app/services/flights-info.service';
import {zip, of} from "rxjs";
import {mergeMap, groupBy, reduce} from 'rxjs/operators';

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
  styleUrls: ['./city-destination.component.scss']
})

export class CityDestinationComponent implements OnInit {

  selectByDestination() {

  }

  constructor(private flightInfoService: FlightsInfoService) {
  }

  items: GetDestinationPopular[] = []
  response: Map<string, DestinationPopular[]> = new Map<string, DestinationPopular[]>();
  cities: DestinationPopular[];

  ngOnInit(): void {
    // const getPopularDestination$
    zip(this.flightInfoService
        .requestPopularDestination("IEV"),
      this.flightInfoService
        .requestPopularDestination("LWO"),
      this.flightInfoService
        .requestPopularDestination("DNK"),
      this.flightInfoService
        .requestPopularDestination("ODS"))
      .subscribe(([data1, data2, data3, data4]) => {

        this.cities = [...Object.values(data1.data), ...Object.values(data2.data), ...Object.values(data3.data), ...Object.values(data4.data),];
        console.log(this.cities)
        of(...this.cities).pipe(
          groupBy(p => p.destination),
          mergeMap((group$) => group$.pipe(reduce((acc: DestinationPopular[], cur) => [...acc, cur], [])))
        )
          .subscribe(items => {
            if (items.length > 3) {
              this.response.set(items[0].destination, items)
            }
          });

        console.log(this.response)

      })
  }


}
