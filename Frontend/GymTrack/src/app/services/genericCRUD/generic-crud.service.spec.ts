import { TestBed } from '@angular/core/testing';

import { GenericCRUDService } from './generic-crud.service';

describe('GenericCRUDService', () => {
  let service: GenericCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
