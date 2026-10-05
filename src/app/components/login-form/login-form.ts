import { Component, inject } from '@angular/core';
import { Modal } from '../../core/services/modal';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  modal = inject(Modal);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });


  private auth = inject(Auth);
  isSubmitting = false;
  errorMessage = '';


  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.modal.close(),
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;

        if(err.status === 401){
          this.errorMessage = err.error.message;
          this.form.controls.password.reset('');
        }
        else if(err.status == 422){
          const errors = err.error.errors as Record<string, string[]>;

          for(const key of Object.keys(errors)){
            this.form.get(key)?.setErrors({server:errors[key][0]});
          }
        }
      }
    });


  }
  isInvalid(name: string){
    const x = this.form.get(name);
    return !!x && x.invalid && x.touched; 
  }
  isValid(name: string){
    const x = this.form.get(name);
    return !!x && x.valid && x.touched;

  }
}
