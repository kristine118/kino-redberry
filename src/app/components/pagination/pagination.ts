import { Component, input, output, computed } from '@angular/core';
import { SessionsMeta } from '../../core/interfaces/session-response';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  meta = input.required<SessionsMeta>();
  pageChange = output<number>();

  pages = computed(() => {
    const m = this.meta();
    const result: (number | '...')[] = [];
    for (let i = 1; i <= m.lastPage; i++) {
      const isEdge = i == 1 || i == m.lastPage;
      const isNearCurrent = Math.abs(i - m.currentPage) <= 1;
      if (isEdge || isNearCurrent) {
        result.push(i);
      } else if (result[result.length - 1] !== '...') {
        result.push('...');
      }
    }
    return result;
  });
}
