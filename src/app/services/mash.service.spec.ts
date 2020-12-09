import { TestBed } from '@angular/core/testing';

import { MashService } from './mash.service';

describe('MashService', () => {
  let service: MashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
