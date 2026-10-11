import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import {
  nameValidator,
  mobileValidator,
  cardValidator,
  expiryValidator,
} from '../../../core/validator';

@Component({
  selector: 'app-booking-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './booking-checkout.html',
  styleUrl: './booking-checkout.scss',
})
export class BookingCheckout {
  private auth = inject(Auth);

  form = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [nameValidator] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    mobileNumber: new FormControl('', { nonNullable: true, validators: [mobileValidator] }),
    cardNumber: new FormControl('', { nonNullable: true, validators: [cardValidator] }),
    expiry: new FormControl('', { nonNullable: true, validators: [expiryValidator] }),
    cvv: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{3}$/)],
    }),
  });

  constructor() {
    effect(() => {
      const u = this.auth.user();
      if (!u) return;
      this.form.patchValue({
        fullName: u.fullName ?? '',
        email: u.email,
        mobileNumber: u.mobileNumber ?? '',
      });
    });
  }

  err(name: string): string | null {
    const c = this.form.get(name);
    if (!c || !(c.touched || c.dirty)) return null;
    return c.errors?.['msg'] ?? c.errors?.['server'] ?? null;
  }
  isInvalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  isValid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.valid && !!c.value;   }
}
