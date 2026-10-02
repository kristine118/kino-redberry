import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Auth } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('kino');
  private auth = inject(Auth);
  ngOnInit() {
    if (this.auth.hasToken()) {
      this.auth.getCurrentUser().subscribe({
        error: () => this.auth.clearSession()
      });
    }
}
}
