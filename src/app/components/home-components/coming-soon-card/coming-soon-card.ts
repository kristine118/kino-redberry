import { Component, input, inject, signal,computed } from '@angular/core';
import { Movie } from '../../../core/interfaces/movie';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MovieService } from '../../../core/services/movie-service';
import { Auth } from '../../../core/services/auth';
import { Modal } from '../../../core/services/modal';
import { required } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-coming-soon-card',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './coming-soon-card.html',
  styleUrl: './coming-soon-card.scss',
})
export class ComingSoonCard {
  movie = input.required<Movie>();

  private movies = inject(MovieService);
  private auth = inject(Auth);
  private modal = inject(Modal);
  sent = signal(false);
  busy = signal(false);
  notified = computed(() => this.sent() || this.movie().isNotified);

  notify() {
    if (!this.auth.user()) {
      this.modal.open('login');
      return;
    }
    if (this.notified() || this.busy()) return;
    this.busy.set(true);
    this.movies.notify(this.movie().slug).subscribe({
      next: () => {
        this.sent.set(true);
        this.busy.set(false);
      },
      error: (e: HttpErrorResponse) => {
        this.busy.set(false);
        if (e.status === 401) this.modal.open('login');
      },
    });
  }
}
