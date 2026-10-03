import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Modal {
  current = signal<'login' | 'register' | null>(null);

  open(name: 'login' | 'register'){
    this.current.set(name);
  }

  close(){
    this.current.set(null);
  }
}
