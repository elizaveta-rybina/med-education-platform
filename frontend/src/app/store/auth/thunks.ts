import { clearAuthToken, setAuthToken } from '@/app/api/client'
import { ApiError } from '@/app/api/errorHandler'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from './api'
import { LoginData } from './model'

/**
 * Logs in a user and fetches user data
 * @param credentials - Login credentials
 * @returns Object containing login data and user data
 */
export const login = createAsyncThunk(
	'auth/login',
	async (credentials: LoginData, { rejectWithValue }) => {
		try {
			const loginData = await authApi.login(credentials)
			setAuthToken(loginData.token)
			const userData = await authApi.getMe()
			return { loginData, userData }
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
 * @returns User data
 */
export const fetchUser = createAsyncThunk(
	'auth/fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new ApiError('No token found', 401, 'Unauthorized')
			}
			const userData = await authApi.getMe()
			return userData
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Error fetching user')
		}
	}
)

/**
 * Logs out the user
 * @returns Void
 */
export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			await authApi.logout()
			clearAuthToken()
		} catch (error) {
			if (error instanceof ApiError) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Logout failed')
		}
	}
)
