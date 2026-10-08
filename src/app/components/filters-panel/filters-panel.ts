import { Component, computed, inject, input, output } from '@angular/core';
import { FilterService } from '../../core/services/filter-service';
import { SessionFilters } from '../../core/interfaces/session-filters';

@Component({
  selector: 'app-filters-panel',
  imports: [],
  templateUrl: './filters-panel.html',
  styleUrl: './filters-panel.scss',
})
export class FiltersPanel {
  private filterService = inject(FilterService);
  options = this.filterService.options;

  filters = input.required<SessionFilters>();

  changed = output<Partial<SessionFilters>>();
  cleared = output<void>();

  days = this.buildDays();
  selectedDate = computed(() => this.filters().date ?? this.days[0].value);

  availableFormats = computed(() => {
    const opts = this.options();
    if (!opts) return [];
    const selected = this.filters().venues ?? [];
    if (selected.length === 0) return opts.formats;

    const allowed = new Set(
      opts.venues
        .filter((v) => selected.includes(v.slug))
        .flatMap((v) => v.formats.map((f) => f.slug)),
    );
    return opts.formats.filter((f) => allowed.has(f.slug));
  });

  activeCount = computed(() => {
    const f = this.filters();
    return (
      (f.venues?.length ?? 0) +
      (f.formats?.length ?? 0) +
      (f.languages?.length ?? 0) +
      (f.bands?.length ?? 0)
    );
  });

  isSelected(key: 'venues' | 'formats' | 'languages' | 'bands', slug: string) {
    return (this.filters()[key] ?? []).includes(slug);
  }

  toggle(key: 'venues' | 'formats' | 'languages' | 'bands', slug: string) {
    const current = this.filters()[key] ?? [];
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];

    const patch: Partial<SessionFilters> = { [key]: next };
    if (key === 'venues') {
      patch.formats = this.keepAvailableFormats(next);
    }
    this.changed.emit(patch);
  }

  selectDate(value: string) {
    this.changed.emit({ date: value });
  }

  clearAll() {
    this.cleared.emit();
  }

  private keepAvailableFormats(venues: string[]) {
    const opts = this.options();
    const selectedFormats = this.filters().formats ?? [];
    if (!opts || venues.length === 0) return selectedFormats;

    const allowed = new Set(
      opts.venues
        .filter((v) => venues.includes(v.slug))
        .flatMap((v) => v.formats.map((f) => f.slug)),
    );
    return selectedFormats.filter((f) => allowed.has(f));
  }

  private buildDays() {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      result.push({
        value: this.toIsoDate(d),
        dow: d.toLocaleDateString('en-US', { weekday: 'short' }),
        num: String(d.getDate()).padStart(2, '0'),
      });
    }
    return result;
  }
  private toIsoDate(d: Date) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  onWheel(e: WheelEvent) {
    const el = e.currentTarget as HTMLElement;
    el.scrollLeft += e.deltaY;
    e.preventDefault();
  }
}
