export interface AuthResponse {
  message: string;
  ok: boolean;
  firstName?: string;
  lastName?: string;
  userId?: string;
  token: string;
}
