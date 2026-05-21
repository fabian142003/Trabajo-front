import type { User } from "../../domain/entities/User";

export interface AuthResponseDto {
  token: string;
  user: User;
}