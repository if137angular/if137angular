import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightPriceTrendsComponent } from './flight-price-trends.component';

describe('FlightPriceTrendsComponent', () => {
  let component: FlightPriceTrendsComponent;
  let fixture: ComponentFixture<FlightPriceTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightPriceTrendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightPriceTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
