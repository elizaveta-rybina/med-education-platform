import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from './authThunks';

export type LoginType = {
  email: string;
  password: string;
  remember_me?: boolean;
};

interface AuthState {
  user: string | null;
  token: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  rememberedEmail: string | null;
}

const initialState: AuthState = {
  user: null,
  token: '',
  status: 'idle',
  error: null,
  rememberedEmail: localStorage.getItem('rememberedEmail') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRememberedEmail(state, action: PayloadAction<string>) {
      state.rememberedEmail = action.payload;
    },
    clearRememberedEmail(state) {
      state.rememberedEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.email;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = '';
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Logout failed';
      });
  },
});

export const { setRememberedEmail, clearRememberedEmail } = authSlice.actions;
export default authSlice.reducer;