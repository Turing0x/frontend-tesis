import { User } from "../../interfaces/user.interface";

export interface AuthResponse {
  success: boolean;
  data: [User, any[], string];
}
