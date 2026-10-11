import { Component, computed, inject, signal } from '@angular/core';
import { MovieService } from '../../../core/services/movie-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Movie } from '../../../core/interfaces/movie';
import { DatePipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-hero-section',
  imports: [DatePipe,RouterLink, UpperCasePipe],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  private movies = inject(MovieService); 
  slides = toSignal(this.movies.getFeatured(), { initialValue: [] as Movie[] });
  current = signal(0);
  slide = computed(() => this.slides()[this.current()]);

  next() {
    this.current.update((i) => (i + 1) % this.slides().length);
  }
  prev() {
    this.current.update((i) => (i - 1 + this.slides().length) % this.slides().length);
  }
}
