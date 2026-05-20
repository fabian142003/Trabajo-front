import type { User } from "../../../domain/entities/User";

import type {
  AuthRepository,
} from "../../../domain/repositories/AuthRepository";

import type { RegisterDto } from "../../dtos/AuthDto";

class RegisterUser {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: RegisterDto): Promise<User> {
    return this.authRepository.register(data);
  }
}

export = RegisterUser;