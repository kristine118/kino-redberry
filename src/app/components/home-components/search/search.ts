import { Component, signal, inject, computed, ElementRef } from '@angular/core';
import { Movie } from '../../../core/interfaces/movie';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MovieService } from '../../../core/services/movie-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  host: {
    '(document:click)': 'onDocClick($event)',
    '(document:keydown.escape)': 'open.set(false)',
  },
})
export class Search {
  open = signal(false);
  query = signal('');
  searchedFor = signal('');

  private movies = inject(MovieService);
  results = toSignal(
    toObservable(this.query).pipe(
      map((q) => q.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((q) =>
        q
          ? this.movies.search(q).pipe(
              catchError(() => of([] as Movie[])),
              tap(() => this.searchedFor.set(q)),
            )
          : of([] as Movie[]).pipe(tap(() => this.searchedFor.set(''))),
      ),
    ),
    { initialValue: [] as Movie[] },
  );

  loaded = computed(() => this.searchedFor() === this.query().trim());

  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  onDocClick(e: MouseEvent) {
    if (!this.host.nativeElement.contains(e.target as Node)) {
      this.open.set(false);
    }
  }

  close() {
    this.open.set(false);
    this.query.set('');
  }
  clear(input: HTMLInputElement) {
    this.query.set('');
    input.focus();
  }
}
