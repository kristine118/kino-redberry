import { Venue } from "./venue";

export interface Profile {
  id: number,
  username: string,
  email: string,
  avatar: string | null,
  fullName: string | null,
  mobileNumber: string | null,
  dateOfBirth: string | null,
  age: number | null,
  preferredVenue: Venue | null,
  profileComplete: boolean,
}
