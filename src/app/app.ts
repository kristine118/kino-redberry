import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Auth } from './core/services/auth';
import { ModalWindow } from './components/modal-window/modal-window';
import { RegisterForm } from './components/register-form/register-form';
import { Modal } from './core/services/modal';
import { LoginForm } from './components/login-form/login-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ModalWindow, RegisterForm,LoginForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('kino');
  private auth = inject(Auth);
  modal = inject(Modal);

  ngOnInit() {
    if (this.auth.hasToken()) {
      this.auth.getCurrentUser().subscribe({
        error: () => this.auth.clearSession()
      });
    }
  }
}