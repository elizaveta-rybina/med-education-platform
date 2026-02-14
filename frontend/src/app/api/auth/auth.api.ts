/**
 * Authentication API module
 *
 * Provides methods for:
 * - User registration and login (with runtime validation)
 * - Token management (obtain, refresh, revoke)
 * - User profile retrieval
 *
 * Features:
 * - Automatic token storage and cleanup through authToken utilities
 * - Runtime validation using Zod schemas
 * - Automatic token refresh on 401 (via interceptors)
 * - Race condition prevention (queueTokenRefresh)
 *
 * Security considerations:
 * - Tokens stored in localStorage (see SECURITY.md for XSS mitigation)
 * - HttpOnly cookies recommended for refresh tokens (future improvement)
 * - Refresh tokens are one-time use (implemented in interceptors)
 *
 * @module auth.api
 * @requires apiClient - HTTP client for making requests
 * @requires authToken - Token storage and management
 * @requires auth.validation - Zod schemas for runtime validation
 *
 * @example
 * // Login and authenticate
 * const loginResponse = await authApi.login({ email, password })
 *
 * // Get current user info (auto-refreshes token if needed)
 * const meResponse = await authApi.getMe()
 *
 * // Logout (automatically clears token)
 * await authApi.logout()
 */

import { ApiClient } from '@/app/api/apiClient'
import {
	ApiValidationError,
	loginRequestSchema,
	loginResponseSchema,
	logoutResponseSchema,
	meResponseSchema,
	parseApiResponse,
	registerRequestSchema,
	registerResponseSchema,
	validateRequest,
	type LoginRequest,
	type LoginResponse,
	type LogoutResponse,
	type MeResponse,
	type RegisterRequest,
	type RegisterResponse
} from '@/app/api/auth/auth.validation'
import {
	clearAuthToken,
	getToken,
	isTokenValid,
	setAuthTokenFromLoginResponse
} from '@/app/api/auth/authToken'

export { ApiValidationError }

/**
 * Handles token response by validating and storing
 * @private
 */
const handleTokenResponse = (response: unknown): LoginResponse => {
	const validated = parseApiResponse(response, loginResponseSchema)
	setAuthTokenFromLoginResponse(validated)
	return validated
}

/**
 * Authentication API endpoints
 *
 * All methods include:
 * - Input validation via validateRequest()
 * - Response validation via parseApiResponse()
 * - Automatic token management via authToken utilities
 * - Error handling with detailed messages
 *
 * @namespace authApi
 */
