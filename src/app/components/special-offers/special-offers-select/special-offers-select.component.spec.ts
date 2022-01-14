import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOffersSelectComponent } from './special-offers-select.component';

describe('SpecialOffersSelectComponent', () => {
  let component: SpecialOffersSelectComponent;
  let fixture: ComponentFixture<SpecialOffersSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialOffersSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOffersSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
