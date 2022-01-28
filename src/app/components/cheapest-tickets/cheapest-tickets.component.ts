import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RequestDataState } from '../../store/request-data.state';
import { Observable } from 'rxjs';
import { FormDataModel } from '../../models/formData.model';
import { CheapestTicketsRequest } from '../../store/flight-info.action';
import { FlightInfoState } from '../../store/flight-info.state';
import { CheapestTicketModel } from '../../models/cheapest-tickets.model';
import * as moment from 'moment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-cheapest-tickets',
  templateUrl: './cheapest-tickets.component.html',
  styleUrls: ['./cheapest-tickets.component.scss'],
})
export class CheapestTicketsComponent implements OnInit {
  @Select(RequestDataState.formData)
  formData$: Observable<FormDataModel>;

  @Select(FlightInfoState.loading)
  loading$: Observable<boolean>;

  @Select(FlightInfoState.currency)
  currency$: Observable<string>;

  @Select(FlightInfoState.cheapestTickets)
  cheapestTickets$: Observable<Array<CheapestTicketModel> | null>;

  @Select(FlightInfoState.errors)
  errors$: Observable<string>;

  cheapestTicketsArr: CheapestTicketModel[];
  formData: FormDataModel;
  sortModes: { sortBy: string; value: string }[] = [
    { sortBy: 'priceIncrease', value: 'Price Increase' },
    { sortBy: 'priceDecrease', value: 'Price Decrease' },
    { sortBy: 'timeIncrease', value: 'Time Increase' },
    { sortBy: 'timeDecrease', value: 'Time Decrease' },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.formData$
      .pipe(untilDestroyed(this))
      .subscribe((formData: FormDataModel) => {
        this.formData = formData;
        this.store.dispatch(new CheapestTicketsRequest(formData));
      });

    this.cheapestTickets$
      .pipe(untilDestroyed(this))
      .subscribe((cheapestTickets: CheapestTicketModel[] | null) => {
        if (cheapestTickets) this.cheapestTicketsArr = cheapestTickets;
      });
  }

  sortTickets = (mode: string): void => {
    switch (mode) {
      case 'priceIncrease':
        this.cheapestTicketsArr = this.cheapestTicketsArr
          .slice()
          .sort(
            (leftObj: CheapestTicketModel, rightObj: CheapestTicketModel) => {
              return leftObj.price - rightObj.price;
            }
          );
        break;
      case 'priceDecrease':
        this.cheapestTicketsArr = this.cheapestTicketsArr
          .slice()
          .sort(
            (leftObj: CheapestTicketModel, rightObj: CheapestTicketModel) => {
              return rightObj.price - leftObj.price;
            }
          );
        break;
      case 'timeIncrease':
        this.cheapestTicketsArr = this.cheapestTicketsArr
          .slice()
          .sort(
            (leftObj: CheapestTicketModel, rightObj: CheapestTicketModel) => {
              return moment
                .utc(leftObj.departure_at)
                .diff(moment.utc(rightObj.departure_at));
            }
          );
        break;
      case 'timeDecrease':
        this.cheapestTicketsArr = this.cheapestTicketsArr
          .slice()
          .sort(
            (leftObj: CheapestTicketModel, rightObj: CheapestTicketModel) => {
              return moment
                .utc(rightObj.departure_at)
                .diff(moment.utc(leftObj.departure_at));
            }
          );
        break;
      default:
        break;
    }
  };
}
