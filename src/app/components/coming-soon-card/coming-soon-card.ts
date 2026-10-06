import { Component, input } from '@angular/core';
import { Movie } from '../../core/interfaces/movie';
import { DatePipe, UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-coming-soon-card',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './coming-soon-card.html',
  styleUrl: './coming-soon-card.scss',
})
export class ComingSoonCard {
  movie = input.required<Movie>();
}
