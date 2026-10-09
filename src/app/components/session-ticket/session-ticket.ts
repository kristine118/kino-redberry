import { Component, input } from '@angular/core';
import { Session } from '../../core/interfaces/session';
@Component({
  selector: 'app-session-ticket',
  imports: [],
  templateUrl: './session-ticket.html',
  styleUrl: './session-ticket.scss',
})
export class SessionTicket {
  session = input.required<Session>();
  disabled = input(false);
}
