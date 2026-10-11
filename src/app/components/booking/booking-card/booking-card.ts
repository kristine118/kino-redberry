import {Component, inject,input,output,signal,computed,effect,viewChild,} from '@angular/core';
import { SeatMap } from '../seat-map/seat-map';
import { BookedSeats } from '../booked-seats/booked-seats';
import { BookingCheckout } from '../booking-checkout/booking-checkout';
import { BookingService } from '../../../core/services/booking-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Seat } from '../../../core/interfaces/seat-map';
import { FilterService } from '../../../core/services/filter-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Modal } from '../../../core/services/modal';
import { Hold } from '../../../core/interfaces/hold';
import { OrderSummary } from '../order-summary/order-summary';
import { Order } from '../../../core/interfaces/order';
import { OrderService } from '../../../core/services/order-service';
import { BookingConfirmation } from '../booking-confirmation/booking-confirmation';

@Component({
  selector: 'app-booking-card',
  imports: [SeatMap, BookedSeats, BookingCheckout, DatePipe, OrderSummary, BookingConfirmation],
  templateUrl: './booking-card.html',
  styleUrl: './booking-card.scss',
  host: {
    '(click)': 'closed.emit()',
    '(document:keydown.escape)': 'closed.emit()',
  },
})
export class BookingCard {
  private api = inject(BookingService);
  private orders = inject(OrderService);

  sessionId = input.required<number>();
  closed = output<void>();

  session = toSignal(
    toObservable(this.sessionId).pipe(switchMap((id) => this.api.getSession(id))),
    { initialValue: null },
  );

  refresh = signal(0);
  private mapKey = computed(() => ({ id: this.sessionId(), r: this.refresh() }));
  seatMap = toSignal(toObservable(this.mapKey).pipe(switchMap((k) => this.api.getSeats(k.id))), {
    initialValue: null,
  });

  selectedSeats = signal<Seat[]>([]);
  maxSeats = 3;
  selectedIds = computed(() => this.selectedSeats().map((s) => s.id));

  toggleSeat(seat: Seat) {
    const current = this.selectedSeats();
    this.message.set(null);
    if (current.some((s) => s.id === seat.id)) {
      this.selectedSeats.set(current.filter((s) => s.id !== seat.id));
    } else if (current.length < this.maxSeats) {
      this.selectedSeats.set([...current, seat]);
    } else {
      this.message.set(`You can select up to ${this.maxSeats} seats.`);
    }
  }

  private filters = inject(FilterService);

  ticketTypes = computed(() => this.filters.options()?.ticketTypes ?? []);
  minAge = computed(() => this.session()?.movie.ageRating.minAge ?? 0);

  typeBySeat = signal<Record<number, number>>({});

  lines = computed(() =>
    this.selectedSeats().map((seat) => {
      const typeId = this.typeBySeat()[seat.id] ?? 1;
      const type = this.ticketTypes().find((t) => t.id === typeId);
      const base = (this.session()?.price ?? 0) * (type?.priceRatio ?? 1);
      const price = Math.round(base * 100) / 100;
      return { seat, typeId, price };
    }),
  );

  total = computed(() => {
    const sum = this.lines().reduce((s, l) => s + l.price, 0);
    return Math.round(sum * 100) / 100;
  });

  setType(e: { seatId: number; typeId: number }) {
    this.typeBySeat.update((m) => ({ ...m, [e.seatId]: e.typeId }));
  }

  constructor() {
    this.filters.load();
    effect(() => {
      if (this.hold() && this.secondsLeft() === 0) {
        this.backToSeats('Your hold time expired. Please re-select your seats.');
      }
    });
  }

  private backToSeats(message: string) {
    this.hold.set(null);
    this.selectedSeats.set([]);
    this.step.set('seats');
    this.refresh.update((n) => n + 1);
    this.message.set(message);
  }

  private modal = inject(Modal);

  step = signal<'seats' | 'checkout' | 'done'>('seats');
  hold = signal<Hold | null>(null);
  holding = signal(false);
  message = signal<string | null>(null);

  goCheckout() {
    const seats = this.lines().map((l) => ({
      seatId: l.seat.id,
      ticketType: this.ticketTypes().find((t) => t.id === l.typeId)!.slug,
    }));

    this.message.set(null);
    this.holding.set(true);

    this.api.createHold(this.sessionId(), seats).subscribe({
      next: (hold) => {
        this.hold.set(hold);
        this.holding.set(false);
        this.step.set('checkout');
      },
      error: (e: HttpErrorResponse) => {
        this.holding.set(false);

        if (e.status === 401) {
          this.modal.open('login');
        } else if (e.status === 409) {
          const lost: string[] = e.error?.contested ?? [];
          this.message.set(`Seats ${lost.join(', ')} were just taken. Please choose others.`);
          this.selectedSeats.update((s) => s.filter((x) => !lost.includes(x.code)));
          this.refresh.update((n) => n + 1); // რუკა ხელახლა
        } else if (e.status === 422) {
          this.message.set(e.error?.message ?? 'Could not hold the seats.');
        }
      },
    });
  }

  private now = toSignal(interval(1000).pipe(map(() => Date.now())), { initialValue: Date.now() });

  secondsLeft = computed(() => {
    const h = this.hold();
    if (!h) return 0;
    return Math.max(0, Math.floor((new Date(h.expiresAt).getTime() - this.now()) / 1000));
  });

  timeLabel = computed(() => {
    const s = this.secondsLeft();
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  });

  paying = signal(false);
  order = signal<Order | null>(null);

  checkout = viewChild(BookingCheckout);
  pay() {
    const h = this.hold();
    const form = this.checkout()?.form;
    if (!h || !form || this.paying()) return;
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    this.paying.set(true);
    const v = form.getRawValue();

    this.orders.createOrder({ holdId: h.holdId, ...v }).subscribe({
      next: (order) => {
        this.order.set(order);
        this.hold.set(null);
        this.step.set('done');
        this.paying.set(false);
      },
      error: (e: HttpErrorResponse) => {
        this.paying.set(false);

        if (e.status === 401) {
          this.modal.open('login');
        } else if (e.status === 403) {
          this.message.set('This hold belongs to another account.');
        } else if (e.status === 409) {
          const lost: string[] = e.error?.contested ?? [];
          this.selectedSeats.update((s) => s.filter((x) => !lost.includes(x.code)));
          this.hold.set(null);
          this.step.set('seats');
          this.refresh.update((n) => n + 1);
          this.message.set(`Seats ${lost.join(', ')} were just taken. Please choose others.`);
        } else if (e.status === 422) {
          const errs = e.error?.errors as Record<string, string[]> | undefined;
          if (errs) {
            for (const [key, msgs] of Object.entries(errs)) {
              form.get(key)?.setErrors({ server: msgs[0] });
            }
            form.markAllAsTouched();
          } else {
            this.backToSeats(
              e.error?.message ?? 'Your hold time expired. Please re-select your seats.',
            );
          }
        }
      },
    });
  }
}
