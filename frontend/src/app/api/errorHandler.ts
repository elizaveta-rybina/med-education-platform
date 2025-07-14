import { AxiosError } from 'axios'

// Define interface for API error response
interface ApiErrorResponse {
	error?: string
	message?: string
	statusCode?: number
}

// Custom error class for API errors
export class ApiError extends Error {
	public statusCode: number
	public error: string

	constructor(message: string, statusCode: number, error: string) {
		super(message)
		this.statusCode = statusCode
		this.error = error
		this.name = 'ApiError'
	}
}

// Function to handle and normalize API errors
export const handleApiError = (error: unknown): never => {
	if (error instanceof AxiosError) {
		const response = error.response?.data as ApiErrorResponse | undefined
		const statusCode = error.response?.status || 500
		const message =
			response?.message ||
			response?.error ||
			error.message ||
			'An unexpected error occurred'
		const errorType = response?.error || 'Unknown Error'

		throw new ApiError(message, statusCode, errorType)
	}

	throw new ApiError('An unexpected error occurred', 500, 'Unknown Error')
}
