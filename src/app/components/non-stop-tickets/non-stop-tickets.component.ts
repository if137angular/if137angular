import { Component, OnInit, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';
import { FormDataModel } from 'src/app/models/formData.model';
import { NonStopInfo } from 'src/app/models/non-stop-tickets.model';
import { GetNonStopTickets } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';


@UntilDestroy()
@Component({
  selector: 'app-non-stop-tickets',
  templateUrl: './non-stop-tickets.component.html',
  styleUrls: ['./non-stop-tickets.component.scss'],
})
export class NonStopTicketsComponent implements OnInit {
  cityOrigin: string;
  cityArrival: string;
  cityOriginCode: string;
  cityArrivalCode: string;

  @Select(RequestDataState.formData) formData$: Observable<FormDataModel>;
  @Select(FlightInfoState.nonStopTickets) nonStopTickets$: Observable<NonStopInfo[]>;
  @Select(RequestDataState.currency) currency$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.formData$
      .pipe(
        untilDestroyed(this),
        filter((formData:any) => formData.isFormValid)
      )
      .subscribe((formData: FormDataModel) => {
        this.cityOrigin = formData.destinationFrom.name;
        this.cityArrival = formData.destinationTo.name;
        this.cityOriginCode = formData.destinationFrom.code;
        this.cityArrivalCode = formData.destinationTo.code;
        this.store.dispatch(new GetNonStopTickets(formData));
      });
  }

  // popUpToggle(popUp: TemplateRef<any>) {
  //   this.dialog.open(popUp, {panelClass: 'custom-dialog'});
  //   }

}
