import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import {
  CalendarOfPricesModel,
  CalendarOfPricesPayload,
} from 'src/app/models/calendar-of-prices.model';
import { FormDataModel } from 'src/app/models/formData.model';
import { CalendarOfPricesLoaded } from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { RequestDataState } from 'src/app/store/request-data.state';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-calendar-of-prices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar-of-prices.component.scss'],
  templateUrl: './calendar-of-prices.component.html',
})
export class CalendarOfPricesComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  calendarData: CalendarOfPricesModel[];
  formData: CalendarOfPricesPayload;

  constructor(
    private store: Store,
    private modal: NgbModal,
    private cdRef: ChangeDetectorRef
  ) {}

  events: any[];

  ngOnInit(): void {
    this.store
      .select(FlightInfoState.calendarOfPrices)
      .pipe(untilDestroyed(this))
      .subscribe((state) => (this.events = state));

    this.store
      .select(RequestDataState.formData)
      .pipe(
        untilDestroyed(this),
        filter((state: any) => state.isFormValid),
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
        this.store.dispatch([new CalendarOfPricesLoaded(data)]);
        this.formData = data;
      });
  }

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: any;
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

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
// import {
//   Component,
//   ChangeDetectionStrategy,
//   ViewChild,
//   TemplateRef,
// } from '@angular/core';
// import {
//   startOfDay,
//   endOfDay,
//   subDays,
//   addDays,
//   endOfMonth,
//   isSameDay,
//   isSameMonth,
//   addHours,
// } from 'date-fns';
// import { Subject } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import {
//   CalendarEvent,
//   CalendarEventAction,
//   CalendarEventTimesChangedEvent,
//   CalendarView,
// } from 'angular-calendar';

// const colors: any = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3',
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF',
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA',
//   },
// };

// @Component({
//   selector: 'app-calendar-of-prices',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   styles: [
//     `
//       h3 {
//         margin: 0 0 10px;
//       }

//       pre {
//         background-color: #f5f5f5;
//         padding: 15px;
//       }
//     `,
//   ],
//   templateUrl: './calendar-of-prices.component.html',
// })
// export class CalendarOfPricesComponent {
//   @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

//   view: CalendarView = CalendarView.Month;

//   CalendarView = CalendarView;

//   viewDate: Date = new Date();

//   modalData: {
//     action: string;
//     event: CalendarEvent;
//   };

//   actions: CalendarEventAction[] = [
//     {
//       label: '<i class="fas fa-fw fa-pencil-alt"></i>',
//       a11yLabel: 'Edit',
//       onClick: ({ event }: { event: CalendarEvent }): void => {
//         this.handleEvent('Edited', event);
//       },
//     },
//     {
//       label: '<i class="fas fa-fw fa-trash-alt"></i>',
//       a11yLabel: 'Delete',
//       onClick: ({ event }: { event: CalendarEvent }): void => {
//         this.events = this.events.filter((iEvent) => iEvent !== event);
//         this.handleEvent('Deleted', event);
//       },
//     },
//   ];

//   refresh = new Subject<void>();

//   events: CalendarEvent[] = [
//     {
//       start: subDays(startOfDay(new Date()), 1),
//       end: addDays(new Date(), 1),
//       title: 'A 3 day event',
//       color: colors.red,
//       actions: this.actions,
//       allDay: true,
//       resizable: {
//         beforeStart: true,
//         afterEnd: true,
//       },
//       draggable: true,
//     },
//     {
//       start: startOfDay(new Date()),
//       title: 'An event with no end date',
//       color: colors.yellow,
//       actions: this.actions,
//     },
//     {
//       start: subDays(endOfMonth(new Date()), 3),
//       end: addDays(endOfMonth(new Date()), 3),
//       title: 'A long event that spans 2 months',
//       color: colors.blue,
//       allDay: true,
//     },
//     {
//       start: addHours(startOfDay(new Date()), 2),
//       end: addHours(new Date(), 2),
//       title: 'A draggable and resizable event',
//       color: colors.yellow,
//       actions: this.actions,
//       resizable: {
//         beforeStart: true,
//         afterEnd: true,
//       },
//       draggable: true,
//     },
//   ];

//   activeDayIsOpen: boolean = true;

//   constructor(private modal: NgbModal) {}

//   dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
//     if (isSameMonth(date, this.viewDate)) {
//       if (
//         (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
//         events.length === 0
//       ) {
//         this.activeDayIsOpen = false;
//       } else {
//         this.activeDayIsOpen = true;
//       }
//       this.viewDate = date;
//     }
//   }

//   eventTimesChanged({
//     event,
//     newStart,
//     newEnd,
//   }: CalendarEventTimesChangedEvent): void {
//     this.events = this.events.map((iEvent) => {
//       if (iEvent === event) {
//         return {
//           ...event,
//           start: newStart,
//           end: newEnd,
//         };
//       }
//       return iEvent;
//     });
//     this.handleEvent('Dropped or resized', event);
//   }

//   handleEvent(action: string, event: CalendarEvent): void {
//     this.modalData = { event, action };
//     this.modal.open(this.modalContent, { size: 'lg' });
//   }

//   addEvent(): void {
//     this.events = [
//       ...this.events,
//       {
//         title: 'New event',
//         start: startOfDay(new Date()),
//         end: endOfDay(new Date()),
//         color: colors.red,
//         draggable: true,
//         resizable: {
//           beforeStart: true,
//           afterEnd: true,
//         },
//       },
//     ];
//   }

//   deleteEvent(eventToDelete: CalendarEvent) {
//     this.events = this.events.filter((event) => event !== eventToDelete);
//   }

//   setView(view: CalendarView) {
//     this.view = view;
//   }

//   closeOpenMonthViewDay() {
//     this.activeDayIsOpen = false;
//   }
// }
