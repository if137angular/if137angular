import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { NgxsModule, Store } from '@ngxs/store';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { NonStopTicketsComponent } from './non-stop-tickets.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DebugElement } from '@angular/core';
import { GetSpecialOffers } from 'src/app/store/flight-info.action';


describe('NonStopTicketsComponent', () => {
  let component: NonStopTicketsComponent;
  let fixture: ComponentFixture<NonStopTicketsComponent>;
  let debugElement: DebugElement;
  let storeMock: any;
  let store: any;
  let flightsInfoServiceMock: any;
  let formDataSubject = new Subject();
  let nonStopTicketsSubject = new Subject();


  beforeEach(() => {
    storeMock = {
      select: jasmine.createSpy('select')
        .withArgs(FormData).and.returnValue(formDataSubject.asObservable()),
    };

    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
          AppRoutingModule,
          FormsModule,
          ReactiveFormsModule,
          MatInputModule,
          MatButtonModule,
          MatAutocompleteModule,
          MatSelectModule,
          MatDatepickerModule,
          MatNativeDateModule
        ],
      declarations: [ NonStopTicketsComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock }
      ],
    })
    .compileComponents();
 
    fixture = TestBed.createComponent(NonStopTicketsComponent);
    debugElement = fixture.debugElement;
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    formDataSubject.complete();
    nonStopTicketsSubject.complete();
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#dispatchNonStopTickets', () => {
    it('should dispatch Non Stop Tickets', () => {
      const formData = {
        destinationFrom: {
          code: 'LWO'
        },
        destinationTo: null,
      } as any;

      flightsInfoServiceMock.requestNonStopTickets(formData);

      expect(store).toHaveBeenCalledWith(({
        cityOrigin: 'LWO',
        cityDestination: ''
      }))

    })
  })




});


