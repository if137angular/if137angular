import { Component, OnInit } from '@angular/core';
import { FlightsInfoService } from 'src/app/services/flights-info.service';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  offers: any = {};

  originCity: string = 'LWO'

  constructor(private specialOffersService: FlightsInfoService) { }

  ngOnInit(): void {
    this.specialOffersService.getSpecialOffers(this.originCity).subscribe((offers => {
      this.offers = offers;
    }));
  }

  gotToLink(link: any) {
    window.open('https://www.aviasales.ua' + link, '_blank')
  }

}
