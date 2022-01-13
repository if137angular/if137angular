import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightsInfoService } from 'src/app/services/flights-info.service';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  offers$: Observable<{ data: any }>;

  cityOrign: string = 'LWO'
  language: string = 'en_us';
  currency: string = 'eur';

  constructor(public flightsInfoService: FlightsInfoService) { }



  gotToLink(link: any) {
    window.open('https://www.aviasales.ua' + link, '_blank')
  }

  getCurrency(number: any) {
    let language = this.language;
    return new Intl.NumberFormat(language.substring(0, 2), { style: 'currency', currency: this.currency }).format(number);
  }

  // If I use getSpecialOffers() it doesn't display UI in first time rendering.

  // getSpecialOffers(language = 'rus', currency = 'eur', cityOrign: string = 'LWO'): void {
  //   this.offers$ = this.flightsInfoService.getSpecialOffers(cityOrign, language, currency);
  // }

  ngOnInit(language = 'rus', currency = 'eur', cityOrign: string = 'LWO'): void {
    this.offers$ = this.flightsInfoService.getSpecialOffers(cityOrign, language, currency);
  }

  onSelectedLanguageChanged(language: string) {
    this.language = language;
    this.ngOnInit(language, this.currency);
  }

  onSelectedCurrencyChanged(currency: string) {
    this.currency = currency;
    this.ngOnInit(this.language, currency);
  }
}
