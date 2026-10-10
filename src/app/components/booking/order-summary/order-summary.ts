import { Component } from '@angular/core';
import { BookingFooter } from '../booking-footer/booking-footer';

@Component({
  selector: 'app-order-summary',
  imports: [BookingFooter],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
})
export class OrderSummary {

}
