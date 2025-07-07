import { randomAlphaNumeric } from '@/utils/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { LoginType } from './authSlice'
import { clearRememberedEmail, setRememberedEmail } from './authSlice'

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginType, { dispatch }) => {
    const { email, password, remember_me } = loginData;
    
    return new Promise<{ email: string; token: string }>((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!email || !password) {
            throw new Error('Email and password are required');
          }

          const token = randomAlphaNumeric(50);
          const result = { email, token };
          
          if (remember_me) {
            dispatch(setRememberedEmail(email));
            localStorage.setItem('rememberedEmail', email);
          } else {
            dispatch(clearRememberedEmail());
            localStorage.removeItem('rememberedEmail');
          }
          
          localStorage.setItem('user', JSON.stringify(result));
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem('user');
    dispatch(clearRememberedEmail());
    localStorage.removeItem('rememberedEmail');
    return Promise.resolve();
  }
);