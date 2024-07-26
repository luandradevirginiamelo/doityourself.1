import { TestBed } from '@angular/core/testing';

import { DIYService } from './diy.service';

describe('FoodService', () => {
  let service: DIYService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DIYService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
