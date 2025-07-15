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
			const userResponse = await authApi.getMe()
			return { loginData: response, userData: userResponse }
		} catch (error) {
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
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
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
