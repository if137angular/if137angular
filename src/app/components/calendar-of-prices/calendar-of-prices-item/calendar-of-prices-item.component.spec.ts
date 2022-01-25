import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarOfPricesItemComponent } from './calendar-of-prices-item.component';

describe('CalendarOfPricesItemComponent', () => {
  let component: CalendarOfPricesItemComponent;
  let fixture: ComponentFixture<CalendarOfPricesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarOfPricesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarOfPricesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
