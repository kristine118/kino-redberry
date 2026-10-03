import { Component, inject } from '@angular/core';
import { Modal } from '../../core/services/modal';

@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  modal = inject(Modal);
}
