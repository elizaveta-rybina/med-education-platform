import { AxiosError } from 'axios'

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
	console.error('Full error object:', error)
	console.error('Is AxiosError:', error instanceof AxiosError)
	console.error('Response data:', error.response?.data)

	if (error instanceof AxiosError) {
		let message: string

		// Check common error response structures
		if (error.response?.data) {
			const data = error.response.data
			if (data.message) {
				message = data.message
			} else if (data.error) {
				message = data.error
			} else if (Array.isArray(data.errors)) {
				message = data.errors.join(', ')
			} else if (typeof data === 'string') {
				message = data
			} else {
				message = 'An unexpected error occurred'
			}
		} else {
			// No response data (e.g., network error)
			message = error.message || 'An unexpected error occurred'
		}

		throw new ApiError(message, error.response?.status || 500, 'ApiError')
	}

	// Non-Axios error
	const message = error.message || 'An unexpected error occurred'
	throw new ApiError(message, 500, 'ApiError')
}
