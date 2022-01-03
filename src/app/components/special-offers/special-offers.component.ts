import { Component, OnInit } from '@angular/core';
import { RequestDataService } from 'src/app/services/request-data.service';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  offers: any = {};

  constructor(private specialOffersService: RequestDataService) { }

  ngOnInit(): void {
    this.specialOffersService.exampleRequestGetChipTickets().subscribe((offers => {
      this.offers = offers;
    }));

  }

  getTime(time: any) {
    let currentDate = Date.now();
    let departure = Date.parse(time);
    let left = departure - currentDate;
    let days = left / 1000 / 60 / 60 / 24;
    return Math.round(days);
  }

  gotToLink(link: any) {
    window.open('https://www.aviasales.ua' + link, '_blank')
  }
}
