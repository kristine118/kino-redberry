import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTicket } from './session-ticket';

describe('SessionTicket', () => {
  let component: SessionTicket;
  let fixture: ComponentFixture<SessionTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