export const authApi = {
	/**
	 * Register a new user account
	 *
	 * Creates a new user and optionally returns a session token
	 * if auto-login is enabled on the backend.
	 *
	 * Validates all input fields before sending and response structure after receiving.
	 *
	 * @async
	 * @param {RegisterRequest} data - User registration data
	 * @param {string} data.username - Unique username (3-20 chars)
	 * @param {string} data.email - Valid email address
	 * @param {string} data.password - Secure password (8+ chars, uppercase, lowercase, number)
	 * @param {string} data.password_confirmation - Must match password
	 * @param {string} data.first_name - User's first name
	 * @param {string} data.last_name - User's last name
	 * @param {string} [data.middle_name] - User's middle name (optional)
	 * @param {string} data.birth_date - Date of birth (YYYY-MM-DD)
	 * @param {number} data.university_id - ID of the university
	 * @param {string} data.faculty - Faculty/Department name
	 * @param {string} data.specialization - Academic specialization
	 * @param {number} data.course - Academic course (1-6)
	 * @param {string} data.group - Student group identifier
	 *
	 * @returns {Promise<RegisterResponse>} Registration result with optional auto-login token
	 * @throws {ApiValidationError} If input validation fails with field errors
	 * @throws {Error} If server validation fails or user already exists
	 *
	 * @example
	 * try {
	 *   const response = await authApi.register({
	 *     username: 'johndoe',
	 *     email: 'john@example.com',
	 *     password: 'SecurePassword123',
	 *     password_confirmation: 'SecurePassword123',
	 *     first_name: 'John',
	 *     last_name: 'Doe',
	 *     birth_date: '2000-01-15',
	 *     university_id: 1,
	 *     faculty: 'Engineering',
	 *     specialization: 'Software Engineering',
	 *     course: 2,
	 *     group: 'SE-2B'
	 *   })
	 *
	 *   if (response.token) {
	 *     console.log('Auto-logged in successfully')
	 *   } else {
	 *     console.log('Registration successful, please login')
	 *   }
	 * } catch (error) {
	 *   if (error instanceof ApiValidationError) {
	 *     console.error('Validation errors:', error.errors)
	 *   } else {
	 *     console.error('Registration failed:', error.message)
	 *   }
	 * }
	 */
	register: async (data: RegisterRequest): Promise<RegisterResponse> => {
		// Validate input before sending
		const validated = validateRequest(data, registerRequestSchema)

		const response = await ApiClient.post<RegisterResponse>(
			'/auth/register',
			validated
		)

		// Validate response structure
		const validatedResponse = parseApiResponse(response, registerResponseSchema)

		// Handle optional auto-login token
		if (validatedResponse.token) {
			setAuthTokenFromLoginResponse({
				token: validatedResponse.token,
				token_type: validatedResponse.token_type || 'Bearer',
				expires_in: validatedResponse.expires_in || 900
			})
		}

		return validatedResponse
	},

	/**
	 * Authenticate user with email and password
	 *
	 * Validates credentials and returns a session token
	 * automatically stored in localStorage by handleTokenResponse.
	 *
	 * @async
	 * @param {LoginRequest} credentials - User login credentials
	 * @param {string} credentials.email - User email address
	 * @param {string} credentials.password - User password
	 *
	 * @returns {Promise<LoginResponse>} Authentication token and metadata
	 * @throws {ApiValidationError} If input validation fails
	 * @throws {Error} If credentials are invalid or user not found
	 *
	 * @example
	 * try {
	 *   const auth = await authApi.login({
	 *     email: 'john@example.com',
	 *     password: 'SecurePassword123'
	 *   })
	 *   console.log('Logged in successfully')
	 *   // Token automatically stored, can now make authenticated requests
	 * } catch (error) {
	 *   if (error instanceof ApiValidationError) {
	 *     console.error('Invalid input format')
	 *   } else {
	 *     console.error('Invalid credentials')
	 *   }
	 * }
	 */
	login: async (credentials: LoginRequest): Promise<LoginResponse> => {
		// Validate input
		const validated = validateRequest(credentials, loginRequestSchema)

		const response = await ApiClient.post<LoginResponse>(
			'/auth/login',
			validated
		)

		return handleTokenResponse(response)
	},

	/**
	 * End the user session and clear authentication
	 *
	 * Always clears the stored token even if the API request fails.
	 * This ensures the user is logged out locally regardless of network state.
	 *
	 * @async
	 * @returns {Promise<LogoutResponse>} Server confirmation message
	 * @throws {Error} If the logout request fails (token is still cleared locally)
	 *
	 * @example
	 * try {
	 *   const response = await authApi.logout()
	 *   console.log('Successfully logged out:', response.message)
	 *   // Navigate to login page
	 *   navigate('/login')
	 * } catch (error) {
	 *   console.warn('Logout request failed, but session cleared locally')
	 *   // Still cleared locally, safe to navigate
	 *   navigate('/login')
	 * }
	 */
	logout: async (): Promise<LogoutResponse> => {
		try {
			const response = await ApiClient.post<LogoutResponse>('/auth/logout')
			return parseApiResponse(response, logoutResponseSchema)
		} finally {
			// Always clear locally, even if server request fails
			clearAuthToken()
		}
	},

	/**
	 * Refresh the current authentication token
	 *
	 * Obtains a new token using the current stored token.
	 * Automatically updates localStorage with new token.
	 *
	 * This is called automatically by interceptors when a 401 is received,
	 * but can also be called manually to proactively refresh before expiration.
	 *
	 * @async
	 * @returns {Promise<LoginResponse>} New authentication token
	 * @throws {Error} If refresh fails (token may be invalid, expired, or one-time use already used)
	 *
	 * @example
	 * // Refresh token before it expires
	 * import { willExpireSoon } from '@/app/api/auth/authToken'
	 *
	 * if (willExpireSoon(300000)) { // 5 minutes
	 *   try {
	 *     const newAuth = await authApi.refresh()
	 *     console.log('Token refreshed successfully')
	 *   } catch (error) {
	 *     // Token refresh failed, need to re-authenticate
	 *     await authApi.logout()
	 *     navigate('/login')
	 *   }
	 * }
	 */
	refresh: async (): Promise<LoginResponse> => {
		const response = await ApiClient.post<LoginResponse>('/auth/refresh')
		return handleTokenResponse(response)
	},

	/**
	 * Get the currently authenticated user's profile information
	 *
	 * Returns detailed user data including profile and role information.
	 * Requires a valid authentication token.
	 *
	 * Performance optimization: Checks token validity before making request
	 * to avoid unnecessary network calls if not authenticated.
	 *
	 * Automatic token refresh: If the token expires mid-request, the response
	 * interceptor will automatically refresh and retry (see baseApi.ts).
	 *
	 * @async
	 * @returns {Promise<MeResponse>} User profile object
	 * @throws {Error} If user is not authenticated or token is invalid
	 *
	 * @example
	 * try {
	 *   // Token is checked before making the request
	 *   const { user } = await authApi.getMe()
	 *
	 *   if (user) {
	 *     console.log(`Logged in as: ${user.first_name} ${user.last_name}`)
	 *     console.log(`Email: ${user.email}`)
	 *     console.log(`Faculty: ${user.faculty}`)
	 *     console.log(`Roles: ${user.roles?.join(', ')}`)
	 *   }
	 * } catch (error) {
	 *   // Token is invalid, expired, or missing
	 *   console.error('Not authenticated')
	 *   navigate('/login')
	 * }
	 */
	getMe: async (): Promise<MeResponse> => {
		// Optimization: Check token validity before making request
		if (!isTokenValid()) {
			throw new Error(
				'Not authenticated: Token is missing or expired. Please login again.'
			)
		}

		const response = await ApiClient.get<MeResponse>('/auth/me')

		// Validate response structure
		return parseApiResponse(response, meResponseSchema)
	},

	/**
	 * Check if user is currently authenticated (without API call)
	 *
	 * Only checks local token state - does not validate with server.
	 * For server validation, use getMe() instead.
	 *
	 * @returns {boolean} True if valid token exists, false otherwise
	 *
	 * @example
	 * if (authApi.isAuthenticated()) {
	 *   // User has valid token, safe to access auth-required pages
	 *   navigate('/dashboard')
	 * } else {
	 *   // No token, redirect to login
	 *   navigate('/login')
	 * }
	 */
	isAuthenticated: (): boolean => {
		return isTokenValid()
	},

	/**
	 * Get the current token without making API call
	 *
	 * Returns the stored token string or empty string if not set.
	 * Useful for debugging or passing to third-party services.
	 *
	 * @returns {string} JWT token or empty string
	 *
	 * @example
	 * const token = authApi.getToken()
	 * if (token) {
	 *   // Use token for custom API calls
	 *   fetch('/custom-endpoint', {
	 *     headers: { Authorization: `Bearer ${token}` }
	 *   })
	 * }
	 */
	getToken: (): string => {
		return getToken()
	}
}
