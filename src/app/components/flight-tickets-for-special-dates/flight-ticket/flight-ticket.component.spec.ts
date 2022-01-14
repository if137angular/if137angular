import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTicketComponent } from './flight-ticket.component';

describe('FlightTicketComponent', () => {
  let component: FlightTicketComponent;
  let fixture: ComponentFixture<FlightTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
