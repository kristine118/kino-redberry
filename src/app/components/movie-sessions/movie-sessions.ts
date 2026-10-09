import { Component, input, output, inject } from '@angular/core';
import { MovieSessions, SessionWithMovie } from '../../core/interfaces/session-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-sessions',
  imports: [],
  templateUrl: './movie-sessions.html',
  styleUrl: './movie-sessions.scss',
})
export class MovieSessionsList {
  group = input.required<MovieSessions>();
  selected = output<SessionWithMovie>();
  private router = inject(Router);



  openMovie() {
    this.router.navigate(['/movies', this.group().movie.slug]);
  }
}
