import { Injectable, signal, computed, inject } from '@angular/core'
import { User } from '../interfaces/user';
import { LoginRequest } from '../interfaces/login-request';
import { AuthResponse } from '../interfaces/auth-response';
import { finalize, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class Auth {
  user = signal<User | null>(null);
  isLoggedIn = computed(() => this.user() !== null);
  private http = inject(HttpClient);


  hasToken(){
    return localStorage.getItem('token') !== null;
  }

  clearSession(){
    console.trace('clearSession called');
    localStorage.removeItem('token');
    this.user.set(null);
  }

  login(data: LoginRequest){
    return this.http.post<AuthResponse>(`${environment.apiUrl}/login`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.data.token);
        this.user.set(res.data.user);
      })
    );
  }
  
  register(data: FormData){
    return this.http.post<AuthResponse>(`${environment.apiUrl}/register`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.data.token);
        this.user.set(res.data.user);
      })
    );
  }

  logout(){
    return this.http.post(`${environment.apiUrl}/logout`, {}).pipe(
      finalize(() => this.clearSession())
    );
  }

  getCurrentUser(){
    return this.http.get<{data: User}>(`${environment.apiUrl}/me`).pipe(
      tap(res => this.user.set(res.data))
    );
  }


}
