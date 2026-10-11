import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Modal } from '../services/modal';   // ← შენი მოდალის სერვისის რეალური სახელი და გზა

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const modal = inject(Modal);
  const router = inject(Router);

  if (auth.user()) return true;

  modal.open('login');
  return router.createUrlTree(['/']);
};