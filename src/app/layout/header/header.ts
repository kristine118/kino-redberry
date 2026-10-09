import { Component, inject, computed } from '@angular/core';
import { Modal } from '../../core/services/modal';
import { Auth } from '../../core/services/auth';
import { RouterLink } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  modal = inject(Modal);
  auth = inject(Auth);

  isOpen = false;
  get displayName() {
    const u = this.auth.user();
    return u?.fullName ?? u?.username ?? '';
  }
  get firstName() {
    return this.displayName.split('')[0];
  }
  get initials() {
    return this.displayName
      .split('')
      .map((x) => x[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  logout() {
    this.auth.logout().subscribe();
    this.isOpen = false;
  }
  private router = inject(Router);

  private url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  overlay = computed(() => {
    const u = this.url();
    return u === '/' || u.startsWith('/movies/');
  });
}
