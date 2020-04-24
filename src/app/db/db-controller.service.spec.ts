import {TestBed} from '@angular/core/testing';

import {DbControllerService} from './db-controller.service';

describe('DbControllerService', () => {
  let service: DbControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
