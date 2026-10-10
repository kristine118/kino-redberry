import { Component, input, output } from '@angular/core';


@Component({
  selector: 'app-booking-footer',
  imports: [],
  templateUrl: './booking-footer.html',
  styleUrl: './booking-footer.scss',
})
export class BookingFooter {
  total = input(0);
  label = input.required<string>(); // 'Next: Checkout' ან 'Pay: Complete order'
  disabled = input(false);
  action = output<void>();
}
