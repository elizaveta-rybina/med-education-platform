import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResponse, User } from './model'
import { fetchUser, login, logout } from './thunks'

export interface AuthState {
	user: User | null
	authToken: LoginResponse | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
	rememberedEmail: string | null
}

const initialState: AuthState = {
	user: null,
	authToken: null,
	status: 'idle',
	error: null,
	rememberedEmail: localStorage.getItem('rememberedEmail') || null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		/**
		 * Sets the remembered email and persists it to localStorage
		 */
		setRememberedEmail(state, action: PayloadAction<string>) {
			state.rememberedEmail = action.payload
			localStorage.setItem('rememberedEmail', action.payload)
		},
		/**
		 * Clears the remembered email from state and localStorage
		 */
		clearRememberedEmail(state) {
			state.rememberedEmail = null
			localStorage.removeItem('rememberedEmail')
		},
		/**
		 * Logs out the user by clearing auth state
		 */
		logoutUser(state) {
			state.user = null
			state.authToken = null
			state.status = 'idle'
			state.error = null
			localStorage.removeItem('token')
		},
		/**
		 * Resets auth state to initial state
		 */
		resetAuthState(state) {
			state.user = initialState.user
			state.authToken = initialState.authToken
			state.status = initialState.status
			state.error = initialState.error
			state.rememberedEmail = initialState.rememberedEmail
			localStorage.removeItem('token')
			localStorage.removeItem('rememberedEmail')
		},
		/**
		 * Clears the error state
		 */
		clearError(state) {
			state.error = null
		}
	},
	extraReducers: builder => {
		builder
			// Login
			.addCase(login.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(
				login.fulfilled,
				(state, action: PayloadAction<{ loginData: LoginResponse }>) => {
					state.status = 'succeeded'
					state.authToken = action.payload.loginData
					state.error = null
				}
			)
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Login failed'
			})
			// Fetch User
			.addCase(fetchUser.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.status = 'succeeded'
				state.user = action.payload
				state.error = null
				const storedToken = localStorage.getItem('token')
				if (storedToken && !state.authToken) {
					state.authToken = { token: storedToken } // Синхронизируем authToken
				}
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Fetch user failed'
				state.user = null
			})
			// Logout
			.addCase(logout.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(logout.fulfilled, state => {
				state.status = 'idle'
				state.user = null
				state.authToken = null
				state.error = null
				localStorage.removeItem('token')
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Logout failed'
			})
	}
})

export const {
	setRememberedEmail,
	clearRememberedEmail,
	logoutUser,
	resetAuthState,
	clearError
} = authSlice.actions

export default authSlice.reducer
