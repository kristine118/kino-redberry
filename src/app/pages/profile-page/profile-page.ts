import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ProfileInfo } from '../../components/profile-components/profile-info/profile-info';
import { MyTickets } from '../../components/profile-components/my-tickets/my-tickets';
import { OrderService } from '../../core/services/order-service';
import { Order } from '../../core/interfaces/order';
@Component({
  selector: 'app-profile-page',
  imports: [ProfileInfo, MyTickets, RouterLink],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  private route = inject(ActivatedRoute);
  
  tab = toSignal(this.route.queryParamMap.pipe(map((p) => p.get('tab') ?? 'info')), {
    initialValue: 'info',
  });

  private orderService = inject(OrderService);
  private refresh = signal(0);

  upcoming = toSignal(
    toObservable(this.refresh).pipe(switchMap(() => this.orderService.getTickets('upcoming'))),
    { initialValue: [] as Order[] },
  );

  past = toSignal(
    toObservable(this.refresh).pipe(switchMap(() => this.orderService.getTickets('past'))),
    { initialValue: [] as Order[] },
  );

  reload() {
    this.refresh.update((n) => n + 1);
  }
}
