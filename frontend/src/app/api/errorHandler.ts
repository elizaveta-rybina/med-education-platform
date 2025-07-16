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
export const handleApiError = (error: any) => {
	if (error instanceof AxiosError) {
		const message =
			error.response?.data?.message ||
			error.message ||
			'An unexpected error occurred'
		console.error('API error details:', error.response?.data)
		throw new ApiError(message, error.response?.status || 500, 'ApiError')
	}
	throw new ApiError('An unexpected error occurred', 500, 'ApiError')
}
