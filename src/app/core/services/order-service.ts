import { inject, Injectable } from '@angular/core';
import { Order, OrderRequest } from '../interfaces/order';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  createOrder(body: OrderRequest) {
    return this.http
      .post<{ data: Order }>(`${environment.apiUrl}/orders`, body)
      .pipe(map((r) => r.data));
  }
  getTickets(filter: 'upcoming' | 'past') {
    return this.http
      .get<{ data: Order[] }>(`${environment.apiUrl}/tickets`, { params: { filter } })
      .pipe(map((r) => r.data));
  }
  refund(ref: string) {
    return this.http
      .post<{ data: Order }>(`${environment.apiUrl}/orders/${ref}/refund`, {})
      .pipe(map((r) => r.data));
  }
}
