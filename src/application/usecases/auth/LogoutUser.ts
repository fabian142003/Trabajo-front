import type {
  AuthRepository,
} from "../../../domain/repositories/AuthRepository";

class LogoutUser {
  constructor(private authRepository: AuthRepository) {}

  execute(): void {
    this.authRepository.logout();
  }
}
export = LogoutUser;