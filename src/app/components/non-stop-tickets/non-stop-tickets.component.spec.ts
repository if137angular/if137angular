import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { NonStopTicketsComponent } from './non-stop-tickets.component';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';
import { RequestDataService } from 'src/app/services/request-data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { appState } from 'src/app/store/app.state';

describe('NonStopTicketsComponent', () => {
  let component: NonStopTicketsComponent;
  let fixture: ComponentFixture<NonStopTicketsComponent>;

  let flightsInfoServiceMock: any;
  let requestDataServiceMock: any;
  let storeMock: any;
  let formDataSubject = new Subject();
  let nonStopTicketSubject = new Subject();
  let RequestDataStateSubject = new Subject();

  beforeEach(async () => {
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.formData)
        .and.returnValue(formDataSubject.asObservable())
        .withArgs(FlightInfoState.nonStopTickets)
        .and.returnValue(nonStopTicketSubject.asObservable())
        .withArgs(RequestDataState.currency)
        .and.returnValue(RequestDataStateSubject.asObservable()),
      selectSnapshot: jasmine.createSpy('selectSnapshot'),
    };

    await TestBed.configureTestingModule({
      declarations: [NonStopTicketsComponent],
      imports: [
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        }),
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonStopTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
