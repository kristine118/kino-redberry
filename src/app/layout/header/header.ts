import { Component, inject } from '@angular/core';
import { Modal } from '../../core/services/modal';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  modal = inject(Modal);
  auth = inject(Auth);
}