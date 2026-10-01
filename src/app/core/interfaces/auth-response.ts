import { User } from "./user";

export interface AuthResponse {
    data: {
        user: User;
        token: string;
  };
}
