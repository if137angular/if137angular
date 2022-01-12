import { Component, OnInit } from '@angular/core';
import { FlightsInfoService } from 'src/app/services/flights-info.service';

@Component({
  selector: 'app-non-stop-tickets',
  templateUrl: './non-stop-tickets.component.html',
  styleUrls: ['./non-stop-tickets.component.scss']
})
export class NonStopTicketsComponent implements OnInit {
  data: any;
  addTicketStatus: string = 'No Tickets';
  updateText: string = '';
  addNewText: boolean = false;

  constructor(private flightsInfoService: FlightsInfoService) {

   }

  ngOnInit(): void {
      this.flightsInfoService.requestGetNonStopTickets().subscribe((res) => {
        this.data = res;
        console.log(this.data);
    });
  }

  onAddTickets() {
    this.addNewText = true;
    this.addTicketStatus = this.updateText;
    this.updateText = '';
  }

}
