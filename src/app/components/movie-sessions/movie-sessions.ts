import { Component, input, output } from '@angular/core';
import { MovieSessions, SessionWithMovie } from '../../core/interfaces/session-response';

@Component({
  selector: 'app-movie-sessions',
  imports: [],
  templateUrl: './movie-sessions.html',
  styleUrl: './movie-sessions.scss',
})
export class MovieSessionsList {
  group = input.required<MovieSessions>();
  selected = output<SessionWithMovie>();
}
