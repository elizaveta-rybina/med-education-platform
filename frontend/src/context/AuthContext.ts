import type { LoginType } from '@/app/store/auth/authSlice'
import { createContext, useContext } from 'react'


interface AuthContextType {
  user: string | null;
  token: string;
  rememberedEmail: string | null;
  login(data: LoginType): Promise<void>;
  logout(): Promise<void>;
  setRememberedEmail(email: string): void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: '',
  rememberedEmail: null,
  login: async () => {},
  logout: async () => {},
  setRememberedEmail: () => {},
});

export const useAuth = () => useContext(AuthContext);