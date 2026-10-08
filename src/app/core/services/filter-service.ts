import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterOptions } from '../interfaces/filter-options';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private http = inject(HttpClient);

  options = signal<FilterOptions | null>(null);

  load(){
    if(this.options()) return;
    this.http.get<{data: FilterOptions}>(`${environment.apiUrl}/filter-options`)
    .subscribe(res => this.options.set(res.data));
  }
}
