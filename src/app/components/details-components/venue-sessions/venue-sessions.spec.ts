import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueSessions } from './venue-sessions';

describe('VenueSessions', () => {
  let component: VenueSessions;
  let fixture: ComponentFixture<VenueSessions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueSessions],
    }).compileComponents();

    fixture = TestBed.createComponent(VenueSessions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
