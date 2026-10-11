import { Component, computed, input, signal, output, inject } from '@angular/core';
import { Order } from '../../../core/interfaces/order';
import { DatePipe, DecimalPipe } from '@angular/common';
import { OrderService } from '../../../core/services/order-service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-my-tickets',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './my-tickets.html',
  styleUrl: './my-tickets.scss',
})
export class MyTickets {
  upcoming = input.required<Order[]>();
  past = input.required<Order[]>();
  tab = signal<'upcoming' | 'past'>('upcoming');
  orders = computed(() => (this.tab() === 'upcoming' ? this.upcoming() : this.past()));

  refundHint(o: Order) {
    return o.refundedAt ? 'Already refunded' : 'Refunds close 2 hours before the session';
  }

  refundUntil(o: Order) {
    return new Date(new Date(o.session.startsAt).getTime() - 2 * 60 * 60 * 1000);
  }



  private orderService = inject(OrderService);

  refunded = output<void>();
  refundingId = signal<number | null>(null);
  message = signal('');

  refund(o: Order) {
    console.log('refund clicked', o.id, o.isRefundable);
    if (!o.isRefundable || this.refundingId() !== null) return;
    if (!confirm('Refund this order? This cannot be undone.')) return;
    this.refundingId.set(o.id);
    this.message.set('');
    this.orderService.refund(o.reference).subscribe({
      next: () => {
        this.refundingId.set(null);
        this.refunded.emit();
      },
      error: (e: HttpErrorResponse) => {
        this.refundingId.set(null);
        this.message.set(e.error?.message ?? 'Refund failed.');
        this.refunded.emit();
      },
    });
  }
}
