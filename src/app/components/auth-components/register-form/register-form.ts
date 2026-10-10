import { Component, inject } from '@angular/core';
import { Modal } from '../../../core/services/modal';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { HttpErrorResponse } from '@angular/common/http';

function passwordsMatch(group: AbstractControl) {
  const password = group.get('password')?.value;
  const confirmation = group.get('passwordConfirmation')?.value;
  return password === confirmation ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  modal = inject(Modal);
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  isSubmitting = false;

  avatarFile: File | null = null;

  form = this.fb.nonNullable.group(
    {
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    },
    { validators: passwordsMatch },
  );

  isInvalid(name: string) {
    const c = this.form.get(name);
    return !!c && c.invalid && c.touched;
  }

  isValid(name: string) {
    const c = this.form.get(name);
    return !!c && c.valid && c.touched;
  }

  isConfirmInvalid() {
    const c = this.form.controls.passwordConfirmation;
    return c.touched && (c.invalid || this.form.hasError('passwordsMismatch'));
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const formData = new FormData();
    formData.append('username', v.username);
    formData.append('email', v.email);
    formData.append('password', v.password);
    formData.append('password_confirmation', v.passwordConfirmation);
    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile);
    }

    this.isSubmitting = true;
    this.auth.register(formData).subscribe({
      next: () => this.modal.close(),
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        if (err.status === 422) {
          const errors = err.error.errors as Record<string, string[]>;
          for (const key of Object.keys(errors)) {
            const controlName = key === 'password_confirmation' ? 'passwordConfirmation' : key;
            this.form.get(controlName)?.setErrors({ server: errors[key][0] });
          }
        }
      },
    });
  }
  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.avatarFile = input.files?.[0] ?? null;
  }
}
