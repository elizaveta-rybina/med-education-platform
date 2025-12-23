import { handleApiError } from '@/app/api/errorHandler'
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios'

// Base URL from environment variable or fallback
const BASE_URL = import.meta.env.VITE_API_BASE_URL
/**
 * Creates an Axios instance with default configuration and interceptors
 * @returns Configured Axios instance
 */
export const createBaseApi = (): AxiosInstance => {
	const instance = axios.create({
		baseURL: BASE_URL,
		withCredentials: true,
		timeout: 10000,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin':
				import.meta.env.VITE_APP_URL || window.location.origin
		}
	})

	// Request interceptor to add auth token
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const token = localStorage.getItem('token')
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`
			}
			console.log('[API Request]', {
				method: config.method?.toUpperCase(),
				url: config.url,
				fullUrl: config.baseURL + config.url
			})
			return config
		},
		(error: AxiosError) => Promise.reject(error)
	)

	// Response interceptor for error handling
	instance.interceptors.response.use(
		(response: AxiosResponse) => response,
		(error: AxiosError) => {
			console.error('[API Error]', {
				message: error.message,
				code: error.code,
				status: error.response?.status,
				url: error.config?.url,
				baseURL: error.config?.baseURL,
				fullUrl: error.config?.baseURL + error.config?.url
			})
			// Handle 401 Unauthorized errors (token expired)
			if (error.response?.status === 401) {
				// Clear auth data
				localStorage.removeItem('token')
				localStorage.removeItem('user')

				// Redirect to login if not already there
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
