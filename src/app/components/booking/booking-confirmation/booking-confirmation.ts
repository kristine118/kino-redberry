import { Component, computed, inject, input, output } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Order } from '../../../core/interfaces/order';

@Component({
  selector: 'app-booking-confirmation',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.scss',
})
export class BookingConfirmation {
  private router = inject(Router);

  order = input.required<Order>();
  closed = output<void>();

  seats = computed(() =>
    this.order()
      .tickets.map((t) => t.seatCode)
      .join(', '),
  );

  tickets = computed(() => {
    const count = new Map<string, number>();
    for (const t of this.order().tickets) {
      count.set(t.ticketType.name, (count.get(t.ticketType.name) ?? 0) + 1);
    }
    return [...count].map(([name, n]) => `${n} x ${name}`).join(', ');
  });

viewTickets() {
  this.router.navigate(['/profile'], {queryParams: { tab: 'tickets'}});
  this.closed.emit();
}

  backHome() {
    this.router.navigate(['/']);
    this.closed.emit();
  }
}
