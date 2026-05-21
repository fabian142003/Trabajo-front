import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../../domain/entities/User";

import { ApiAuthRepository } from "../../infrastructure/repositories/ApiAuthRepository";

import type {
  LoginData,
  RegisterData,
} from "../../domain/repositories/AuthRepository";

interface AuthContextProps {
  user: User | null;

  isAuthenticated: boolean;

  loading: boolean;

  login: (
    data: LoginData
  ) => Promise<User>;

  register: (
    data: RegisterData
  ) => Promise<void>;

  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextProps>(
    {} as AuthContextProps
  );

interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  const authRepository =
    new ApiAuthRepository();

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const currentUser =
      authRepository.getCurrentUser();

    if (currentUser) {
      setUser(currentUser);
    }

    setLoading(false);
  }, []);

  const login = async (
    data: LoginData
  ): Promise<User> => {
    const response =
      await authRepository.login(
        data
      );

    setUser(response.user);

    return response.user;
  };

  const register = async (
    data: RegisterData
  ): Promise<void> => {
    const user =
      await authRepository.register(
        data
      );

    setUser(user);
  };

  const logout = () => {
    authRepository.logout();

    setUser(null);

    window.location.href =
      "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}