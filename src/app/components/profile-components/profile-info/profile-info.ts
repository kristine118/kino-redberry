import { Component, inject, computed, signal, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../core/services/profile-service';
import { FilterService } from '../../../core/services/filter-service';
import { Auth } from '../../../core/services/auth';
import { nameValidator, birthValidator, mobileValidator } from '../../../core/validator';
@Component({
  selector: 'app-profile-info',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-info.html',
  styleUrl: './profile-info.scss',
})
export class ProfileInfo {
  private profileApi = inject(ProfileService);
  private filters = inject(FilterService);
  private auth = inject(Auth);

  venues = computed(() => this.filters.options()?.venues ?? []);
  saving = signal(false);
  form = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [nameValidator] }),
    email: new FormControl({ value: '', disabled: true }, { nonNullable: true }),
    mobileNumber: new FormControl('', { nonNullable: true, validators: [mobileValidator] }),
    dateOfBirth: new FormControl('', { nonNullable: true, validators: [birthValidator] }),
    preferredVenueId: new FormControl<number | null>(null),
  });

constructor() {
  this.filters.load();

  effect(() => {
    const p = this.auth.user();
    if (!p) return;
    this.form.patchValue(
      {
        fullName: p.fullName ?? '',
        email: p.email,
        mobileNumber: p.mobileNumber ?? '',
        dateOfBirth: p.dateOfBirth ?? '',
        preferredVenueId: p.preferredVenue?.id ?? null,
      },
      { emitEvent: false },
    );
    this.form.markAsPristine();
  });
}
  err(name: string) {
    const c = this.form.get(name);
    if (!c || !(c.touched || c.dirty)) return null;
    return c.errors?.['msg'] ?? c.errors?.['server'] ?? null;
  }

  save() {
    const v = this.form.getRawValue();
    this.saving.set(true);
    this.profileApi
      .updateProfile({
        fullName: v.fullName,
        mobileNumber: v.mobileNumber,
        dateOfBirth: v.dateOfBirth,
        preferredVenueId: v.preferredVenueId ?? undefined,
      })
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.form.markAsPristine();
          this.auth.getCurrentUser().subscribe();
        },
        error: (e) => {
          this.saving.set(false);
          const errors = e.error?.errors ?? {};
          for (const key in errors) {
            this.form.get(key)?.setErrors({ server: errors[key][0] });
          }
        },
      });
  }
}
