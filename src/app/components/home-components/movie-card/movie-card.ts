import { Component, input } from '@angular/core';
import { Movie } from '../../../core/interfaces/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  movie = input.required<Movie>();
}
