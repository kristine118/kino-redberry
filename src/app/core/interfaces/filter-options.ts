import { Venue } from './venue';
import { Format } from './format';
import { Language } from './session';
import { AgeRating } from './movie';

export interface FilterOptions {
  venues: Venue[];
  formats: Format[];
  languages: Language[];
  timeBands: TimeBand[];
  sorts: SortOption[];
  ticketTypes: TicketType[];
  ageRatings: AgeRating[];
  maxSeatsPerOrder: number;
  holdMinutes: number;
}
export interface TimeBand {
  id: string;
  label: string;
}

export interface SortOption {
  id: string;
  label: string;
}

export interface TicketType {
  id: number;
  slug: string;
  name: string;
  priceRatio: number;
  note: string | null;
  blockedFromRatingAge: number | null;
}
