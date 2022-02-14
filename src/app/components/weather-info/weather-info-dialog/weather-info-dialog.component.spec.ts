import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherInfoDialogComponent } from './weather-info-dialog.component';

describe('WeatherInfoDialogComponent', () => {
  let component: WeatherInfoDialogComponent;
  let fixture: ComponentFixture<WeatherInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
