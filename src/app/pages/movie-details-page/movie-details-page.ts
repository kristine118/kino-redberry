import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/services/movie-service';
import { MovieDetails } from '../../core/interfaces/movie-details';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MovieHero } from '../../components/details-components/movie-hero/movie-hero';
import { DatePicker } from '../../components/details-components/date-picker/date-picker';
import { VenueSessions } from '../../components/details-components/venue-sessions/venue-sessions';
import { HallGroup, Session, SessionGroup, VenueHalls } from '../../core/interfaces/session';
import { MovieInfo } from '../../components/details-components/movie-info/movie-info';
import { Auth } from '../../core/services/auth';
import { Modal } from '../../core/services/modal';
import { BookingCard } from '../../components/booking/booking-card/booking-card';

function groupByHall(sessions: Session[]): HallGroup[] {
  const map = new Map<number, HallGroup>();
  for (const s of sessions) {
    const hall = map.get(s.hall.id) ?? { name: s.hall.name, sessions: [] };
    hall.sessions.push(s);
    map.set(s.hall.id, hall);
  }
  return [...map.values()];
}
@Component({
  selector: 'app-movie-details-page',
  imports: [MovieHero, DatePicker, VenueSessions, MovieInfo, BookingCard],
  templateUrl: './movie-details-page.html',
  styleUrl: './movie-details-page.scss',
})
export class MovieDetailsPage {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  selectedDate = signal<string | undefined>(undefined);

  movie = signal<MovieDetails | null>(null);

  constructor() {
    this.route.paramMap
      .pipe(
        map((p) => String(p.get('slug'))),
        switchMap((slug) => this.movieService.getMovie(slug)),
        takeUntilDestroyed(),
      )
      .subscribe((m) => {
        this.movie.set(m);
        this.selectedDate.set(m.availableDates[0]);
      });

    toObservable(this.selectedDate)
      .pipe(
        filter((d): d is string => !!d),
        switchMap((date) =>
          this.movieService
            .getSessions(this.movie()!.slug, date)
            .pipe(catchError(() => of([] as SessionGroup[]))),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((g) => this.groups.set(g));
  }
  groups = signal<SessionGroup[]>([]);

  venues = computed<VenueHalls[]>(() =>
    this.groups().map((g) => ({ venue: g.venue, halls: groupByHall(g.sessions) })),
  );
  private modal = inject(Modal);
  private auth = inject(Auth);
  private router = inject(Router);

  selectedSession = signal<Session | null>(null);

  openSeats(session: Session) {
    const user = this.auth.user();

    if (!user) {
      this.modal.open('login');
      return;
    }
    if (!user.profileComplete) {
      this.router.navigate(['/profile']);
      return;
    }
    this.selectedSession.set(session); 
  }
}
