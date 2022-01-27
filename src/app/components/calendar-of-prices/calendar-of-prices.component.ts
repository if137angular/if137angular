import { OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import {
  CalendarOfPricesModel,
  CalendarOfPricesPayload,
} from 'src/app/models/calendar-of-prices.model';
import { FormDataModel } from 'src/app/models/formData.model';
import {
  CalendarOfPricesLoaded,
  StartLoading,
} from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { RequestDataState } from 'src/app/store/request-data.state';

// @Component({
//   selector: 'app-calendar-of-prices',
//   templateUrl: './calendar-of-prices.component.html',
//   styleUrls: ['./calendar-of-prices.component.scss'],
//   host: {
//     class: 'calendar-component',
//   },
// })
// export class CalendarOfPricesComponent implements OnInit {
//   calendarData: CalendarOfPricesModel[];
//   formData: CalendarOfPricesPayload;
//   currency: string;
//   loading: boolean;
//   loadingCardCount: number[];

//   constructor(private store: Store) {
//     this.loadingCardCount = Array(36).map((n) => n);
//   }

//   ngOnInit(): void {
//     this.store
//       .select(FlightInfoState.calendarOfPrices)
//       .subscribe((state) => (this.calendarData = state));

//     this.store
//       .select(FlightInfoState.currency)
//       .subscribe((state) => (this.currency = state));

//     this.store
//       .select(FlightInfoState.loading)
//       .subscribe((state) => (this.loading = state));

//     this.store
//       .select(RequestDataState.formData)
//       .pipe(
//         map((state: FormDataModel) => ({
//           origin: state.destinationFrom.name,
//           destination: state.destinationTo.name,
//           originCode: state.destinationFrom.code,
//           destinationCode: state.destinationTo.code,
//           return_date: state.endDate.toISOString().split('T')[0],
//           depart_date: state.startDate.toISOString().split('T')[0],
//         }))
//       )
//       .subscribe((data: CalendarOfPricesPayload) => {
//         this.store.dispatch([
//           new StartLoading(),
//           new CalendarOfPricesLoaded(data),
//         ]);
//         this.formData = data;
//       });
//   }
// }
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

@Component({
  selector: 'app-calendar-of-prices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar-of-prices.component.scss'],
  templateUrl: './calendar-of-prices.component.html',
})
export class CalendarOfPricesComponent {
  calendarData: CalendarOfPricesModel[];
  formData: CalendarOfPricesPayload;
  currency: string;
  loadingCardCount: number[];

  constructor(private store: Store, private modal: NgbModal) {
    this.loadingCardCount = Array(36).map((n) => n);
  }

  events: any[];

  ngOnInit(): void {
    this.store
      .select(FlightInfoState.calendarOfPrices)
      .subscribe((state) => (this.events = state));

    this.store
      .select(FlightInfoState.currency)
      .subscribe((state) => (this.currency = state));

    this.store
      .select(RequestDataState.formData)
      .pipe(
        map((state: FormDataModel) => ({
          origin: state.destinationFrom.name,
          destination: state.destinationTo.name,
          originCode: state.destinationFrom.code,
          destinationCode: state.destinationTo.code,
          return_date: state.endDate.toISOString().split('T')[0],
          depart_date: state.startDate.toISOString().split('T')[0],
        }))
      )
      .subscribe((data: CalendarOfPricesPayload) => {
        this.store.dispatch([
          new CalendarOfPricesLoaded(data),
        ]);
        this.formData = data;
      });
  }

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {}

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
