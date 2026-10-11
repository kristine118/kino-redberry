import { SessionWithMovie } from './session-response';

export interface OrderTicket {
  id: number;
  seatCode: string;
  ticketType: { slug: string; name: string };
  price: number;
}

export interface Order {
  id: number;
  reference: string;
  status: string;
  totalPrice: number;
  paidAt: string;
  refundedAt: string | null;
  isUpcoming: boolean;
  isRefundable: boolean;
  cardLastFour: string;
  contact: { fullName: string; email: string; mobileNumber: string };
  session: SessionWithMovie;
  tickets: OrderTicket[];
}
export interface OrderRequest {
  holdId: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}
