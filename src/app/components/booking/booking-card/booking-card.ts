import { Component } from '@angular/core';
import { SeatMap } from '../seat-map/seat-map';
import { BookedSeats } from '../booked-seats/booked-seats';
import { BookingCheckout } from '../booking-checkout/booking-checkout';
@Component({
  selector: 'app-booking-card',
  imports: [SeatMap,BookedSeats,BookingCheckout],
  templateUrl: './booking-card.html',
  styleUrl: './booking-card.scss',
})
export class BookingCard {}
