import { Component, input, computed, output } from '@angular/core';
import { BookingFooter } from '../booking-footer/booking-footer';
import { Hold } from '../../../core/interfaces/hold';
import { SessionWithMovie } from '../../../core/interfaces/session-response';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-order-summary',
  imports: [BookingFooter, DatePipe],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
})
export class OrderSummary {
   hold = input.required<Hold>();
  session = input.required<SessionWithMovie>();
  paying = input(false);
  pay = output<void>();

  codes = computed(() => this.hold().seats.map((s) => s.code).join(', '));

  tickets = computed(() => {
    const count = new Map<string, number>();
    for (const s of this.hold().seats) {
      count.set(s.ticketType.name, (count.get(s.ticketType.name) ?? 0) + 1);
    }
    return [...count].map(([name, n]) => `${n} x ${name}`).join(', '); 
  });
}
