import {Component, OnInit} from '@angular/core';
import {FlightsInfoService} from 'src/app/services/flights-info.service';
import {zip} from "rxjs";

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
  response: Map<string, DestinationPopular[]> = new Map<string,DestinationPopular[]>();
  keys: Set<string>;
  keys1: string[];
  keys2: string[];

  ngOnInit(): void {
    // const getPopularDestination$
    zip(this.flightInfoService
        .requestPopularDestination("IEV"),
      this.flightInfoService
        .requestDestinationModel("LWO"))
      .subscribe(([data1, data2]) => {
        const result1 = data1.data;
        const result2 = data2.data;
        const cities = [...result1.values(), ...result2.values()];
        console.log(cities)
        const groupOFCities = cities.reduce((acc:Map<string,DestinationPopular[]>, value:DestinationPopular) => {
          if (!acc.get(value.destination)) {
            acc.set(value.destination,[]);
          }

          acc.get(value.destination).push(value);

          return acc;
        }, new Map<string,DestinationPopular[]>());
        this.response = groupOFCities;
        // this.keys1 = Object.keys(data1.data);
        // this.keys2 = Object.keys(data2.data);
        // this.keys = new Set([...this.keys1, ...this.keys2]);
        // this.keys.forEach(value => console.log(value))
        // this.response = [data1.data, data2.data]
        // console.log(this.response)
      })
  }

  // .subscribe((data => {
  //   this.response = new Array<GetDestinationPopular>(data);
  //   console.log(this.response);
  // }));

}
