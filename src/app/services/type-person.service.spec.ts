import { TestBed } from '@angular/core/testing';

import { TypePersonService } from './type-person.service';

describe('TypePersonService', () => {
  let service: TypePersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
