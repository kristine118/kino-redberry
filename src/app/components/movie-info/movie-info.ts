import { Component,input, computed } from '@angular/core';
import { MovieDetails } from '../../core/interfaces/movie-details';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-movie-info',
  imports: [DatePipe],
  templateUrl: './movie-info.html',
  styleUrl: './movie-info.scss',
})
export class MovieInfo {
  movie = input.required<MovieDetails>();
  formats = computed(() => this.movie().formats.map(f => f.name).join(', '));
}
