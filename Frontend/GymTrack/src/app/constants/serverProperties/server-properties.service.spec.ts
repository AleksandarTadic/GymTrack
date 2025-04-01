import { TestBed } from '@angular/core/testing';

import { ServerPropertiesService } from './server-properties.service';

describe('ServerPropertiesService', () => {
  let service: ServerPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
