import { Component, inject } from '@angular/core';
import { Modal } from '../../core/services/modal';

@Component({
  selector: 'app-modal-window',
  imports: [],
  templateUrl: './modal-window.html',
  styleUrl: './modal-window.scss',
})
export class ModalWindow {
  modal = inject(Modal);
}