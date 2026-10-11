import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-booking-footer',
  imports: [DecimalPipe],
  templateUrl: './booking-footer.html',
  styleUrl: './booking-footer.scss',
})
export class BookingFooter {
  total = input(0);
  label = input.required<string>(); 
  disabled = input(false);
  action = output<void>();

}
