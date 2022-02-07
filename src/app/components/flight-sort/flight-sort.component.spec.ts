import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSortComponent } from './flight-sort.component';

describe('FlightSortComponent', () => {
  let component: FlightSortComponent;
  let fixture: ComponentFixture<FlightSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
