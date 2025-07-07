import type { LoginType } from '@/app/store/auth/authSlice'
import { createContext, useContext } from 'react'


interface AuthContextType {
  user: string | null;
  token: string;
  rememberedEmail: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Добавляем статус
  error: string | null; // Добавляем ошибку
  login(data: LoginType): Promise<void>;
  logout(): Promise<void>;
  setRememberedEmail(email: string): void;
  clearError(): void; // Добавляем очистку ошибки
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: '',
  rememberedEmail: null,
  status: 'idle', // Дефолтное значение
  error: null, // Дефолтное значение
  login: async () => {},
  logout: async () => {},
  setRememberedEmail: () => {},
  clearError: () => {}, // Добавляем функцию
});

export const useAuth = () => useContext(AuthContext);