import { Format } from './format';

export interface Session {
  id: number;
  startsAt: string;
  date: string;
  time: string;
  timeBand: string;
  price: number;
  seatsLeft: number;
  isSoldOut: boolean;
  hall: Hall;
  venue: VenueInfo;
  format: Format;
  language: Language;
}
export interface Language {
  id: number;
  slug: string;
  name: string;
  code: string;
}
export interface Hall {
  id: number;
  name: string;
  venue: VenueInfo;
}
export interface VenueInfo {
  id: number;
  slug: string;
  name: string;
  city: string;
}
export interface VenueInfo {
  id: number;
  slug: string;
  name: string;
  city: string;
}

export interface SessionGroup {
  venue: VenueInfo;
  sessions: Session[];
}

export interface HallGroup {
  name: string;
  sessions: Session[];
}

export interface VenueHalls {
  venue: VenueInfo;
  halls: HallGroup[];
}
