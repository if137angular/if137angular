import { Component, OnInit } from '@angular/core';
import { FlightsInfoService } from 'src/app/services/flights-info.service';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  offers: any = {};

  cityOrign: string = 'LWO'
  locale: string = 'en_us';
  currency: string = 'eur';

  constructor(public specialOffersService: FlightsInfoService) { }

  ngOnInit(): void {
    this.specialOffersService.getSpecialOffers(this.cityOrign, this.locale, this.currency).subscribe((offers => {
      this.offers = offers;
    }));
  }

  gotToLink(link: any) {
    window.open('https://www.aviasales.ua' + link, '_blank')
  }

  getCurrency(number: any) {
    let locale = this.locale;
    let currency = this.offers.currency
    return new Intl.NumberFormat(locale.substring(0, 2), { style: 'currency', currency: currency }).format(number);
  }

}
