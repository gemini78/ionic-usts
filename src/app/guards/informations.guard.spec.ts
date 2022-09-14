import { TestBed } from '@angular/core/testing';

import { InformationsGuard } from './informations.guard';

describe('InformationsGuard', () => {
  let guard: InformationsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InformationsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
