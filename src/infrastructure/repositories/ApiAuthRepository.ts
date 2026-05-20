import api from "../api/axios";

import { tokenManager } from "../auth/tokenManager";

import { LocalStorageService } from "../storage/LocalStorageService";

import type { User } from "../../domain/entities/User";

import type {
  AuthRepository,
  LoginData,
  LoginResponse,
  RegisterData,
} from "../../domain/repositories/AuthRepository";

export class ApiAuthRepository implements AuthRepository {
  async register(data: RegisterData): Promise<User> {
    const response = await api.post("/auth/register", data);

    return response.data.data;
  }

  async login(data: LoginData): Promise<LoginResponse> {
    const response = await api.post("/auth/login", data);

    const loginData: LoginResponse = response.data.data;

    tokenManager.setToken(loginData.token);

    LocalStorageService.setItem("user", loginData.user);

    return loginData;
  }

  logout(): void {
    tokenManager.removeToken();

    LocalStorageService.removeItem("user");
  }

  getCurrentUser(): User | null {
    return LocalStorageService.getItem<User>("user");
  }
}