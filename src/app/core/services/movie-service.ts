import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Movie } from '../interfaces/movie';
import { map } from 'rxjs';
import { MovieDetails } from '../interfaces/movie-details';
import { SessionGroup } from '../interfaces/session';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  getNowPlaying() {
    return this.http.get<{ data: Movie[] }>(`${environment.apiUrl}/movies/now-playing`);
  }
  getComingSoon() {
    return this.http.get<{ data: Movie[] }>(`${environment.apiUrl}/movies/coming-soon`);
  }
  getMovie(slug: string) {
    return this.http.get<{ data: MovieDetails }>(`${environment.apiUrl}/movies/${slug}`).pipe(map(res => res.data));
  }
  getSessions(slug: string, date: string) {
  const params = new HttpParams().set('date', date);
  return this.http
    .get<{ data: SessionGroup[] }>(`${environment.apiUrl}/movies/${slug}/sessions`, { params })
    .pipe(map(res => res.data));
}
}
