import { Component } from '@angular/core';
import { BookingFooter } from '../booking-footer/booking-footer';

@Component({
  selector: 'app-booked-seats',
  imports: [BookingFooter],
  templateUrl: './booked-seats.html',
  styleUrl: './booked-seats.scss',
})
export class BookedSeats {}
