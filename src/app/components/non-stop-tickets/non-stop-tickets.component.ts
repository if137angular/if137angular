import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlightsInfoService } from 'src/app/services/flights-info.service';

@Component({
  selector: 'app-non-stop-tickets',
  templateUrl: './non-stop-tickets.component.html',
  styleUrls: ['./non-stop-tickets.component.scss'],
})
export class NonStopTicketsComponent implements OnInit {
  data: { data: Record<string, any> };
  originOptions: any[] = [
    { label: 'Kyiv', key: 'KBP' },
    { label: 'Lviv', key: 'LWO' },
    { label: 'Krakow', key: 'KRK' },
    { label: 'Warszawa', key: 'WAW' },
  ];
  destinationOptions: any[] = [
    { label: 'London', key: 'STN' },
    { label: 'Paris', key: 'CDG' },
    { label: 'Berlin', key: 'BER' },
    { label: 'Budapest', key: 'BUD' },
  ];
  cityOrigin: string;
  cityDest: string;
  currency: string = 'UAH';

  constructor(private flightsInfoService: FlightsInfoService) {}

  ngOnInit(): void {
    //   this.flightsInfoService.requestGetNonStopTickets().subscribe((res) => {
    //     this.data = res;
    //     console.log(this.data);
    // });
  }

  onUpdateOrigin(cityOrigin: any) {
    this.cityOrigin = cityOrigin;
  }

  onUpdateDestination(cityDest: any) {
    this.cityDest = cityDest;
  }

  onSubmitFlights() {
    this.flightsInfoService
      .requestGetNonStopTickets(this.cityOrigin, this.cityDest)
      .subscribe((response) => {
        this.data = response;
        console.log(this.data);
      });
  }
}
