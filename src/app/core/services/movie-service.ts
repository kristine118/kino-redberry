import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private http = inject(HttpClient);
  
  getNowPlaying() {
    return this.http.get<{ data: Movie[] }>(`${environment.apiUrl}/movies/now-playing`);
  }
  getComingSoon(){
    return this.http.get<{ data: Movie[] }>(`${environment.apiUrl}/movies/coming-soon`)
  }

}
