import { Component, input, output } from '@angular/core';
import { BookingFooter } from '../booking-footer/booking-footer';
import { Seat } from '../../../core/interfaces/seat-map';
import { TicketType } from '../../../core/interfaces/filter-options';
import { DecimalPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-booked-seats',
  imports: [BookingFooter, DecimalPipe, PercentPipe],
  templateUrl: './booked-seats.html',
  styleUrl: './booked-seats.scss',
})
export class BookedSeats {
  lines = input<{ seat: Seat; typeId: number; price: number }[]>([]);
  total = input(0);
  ticketTypes = input<TicketType[]>([]);
  minAge = input(0);

  busy = input(false);
  proceed = output<void>();

  removeSeat = output<Seat>();
  typeChange = output<{ seatId: number; typeId: number }>();
  onNext() {
    console.log('booked-seats: next clicked');
    this.proceed.emit();
  }
  isBlocked(t: TicketType) {
    return t.blockedFromRatingAge !== null && this.minAge() >= t.blockedFromRatingAge;
  }
}
