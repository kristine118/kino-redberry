import { Injectable, signal } from '@angular/core';
import { Movie } from '../interfaces/movie';
export interface RecentMovie {
  id: number;
  slug: string;
  title: string;
  posterUrl: string;
  genre: string;
  runtimeMinutes: number;
  ageCode: string;
}
@Injectable({
  providedIn: 'root',
})
export class RecentlyViewedService {
  private readonly key = 'recently-viewed';
  private readonly max = 6;
  items = signal<RecentMovie[]>(this.read());

  add(m: Movie) {
    const item: RecentMovie = {
      id: m.id,
      slug: m.slug,
      title: m.title,
      posterUrl: m.posterUrl,
      genre: m.genres[0]?.name ?? '',
      runtimeMinutes: m.runtimeMinutes,
      ageCode: m.ageRating.code,
    };
    const next = [item, ...this.items().filter((x) => x.id !== m.id)].slice(0, this.max);
    this.items.set(next);
    this.write(next);
  }

  clear() {
    this.items.set([]);
    this.write([]);
  }

  private read(): RecentMovie[] {
    try {
      return JSON.parse(localStorage.getItem(this.key) ?? '[]');
    } catch {
      return [];
    }
  }
  private write(v: RecentMovie[]) {
    try {
      localStorage.setItem(this.key, JSON.stringify(v));
    } catch {}
  }
}
