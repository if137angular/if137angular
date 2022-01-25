import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedMapsComponent } from './animated-maps.component';

describe('AnimatedMapsComponent', () => {
  let component: AnimatedMapsComponent;
  let fixture: ComponentFixture<AnimatedMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedMapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
