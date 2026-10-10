import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCheckout } from './booking-checkout';

describe('BookingCheckout', () => {
  let component: BookingCheckout;
  let fixture: ComponentFixture<BookingCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCheckout],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingCheckout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
