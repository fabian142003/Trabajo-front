import type {
  AuthRepository,
  LoginResponse,
} from "../../../domain/repositories/AuthRepository";

import type { LoginDto } from "../../dtos/AuthDto";

class LoginUser {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: LoginDto): Promise<LoginResponse> {
    return this.authRepository.login(data);
  }
}

export = LoginUser;