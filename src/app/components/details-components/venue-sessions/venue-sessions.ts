import { Component, input, output } from '@angular/core';
import { SessionTicket } from '../session-ticket/session-ticket';
import { Session, VenueHalls } from '../../../core/interfaces/session';

@Component({
  selector: 'app-venue-sessions',
  imports: [SessionTicket],
  templateUrl: './venue-sessions.html',
  styleUrl: './venue-sessions.scss',
})
export class VenueSessions {
  venues = input.required<VenueHalls[]>();
  disabled = input(false);
  selected = output<Session>();
}
