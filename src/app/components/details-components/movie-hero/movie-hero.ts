import { Component, input } from '@angular/core';
import { MovieDetails } from '../../../core/interfaces/movie-details';

@Component({
  selector: 'app-movie-hero',
  imports: [],
  templateUrl: './movie-hero.html',
  styleUrl: './movie-hero.scss',
})
export class MovieHero {
  movie = input.required<MovieDetails>();
}
