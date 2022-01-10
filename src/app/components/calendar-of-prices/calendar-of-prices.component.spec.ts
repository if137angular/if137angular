import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarOfPricesComponent } from './calendar-of-prices.component';

describe('CalendarOfPricesComponent', () => {
  let component: CalendarOfPricesComponent;
  let fixture: ComponentFixture<CalendarOfPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarOfPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarOfPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
