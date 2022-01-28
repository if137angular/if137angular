import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheapestTicketItemComponent } from './cheapest-ticket-item.component';

describe('CheapestTicketItemComponent', () => {
  let component: CheapestTicketItemComponent;
  let fixture: ComponentFixture<CheapestTicketItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheapestTicketItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheapestTicketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
