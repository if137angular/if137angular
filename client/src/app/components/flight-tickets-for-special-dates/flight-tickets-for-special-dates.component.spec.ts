import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTicketsForSpecialDatesComponent } from './flight-tickets-for-special-dates.component';

describe('FlightTicketsForSpecialDatesComponent', () => {
  let component: FlightTicketsForSpecialDatesComponent;
  let fixture: ComponentFixture<FlightTicketsForSpecialDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightTicketsForSpecialDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTicketsForSpecialDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
