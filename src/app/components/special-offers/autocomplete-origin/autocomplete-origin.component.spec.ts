import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteOriginComponent } from './autocomplete-origin.component';

describe('AutocompleteOriginComponent', () => {
  let component: AutocompleteOriginComponent;
  let fixture: ComponentFixture<AutocompleteOriginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteOriginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
