import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieCard } from '../../components/home-components/movie-card/movie-card';
import { MovieService } from '../../core/services/movie-service';
import { Movie } from '../../core/interfaces/movie';
import { ComingSoonCard } from '../../components/home-components/coming-soon-card/coming-soon-card';
import { RouterLink } from '@angular/router';
import { HeroSection } from '../../components/home-components/hero-section/hero-section';
import { RecentlyViewedService } from '../../core/services/recently-viewed-service';
@Component({
  selector: 'app-home-page',
  imports: [MovieCard, ComingSoonCard, RouterLink, HeroSection],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private movieService = inject(MovieService);

  recent = inject(RecentlyViewedService);
  nowPlaying = signal<Movie[]>([]);
  comingSoon = signal<Movie[]>([]);

  ngOnInit() {
    this.movieService.getNowPlaying().subscribe((res) => this.nowPlaying.set(res.data));
    this.movieService.getComingSoon().subscribe((res) => this.comingSoon.set(res.data));
  }
  onWheel(e: WheelEvent) {
    const el = e.currentTarget as HTMLElement;
    if (el.scrollWidth <= el.clientWidth) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

    const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 && e.deltaY > 0;
    if (atStart || atEnd) return; 

    el.scrollLeft += e.deltaY;
    e.preventDefault();
  }
}
