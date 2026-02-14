// Mock baseApi first to prevent import.meta issues
jest.mock('@/app/api/baseApi', () => ({
	baseApi: {
		defaults: { headers: {} },
		interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
		patch: jest.fn(),
		delete: jest.fn(),
		request: jest.fn()
	}
}))

// Mock the ApiClient module
jest.mock('@/app/api/apiClient')

// Mock the authToken module
jest.mock('../authToken')

import { ApiClient } from '@/app/api/apiClient'
import { authApi } from '../auth.api'
import * as authToken from '../authToken'

describe('authApi', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		// Default: token is valid for most tests
		;(authToken.isTokenValid as jest.Mock).mockReturnValue(true)
	})

	describe('register', () => {
		it('should register user and set auth token', async () => {
			const registerData = {
				username: 'testuser',
				email: 'test@example.com',
				password: 'Password123',
				password_confirmation: 'Password123',
				birth_date: '2000-01-01',
				last_name: 'User',
				first_name: 'Test',
				middle_name: 'Middle',
				university_id: 1,
				faculty: 'Engineering',
				specialization: 'Software Engineering',
				course: 2,
				group: 'SE-2'
			}

			const mockResponse = {
				message: 'Registered successfully',
				user: {
					id: 1,
					username: 'testuser',
					email: 'test@example.com',
					first_name: 'Test',
					last_name: 'User',
					middle_name: 'Middle',
					birth_date: '2000-01-01',
					university_id: 1,
					faculty: 'Engineering',
					specialization: 'Software Engineering',
					course: 2,
					group: 'SE-2',
					created_at: '2026-02-14T10:00:00Z',
					updated_at: '2026-02-14T10:00:00Z'
				},
				token: 'auth-token.header.signature',
				token_type: 'bearer',
				expires_in: 900
			}

			;(ApiClient.post as jest.Mock).mockResolvedValue(mockResponse)

			const result = await authApi.register(registerData)

			expect(ApiClient.post).toHaveBeenCalledWith(
				'/auth/register',
				registerData
			)
			expect(authToken.setAuthTokenFromLoginResponse).toHaveBeenCalledWith({
				token: 'auth-token.header.signature',
				token_type: 'bearer',
				expires_in: 900
			})
			expect(result).toEqual(mockResponse)
		})

		it('should register without token if not provided', async () => {
			const registerData = {
				username: 'testuser',
				email: 'test@example.com',
				password: 'Password123',
				password_confirmation: 'Password123',
				birth_date: '2000-01-01',
				last_name: 'User',
				first_name: 'Test',
				university_id: 1,
				faculty: 'Engineering',
				specialization: 'Software Engineering',
				course: 2,
				group: 'SE-2'
			}

			const mockResponse = {
				message: 'Registered successfully but email verification required'
			}

			;(ApiClient.post as jest.Mock).mockResolvedValue(mockResponse)

			const result = await authApi.register(registerData)

			expect(ApiClient.post).toHaveBeenCalledWith(
				'/auth/register',
				registerData
			)
			expect(authToken.setAuthTokenFromLoginResponse).not.toHaveBeenCalled()
			expect(result).toEqual(mockResponse)
		})

		it('should handle register error', async () => {
			const registerData = {
				username: 'testuser',
				email: 'test@example.com',
				password: 'Password123',
				password_confirmation: 'Password123',
				birth_date: '2000-01-01',
				last_name: 'User',
				first_name: 'Test',
				university_id: 1,
				faculty: 'Engineering',
				specialization: 'Software Engineering',
				course: 2,
				group: 'SE-2'
			}

			const error = new Error('Email already exists')
			;(ApiClient.post as jest.Mock).mockRejectedValue(error)

			await expect(authApi.register(registerData)).rejects.toThrow(
				'Email already exists'
			)
		})
	})

	describe('login', () => {
		it('should login user and set auth token', async () => {
			const credentials = {
				email: 'test@example.com',
				password: 'Password123'
			}

			const mockResponse = {
				token: 'auth-token.header.signature',
				token_type: 'bearer',
				expires_in: 3600
			}

			;(ApiClient.post as jest.Mock).mockResolvedValue(mockResponse)

			const result = await authApi.login(credentials)

			expect(ApiClient.post).toHaveBeenCalledWith('/auth/login', credentials)
			expect(authToken.setAuthTokenFromLoginResponse).toHaveBeenCalledWith(
				mockResponse
			)
			expect(result).toEqual(mockResponse)
		})

		it('should handle login error', async () => {
			const credentials = {
				email: 'test@example.com',
				password: 'wrong-password'
			}

			const error = new Error('Invalid credentials')
			;(ApiClient.post as jest.Mock).mockRejectedValue(error)

			await expect(authApi.login(credentials)).rejects.toThrow(
				'Invalid credentials'
			)
		})
	})

	describe('logout', () => {
		it('should logout and clear auth token', async () => {
			const mockResponse = {
				message: 'Logged out successfully'
			}

			;(ApiClient.post as jest.Mock).mockResolvedValue(mockResponse)

			const result = await authApi.logout()

			expect(ApiClient.post).toHaveBeenCalledWith('/auth/logout')
			expect(authToken.clearAuthToken).toHaveBeenCalled()
			expect(result).toEqual(mockResponse)
		})

		it('should clear token even if logout request fails', async () => {
			const error = new Error('Network error')
			;(ApiClient.post as jest.Mock).mockRejectedValue(error)

			await expect(authApi.logout()).rejects.toThrow('Network error')
			expect(authToken.clearAuthToken).toHaveBeenCalled()
		})

		it('should clear token even if logout request throws', async () => {
			;(ApiClient.post as jest.Mock).mockImplementation(() => {
				throw new Error('Request failed')
			})

			try {
				await authApi.logout()
			} catch {
				// Expected
			}

			expect(authToken.clearAuthToken).toHaveBeenCalled()
		})
	})

	describe('refresh', () => {
		it('should refresh token and update auth token', async () => {
			const mockResponse = {
				token: 'new-auth-token-456.header.signature',
				token_type: 'bearer',
				expires_in: 3600
			}

			;(ApiClient.post as jest.Mock).mockResolvedValue(mockResponse)

			const result = await authApi.refresh()

			expect(ApiClient.post).toHaveBeenCalledWith('/auth/refresh')
			expect(authToken.setAuthTokenFromLoginResponse).toHaveBeenCalledWith(
				mockResponse
			)
			expect(result).toEqual(mockResponse)
		})

		it('should handle refresh error', async () => {
			const error = new Error('Token refresh failed')
			;(ApiClient.post as jest.Mock).mockRejectedValue(error)

			await expect(authApi.refresh()).rejects.toThrow('Token refresh failed')
		})
	})

	describe('getMe', () => {
		it('should fetch current user info', async () => {
			const mockUser = {
				id: 1,
				username: 'testuser',
				email: 'test@example.com',
				first_name: 'Test',
				last_name: 'User',
				birth_date: '2000-01-01',
				university_id: 1,
				faculty: 'Engineering',
				specialization: 'Software Engineering',
				course: 2,
				group: 'SE-2',
				roles: ['student'],
				created_at: '2026-02-14T10:00:00Z',
				updated_at: '2026-02-14T10:00:00Z'
			}

			const mockResponse = {
				user: mockUser
			}

			;(ApiClient.get as jest.Mock).mockResolvedValue(mockResponse)

			const result = await authApi.getMe()

			expect(ApiClient.get).toHaveBeenCalledWith('/auth/me')
			expect(result).toEqual(mockResponse)
			expect(result.user).toEqual(mockUser)
		})

		it('should handle getMe error', async () => {
			const error = new Error('Unauthorized')
			;(ApiClient.get as jest.Mock).mockRejectedValue(error)

			await expect(authApi.getMe()).rejects.toThrow('Unauthorized')
		})

		it('should return user with optional fields', async () => {
			const mockUser = {
				id: 2,
				username: 'testuser2',
				email: 'test2@example.com',
				first_name: 'Test',
				last_name: 'User',
				birth_date: '1999-12-31',
				university_id: 2,
				faculty: 'Medicine',
				specialization: 'General Medicine',
				course: 1,
				group: 'MED-1',
				created_at: '2026-02-14T10:00:00Z',
				updated_at: '2026-02-14T10:00:00Z'
			}

			const mockResponse = {
				user: mockUser
			}

			;(ApiClient.get as jest.Mock).mockResolvedValue(mockResponse)

			const result = await authApi.getMe()

			expect(result.user.id).toBe(2)
			expect(result.user.roles).toBeUndefined()
			expect(result.user.middle_name).toBeUndefined()
		})
	})

	describe('integration scenarios', () => {
		it('should handle complete auth flow: register -> login -> getMe -> logout', async () => {
			const registerData = {
				username: 'newuser',
				email: 'new@example.com',
				password: 'Password123',
				password_confirmation: 'Password123',
				birth_date: '2000-01-01',
				last_name: 'New',
				first_name: 'User',
				university_id: 1,
				faculty: 'Engineering',
				specialization: 'Software Engineering',
				course: 1,
				group: 'SE-1'
			}

			// Register
			const registerResponse = {
				message: 'Registered',
				token: 'token-1.header.signature',
				token_type: 'bearer',
				expires_in: 3600
			}
			;(ApiClient.post as jest.Mock).mockResolvedValueOnce(registerResponse)

			await authApi.register(registerData)
			expect(authToken.setAuthTokenFromLoginResponse).toHaveBeenCalledTimes(1)

			// Login
			const loginResponse = {
				token: 'token-2.header.signature',
				token_type: 'bearer',
				expires_in: 3600
			}
			;(ApiClient.post as jest.Mock).mockResolvedValueOnce(loginResponse)

			await authApi.login({ email: 'new@example.com', password: 'Password123' })
			expect(authToken.setAuthTokenFromLoginResponse).toHaveBeenCalledTimes(2)

			// GetMe
			const meResponse = {
				user: {
					id: 1,
					username: 'newuser',
					email: 'new@example.com',
					first_name: 'User',
					last_name: 'New',
					birth_date: '2000-01-01',
					university_id: 1,
					faculty: 'Engineering',
					specialization: 'Software Engineering',
					course: 1,
					group: 'SE-1',
					created_at: '2026-02-14T10:00:00Z',
					updated_at: '2026-02-14T10:00:00Z'
				}
			}
			;(ApiClient.get as jest.Mock).mockResolvedValueOnce(meResponse)

			const userInfo = await authApi.getMe()
			expect(userInfo.user.username).toBe('newuser')

			// Logout
			const logoutResponse = { message: 'Logged out' }
			;(ApiClient.post as jest.Mock).mockResolvedValueOnce(logoutResponse)

			await authApi.logout()
			expect(authToken.clearAuthToken).toHaveBeenCalledTimes(1)
		})
	})
})
