import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResponse, User } from './model'
import { fetchUser, login } from './thunks'

interface AuthState {
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
		setRememberedEmail(state, action: PayloadAction<string>) {
			state.rememberedEmail = action.payload
			localStorage.setItem('rememberedEmail', action.payload)
		},
		clearRememberedEmail(state) {
			state.rememberedEmail = null
			localStorage.removeItem('rememberedEmail')
		}
	},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.user = action.payload.userData
				state.authToken = action.payload.loginData
				state.error = null
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Login failed'
			})

			.addCase(fetchUser.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.user = action.payload
				state.error = null
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = (action.payload as string) || 'Fetch user failed'
				state.user = null
			})
	}
})

export const { setRememberedEmail, clearRememberedEmail } = authSlice.actions

export default authSlice.reducer
