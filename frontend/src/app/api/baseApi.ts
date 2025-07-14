import { handleApiError } from '@/app/api/errorHandler'
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios'

// Base URL from environment variable or fallback
const BASE_URL =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

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

	// Response interceptor for error handling
	instance.interceptors.response.use(
		(response: AxiosResponse) => response,
		(error: AxiosError) => handleApiError(error)
	)

	return instance
}

export const baseApi = createBaseApi()
