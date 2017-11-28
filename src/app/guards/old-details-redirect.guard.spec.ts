import { TestBed, async, inject } from '@angular/core/testing';

import { OldDetailsRedirectGuard } from './old-details-redirect.guard';

describe('OldDetailsRedirectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OldDetailsRedirectGuard]
    });
  });

  it('should ...', inject([OldDetailsRedirectGuard], (guard: OldDetailsRedirectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
