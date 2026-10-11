import { Component, input, output } from '@angular/core';
import { SeatSection } from '../../../core/interfaces/seat-map';
import { Seat } from '../../../core/interfaces/seat-map';
@Component({
  selector: 'app-seat-map',
  imports: [],
  templateUrl: './seat-map.html',
  styleUrl: './seat-map.scss',
})
export class SeatMap {
  sections = input.required<SeatSection[]>();
  selectedIds = input<number[]>([]);
  seatClick = output<Seat>();
}
