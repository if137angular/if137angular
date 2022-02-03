import { TestBed } from '@angular/core/testing';

import { FilterPriceService } from './filter-price.service';

describe('FilterPriceService', () => {
  let service: FilterPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
