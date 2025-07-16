import { handleApiError } from '@/app/api/errorHandler'
import { authApi } from '@/app/store/auth/api/auth.api' // Импортируем authApi для вызова refreshToken
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios'

// Interface for API error data
interface ApiErrorData {
	error?: string
	message?: string
	statusCode?: number
}

// Interface for API client configuration
interface ApiClientConfig {
	baseURL: string
	timeout?: number
	maxRetries?: number
}

/**
 * Creates an Axios instance with advanced configuration and interceptors
 * @param config - Configuration for the Axios instance
 * @returns Configured Axios instance
 */
const createApiClient = ({
	baseURL,
	timeout = 10000,
	maxRetries = 2
}: ApiClientConfig): AxiosInstance => {
	const instance = axios.create({
		baseURL,
		timeout,
		withCredentials: true, // Включаем отправку куки (для refresh_token)
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	})

	// Request interceptor to add auth token
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const token = localStorage.getItem('token')
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		},
		(error: AxiosError) => Promise.reject(error)
	)

	// Response interceptor with retry logic and token refresh
	instance.interceptors.response.use(
		(response: AxiosResponse) => response,
		async (error: AxiosError<ApiErrorData>) => {
			const config = error.config as InternalAxiosRequestConfig & {
				retryCount?: number
				_isRetry?: boolean // Флаг для предотвращения бесконечных попыток обновления
			}
			if (!config) return handleApiError(error)

			// Retry logic for 429 (Too Many Requests) or 503 (Service Unavailable)
			const shouldRetry = [429, 503].includes(error.response?.status || 0)
			const retryCount = config.retryCount || 0

			if (shouldRetry && retryCount < maxRetries) {
				config.retryCount = retryCount + 1
				const delay = Math.pow(2, retryCount) * 1000 // Exponential backoff
				await new Promise(resolve => setTimeout(resolve, delay))
				return instance(config)
			}

			// Handle 401 Unauthorized with token refresh
			if (error.response?.status === 401 && !config._isRetry) {
				config._isRetry = true // Устанавливаем флаг, чтобы избежать повторных попыток
				try {
					// Пытаемся обновить токен
					const refreshResponse = await authApi.refreshToken()
					const newToken = refreshResponse.token
					localStorage.setItem('token', newToken) // Сохраняем новый токен
					config.headers.Authorization = `Bearer ${newToken}` // Обновляем заголовок
					return instance(config) // Повторяем исходный запрос
				} catch (refreshError) {
					// Если обновление токена не удалось, очищаем токен и перенаправляем
					localStorage.removeItem('token')
					if (typeof window !== 'undefined') {
						window.location.href = '/login'
					}
					return handleApiError(refreshError)
				}
			}

			return handleApiError(error)
		}
	)

	return instance
}

// Initialize API client with environment variable
const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'
export const apiClient = createApiClient({ baseURL: API_BASE_URL })

/**
 * Sets the auth token in localStorage
 * @param token - Authentication token
 */
export const setAuthToken = (token: string) => {
	localStorage.setItem('token', token)
}

/**
 * Clears the auth token from localStorage
 */
export const clearAuthToken = () => {
	localStorage.removeItem('token')
}
