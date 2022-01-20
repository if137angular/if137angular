import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityDestinationComponent } from './city-destination.component';

describe('CityDestinationComponent', () => {
  let component: CityDestinationComponent;
  let fixture: ComponentFixture<CityDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityDestinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
