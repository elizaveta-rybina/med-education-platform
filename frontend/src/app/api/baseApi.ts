import { getToken } from '@/app/api/auth/authToken'
import {
	clearRefreshQueue,
	queueTokenRefresh
} from '@/app/api/auth/tokenRefreshQueue'
import { handleApiError } from '@/app/api/errorHandler'
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios'

// Base URL from environment variable or fallback
const BASE_URL =
	typeof import.meta !== 'undefined' && import.meta.env
		? import.meta.env.VITE_API_BASE_URL
		: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

/**
 * Creates an Axios instance with default configuration and enhanced interceptors
 *
 * Features:
 * - Automatic token injection to requests
 * - Automatic token refresh on 401 (with queue to prevent race conditions)
 * - Detailed error logging
 * - Session expiration handling
 *
 * @returns Configured Axios instance with interceptors
 */
export const createBaseApi = (): AxiosInstance => {
	const instance = axios.create({
		baseURL: BASE_URL,
		withCredentials: true,
		timeout: 10000,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	})

	// Request interceptor to add auth token from localStorage
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const token = getToken()
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		},
		(error: AxiosError) => Promise.reject(error)
	)

	// Response interceptor for error handling and automatic token refresh
	instance.interceptors.response.use(
		(response: AxiosResponse) => response,
		async (error: AxiosError) => {
			const originalRequest = error.config as InternalAxiosRequestConfig & {
				_retry?: boolean
			}

			// Log all errors with detailed information
			console.error('[API Error]', {
				message: error.message,
				code: error.code,
				status: error.response?.status,
				url: error.config?.url,
				baseURL: error.config?.baseURL,
				fullUrl: `${error.config?.baseURL || ''}${error.config?.url || ''}`
			})

			// Handle 401 Unauthorized - attempt token refresh
			if (
				error.response?.status === 401 &&
				originalRequest &&
				!originalRequest._retry
			) {
				originalRequest._retry = true

				try {
					// Queue the refresh to prevent race conditions
					// This ensures only one refresh happens even if multiple requests get 401
					const refreshSucceeded = await queueTokenRefresh(async () => {
						// dynamically import to avoid circular dependency
						const { authApi } = await import('@/app/api/auth/auth.api')
						await authApi.refresh()
					})

					if (refreshSucceeded) {
						// Token refreshed successfully, retry the original request
						const token = getToken()
						if (token && originalRequest.headers) {
							originalRequest.headers.Authorization = `Bearer ${token}`
						}
						// Retry the original request with new token
						return instance(originalRequest)
					}
				} catch (refreshError) {
					console.error('[Token Refresh Failed]', refreshError)
					// Refresh failed, clear auth and redirect to login
					localStorage.removeItem('token')
					localStorage.removeItem('token_meta')
					localStorage.removeItem('user')
					clearRefreshQueue()

					if (!window.location.pathname.includes('/login')) {
						window.location.href = '/login?session=expired'
					}
					return Promise.reject(refreshError)
				}
			}

			// For other 401 errors or errors without retry capability
			if (error.response?.status === 401) {
				localStorage.removeItem('token')
				localStorage.removeItem('token_meta')
				localStorage.removeItem('user')
				clearRefreshQueue()

				if (!window.location.pathname.includes('/login')) {
					window.location.href = '/login?session=expired'
				}
			}

			return handleApiError(error)
		}
	)

	return instance
}

export const baseApi = createBaseApi()
