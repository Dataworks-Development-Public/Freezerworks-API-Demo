import { TestBed } from '@angular/core/testing';

import { AliquotsService } from './aliquots.service';

describe('AliquotsService', () => {
  let service: AliquotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AliquotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
