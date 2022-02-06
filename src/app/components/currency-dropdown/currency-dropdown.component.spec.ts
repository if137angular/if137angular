import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngxs/store';

import { CurrencyDropdownComponent } from './currency-dropdown.component';

fdescribe('CurrencyDropdownComponent', () => {
  let component: CurrencyDropdownComponent;
  let fixture: ComponentFixture<CurrencyDropdownComponent>;
  let storeMock: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatMenuModule
      ],
      declarations: [CurrencyDropdownComponent],
      providers: [
        { provide: Store, useValue: storeMock },

      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// import { Store } from '@ngxs/store';
// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CurrencyDropdownComponent } from './currency-dropdown.component';

// describe('CurrencyDropdownComponent', () => {
//   let component: CurrencyDropdownComponent;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [CurrencyDropdownComponent]
//     })
//   });

//   component = TestBed.inject(CurrencyDropdownComponent);

//   it('should create CurrencyDropdownComponent', () => {
//     expect(component).toBeDefined();
//   })
// });