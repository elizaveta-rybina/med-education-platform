import { setAuthToken } from '@/app/api/client'
import { ApiError } from '@/app/api/errorHandler'
import { authApi } from '@/app/store/auth/api/auth.api'
import { LoginData } from '@/app/store/auth/model'
import { createAsyncThunk } from '@reduxjs/toolkit'

/**
 * Logs in a user with provided credentials
 */
export const login = createAsyncThunk(
	'auth/login',
	async (data: LoginData, { rejectWithValue }) => {
		try {
			const response = await authApi.login(data)
			return { loginData: response }
		} catch (error) {
			console.error('Login thunk error:', error)
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Login failed')
		}
	}
)

/**
 * Fetches authenticated user data
 */
export const fetchUser = createAsyncThunk(
	'auth/fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await authApi.getMe()
			return response
		} catch (error) {
			if (error instanceof ApiError && error.statusCode === 401) {
				try {
					const refreshResponse = await authApi.refreshToken()
					setAuthToken(refreshResponse.token)
					const retryResponse = await authApi.getMe()
					return retryResponse
				} catch (refreshError) {
					localStorage.removeItem('token') // Очищаем токен при неудачном обновлении
					return rejectWithValue('Fetch user failed after token refresh')
				}
			}
			return rejectWithValue('Fetch user failed')
		}
	}
)

/**
 * Logs out the current user
 */
export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			await authApi.logout()
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Logout failed')
		}
	}
)
