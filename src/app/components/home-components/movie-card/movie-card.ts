import { Component, input } from '@angular/core';
import { Movie } from '../../../core/interfaces/movie';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  movie = input.required<Movie>();
}
