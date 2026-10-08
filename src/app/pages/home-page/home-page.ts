import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieService } from '../../core/services/movie-service';
import { Movie } from '../../core/interfaces/movie';
import { ComingSoonCard } from '../../components/coming-soon-card/coming-soon-card';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home-page',
  imports: [MovieCard, ComingSoonCard,RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private movieService = inject(MovieService);
  
  nowPlaying = signal<Movie[]>([]);
  comingSoon = signal<Movie[]>([]);

  ngOnInit() {
    this.movieService.getNowPlaying().subscribe(res => this.nowPlaying.set(res.data));
    this.movieService.getComingSoon().subscribe(res => this.comingSoon.set(res.data));
  }
}