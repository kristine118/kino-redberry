export interface Hold {
  holdId: string;
  sessionId: number;
  expiresAt: string;
  secondsRemaining: number;
  isLive: boolean;
  subtotal: number;
  seats: HoldSeat[];
}
export interface HoldSeat {
  seatId: number;
  code: string;
  ticketType: { slug: string; name: string };
  price: number;
}

export interface HoldRequestSeat {
  seatId: number;
  ticketType: string;
}
