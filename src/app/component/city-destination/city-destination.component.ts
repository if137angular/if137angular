import {Component, OnInit} from '@angular/core';
import {FlightsInfoService} from 'src/app/services/flights-info.service';


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

  isActive: boolean = false;

  selectByDestination(){

  }

  toggleActive() {
    this.isActive = !this.isActive;
  }
  constructor(private flightInfoService: FlightsInfoService) {
  }

  response: GetDestinationPopular[] = [];

  ngOnInit(): void {
    this.flightInfoService
      .requestPopularDestination()
      .subscribe((data => {
        this.response = new Array<GetDestinationPopular>(data);
        console.log(this.response);
      }));
  }

}
