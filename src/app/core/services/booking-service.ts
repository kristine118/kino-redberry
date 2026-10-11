import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';
import { SessionWithMovie } from '../interfaces/session-response';
import { HallMap } from '../interfaces/seat-map';
import { Hold, HoldRequestSeat } from '../interfaces/hold';
import { Order, OrderRequest } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private http = inject(HttpClient);

  getSession(id: number) {
    return this.http
      .get<{ data: SessionWithMovie }>(`${environment.apiUrl}/sessions/${id}`)
      .pipe(map((r) => r.data));
  }

  getSeats(sessionId: number) {
    return this.http
      .get<{ data: HallMap }>(`${environment.apiUrl}/sessions/${sessionId}/seats`)
      .pipe(map((r) => r.data));
  }
  createHold(sessionId: number, seats: HoldRequestSeat[]) {
    return this.http
      .post<{ data: Hold }>(`${environment.apiUrl}/sessions/${sessionId}/holds`, { seats })
      .pipe(map((r) => r.data));
  }

}
