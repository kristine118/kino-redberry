import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
import { SessionService } from '../../core/services/session-service';
import { FilterService } from '../../core/services/filter-service';
import { SessionFilters } from '../../core/interfaces/session-filters';
import { MovieSessions, SessionsMeta } from '../../core/interfaces/session-response';
import { FiltersPanel } from '../../components/sessions-components/filters-panel/filters-panel';
import { MovieSessionsList } from '../../components/sessions-components/movie-sessions/movie-sessions';
import { Pagination } from '../../components/sessions-components/pagination/pagination';

@Component({
  selector: 'app-sessions',
  imports: [FiltersPanel, MovieSessionsList, Pagination],
  templateUrl: './sessions.html',
  styleUrl: './sessions.scss',
})
export class Sessions {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sessionService = inject(SessionService);
  private filterService = inject(FilterService);

  options = this.filterService.options;

  filters = signal<SessionFilters>({});
  groups = signal<MovieSessions[]>([]);
  meta = signal<SessionsMeta | null>(null);
  loading = signal(false);

  constructor() {
    this.route.queryParamMap
      .pipe(
        map((p) => this.paramsToFilters(p)),
        tap((f) => {
          this.filters.set(f);
          this.loading.set(true);
        }),
        switchMap((f) =>
          this.sessionService.getSession(f).pipe(
            catchError(() => {
              this.loading.set(false);
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((res) => {
        this.groups.set(res.data);
        this.meta.set(res.meta);
        this.loading.set(false);
      });
  }

  private paramsToFilters(p: ParamMap): SessionFilters {
    const list = (key: string) => p.get(key)?.split(',').filter(Boolean) ?? [];
    return {
      date: p.get('date') ?? undefined,
      venues: list('venue'),
      formats: list('format'),
      languages: list('language'),
      bands: list('time'),
      sort: p.get('sort') ?? undefined,
      page: p.get('page') ? Number(p.get('page')) : undefined,
    };
  }

  setFilter(patch: Partial<SessionFilters>) {
    const q: Record<string, string | null> = {};
    if ('date' in patch) q['date'] = patch.date || null;
    if ('sort' in patch) q['sort'] = patch.sort || null;
    if ('venues' in patch) q['venue'] = patch.venues?.length ? patch.venues.join(',') : null;
    if ('formats' in patch) q['format'] = patch.formats?.length ? patch.formats.join(',') : null;
    if ('languages' in patch)
      q['language'] = patch.languages?.length ? patch.languages.join(',') : null;
    if ('bands' in patch) q['time'] = patch.bands?.length ? patch.bands.join(',') : null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...q, page: null },
      queryParamsHandling: 'merge',
    });
  }

  clearAll() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { venue: null, format: null, language: null, time: null, page: null },
      queryParamsHandling: 'merge',
    });
  }

  currentSort = computed(() => this.filters().sort ?? 'time_asc');

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.setFilter({ sort: value });
  }

  goToPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
