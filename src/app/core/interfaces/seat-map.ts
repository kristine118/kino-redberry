import { Hall } from './session';

export type SeatState = 'available' | 'sold' | 'held' | 'unavailable';

export interface HallMap {
  sessionId: number;
  hall: Hall;
  sections: SeatSection[];
}
export interface SeatSection {
  name: string;
  rows: SeatRow[];
}
export interface SeatRow {
  label: string;
  seats: Seat[];
}
export interface Seat {
  id: number;
  code: string;
  label: string;
  state: SeatState;
  aisleAfter: boolean;
  isMine: boolean;
}
