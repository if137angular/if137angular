import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDataFormComponent } from './flight-data-form.component';

describe('FlightDataFormComponent', () => {
  let component: FlightDataFormComponent;
  let fixture: ComponentFixture<FlightDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
