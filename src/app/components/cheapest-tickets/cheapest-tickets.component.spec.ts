import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheapestTicketsComponent } from './cheapest-tickets.component';

describe('CheapestTicketsComponent', () => {
  let component: CheapestTicketsComponent;
  let fixture: ComponentFixture<CheapestTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheapestTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheapestTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
