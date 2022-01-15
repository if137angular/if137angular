import { RequestDataState } from 'src/app/store/request-data.state';
import { Select, Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightsInfoService } from 'src/app/services/flights-info.service';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  @Select(RequestDataState.formData)

  formData$: Observable<any>;
  offers$: Observable<{ data: any }>;

  language: string = 'en';
  currency: string = 'usd';
  constructor(public flightsInfoService: FlightsInfoService) { }

  gotToLink(link: any) {
    window.open(`https://search.jetradar.com/flights/${link}&currency=${this.currency}&locale=${this.language}`, '_blank')
  }

  getCurrency(number: any) {
    let language = this.language;
    return new Intl.NumberFormat(language.substring(0, 2), { style: 'currency', currency: this.currency }).format(number);
  }

  getHours(min: any) {
    let hours = Math.trunc(min / 60);
    let minutes = min % 60;
    return `${hours}h:${minutes}min`;
  }

  ngOnInit(language = 'en', currency = 'eur', cityOrign: string = 'IEV', cityDestination: string = ''): void {
    this.formData$.subscribe((formData: any) => {

      // if (!formData) {
      //   this.offers$ = this.flightsInfoService.getSpecialOffers(cityOrign, cityDestination, language, currency)
      // } else {
      //   this.offers$ = this.flightsInfoService.getSpecialOffers(formData.destinationFrom.code, cityDestination, language, currency)
      // }

      this.offers$ = this.flightsInfoService.getSpecialOffers(
        formData.destinationFrom ? formData.destinationFrom.code : cityOrign,
        formData.destinationTo ? formData.destinationTo.code : cityDestination,
        language, currency);

    });
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
