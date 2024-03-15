import { TestBed } from '@angular/core/testing';

import { HttpproductsService } from './httpproducts.service';

describe('HttpproductsService', () => {
  let service: HttpproductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpproductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
