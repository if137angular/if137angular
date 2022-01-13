import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlightsInfoService } from 'src/app/services/flights-info.service';




@Component({
  selector: 'app-non-stop-tickets',
  templateUrl: './non-stop-tickets.component.html',
  styleUrls: ['./non-stop-tickets.component.scss']
})
export class NonStopTicketsComponent implements OnInit {
  data: any;
  myControl = new FormControl();
  originOptions: any[] = [{label: 'Kyiv', key: 'KBP'}, {label: 'Lviv', key: 'LWO'}, {label:'Krakow', key: 'KRK'}];
  destinationOptions: any[] = [{label: 'London', key: 'STN'}, {label: 'Paris', key: 'CDG'}, {label:'Berlin', key: 'BER'}];
  updateOrigin: string = '';
  updateDestination: string = '';
  keyCity: string = '';
  

  constructor(private flightsInfoService: FlightsInfoService) {

   }

  ngOnInit(): void {
      this.flightsInfoService.requestGetNonStopTickets().subscribe((res) => {
        this.data = res;
        console.log(this.data);
    });
  }

  onUpdateOrigin(cityOrigin: any) {
    
    this.flightsInfoService.requestGetNonStopTickets(cityOrigin).subscribe((response) => {
      this.keyCity = cityOrigin;
      this.data = response;
      console.log(this.data);
  });
  }

  onUpdateDestination(cityDest: any) {
    this.keyCity = cityDest;
    this.flightsInfoService.requestGetNonStopTickets(cityDest).subscribe((response) => {
      this.data = response;
      console.log(this.data);

  });
}


}
