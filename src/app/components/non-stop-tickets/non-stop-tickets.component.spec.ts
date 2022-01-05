import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonStopTicketsComponent } from './non-stop-tickets.component';

describe('NonStopTicketsComponent', () => {
  let component: NonStopTicketsComponent;
  let fixture: ComponentFixture<NonStopTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonStopTicketsComponent ]
    })
    .compileComponents();
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
