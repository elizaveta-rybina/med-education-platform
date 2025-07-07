import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from './api'
import { LoginData } from './model'

type ApiError = {
	response?: {
		data?: {
			message?: string
		}
	}
	message?: string
}

export const login = createAsyncThunk(
	'auth/login',
	async (credentials: LoginData, { rejectWithValue }) => {
		try {
			const loginData = await authApi.login(credentials)
			localStorage.setItem('token', loginData.token)

			const userData = await authApi.getMe()
			return { loginData, userData }
		} catch (error) {
			const err = error as ApiError
			return rejectWithValue(
				err.response?.data?.message || err.message || 'Login failed'
			)
		}
	}
)

export const fetchUser = createAsyncThunk(
	'auth/fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) return rejectWithValue('No token found')

			const userData = await authApi.getMe()
			return userData
		} catch (error) {
			const err = error as ApiError
			return rejectWithValue(
				err.response?.data?.message || err.message || 'Error fetching user'
			)
		}
	}
)
