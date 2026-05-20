import type { User } from "../entities/User";

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthRepository {
  register(data: RegisterData): Promise<User>;

  login(data: LoginData): Promise<LoginResponse>;

  logout(): void;

  getCurrentUser(): User | null;
}