export interface AuthResponse {
  ok: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  message?: string;
  userId?: string;
  token?: string;
}
