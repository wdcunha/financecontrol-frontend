import { TestBed } from '@angular/core/testing';

import { BusinessPaymentService } from './business-payment.service';

describe('BusinessPaymentService', () => {
  let service: BusinessPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
