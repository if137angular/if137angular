import {Component, Input, OnInit} from '@angular/core'
import * as moment from 'moment';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  @Input() ticketData : any
  expiresDate: string = ''

  ngOnInit(): void {
    this.expiresDate = moment(this.ticketData.expires_at).format('D MMM YYYY HH:mm')
  }

}
