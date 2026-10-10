import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedSeats } from './booked-seats';

describe('BookedSeats', () => {
  let component: BookedSeats;
  let fixture: ComponentFixture<BookedSeats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedSeats],
    }).compileComponents();

    fixture = TestBed.createComponent(BookedSeats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
