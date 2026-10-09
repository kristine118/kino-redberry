import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ProfileInfo } from '../../components/profile-info/profile-info';
import { MyTickets } from '../../components/my-tickets/my-tickets';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileInfo, MyTickets, RouterLink],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  private route = inject(ActivatedRoute);
  tab = toSignal(this.route.queryParamMap.pipe(map((p) => p.get('tab') ?? 'info' )),{
    initialValue: 'info',
  })
     
}
