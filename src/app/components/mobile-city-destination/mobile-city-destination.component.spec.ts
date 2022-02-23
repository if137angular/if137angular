import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCityDestinationComponent } from './mobile-city-destination.component';

describe('MobileCityDestinationComponent', () => {
  let component: MobileCityDestinationComponent;
  let fixture: ComponentFixture<MobileCityDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileCityDestinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCityDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
