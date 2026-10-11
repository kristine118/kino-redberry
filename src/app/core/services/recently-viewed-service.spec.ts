import { TestBed } from '@angular/core/testing';

import { RecentlyViewed } from './recently-viewed-service';

describe('RecentlyViewed', () => {
  let service: RecentlyViewed;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentlyViewed);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
