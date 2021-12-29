import { Component, OnInit } from '@angular/core';
import { RequestDataService } from 'src/app/services/request-data.service';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  offers: any = [];

  constructor(private specialOffersService: RequestDataService) { }

  ngOnInit(): void {
    this.specialOffersService.exampleRequestGetChipTickets().subscribe((offers => {
      this.offers = offers;
      console.log('AAAAAAAAAAAAAAAAAA', offers)
    }));

  }

}
