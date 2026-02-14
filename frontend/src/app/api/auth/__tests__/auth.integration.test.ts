/**
 * Integration tests for Auth API with token management
 *
 * These tests verify the interaction between auth API and token storage
 * by mocking only the HTTP client layer, allowing token functions to work
 * with the actual localStorage.
 */

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

jest.mock('@/app/api/apiClient')

import { ApiClient } from '@/app/api/apiClient'
import { authApi } from '../auth.api'
import {
	getToken,
	getTokenMeta,
	isTokenExpired,
	isTokenValid,
	willExpireSoon
} from '../authToken'

describe('Auth API Integration Tests', () => {
	beforeEach(() => {
		localStorage.clear()
		jest.clearAllMocks()
		jest.useFakeTimers()
		jest.setSystemTime(new Date('2026-02-14T10:00:00Z'))
	})

	afterEach(() => {
		jest.runOnlyPendingTimers()
		jest.useRealTimers()
	})

	describe('Token lifecycle', () => {
		it('should store token and metadata after successful login', async () => {
			const credentials = {
				email: 'test@example.com',
				password: 'Password123'
			}

			const mockResponse = {
				token: 'test-token.header.signature',
				token_type: 'Bearer',
				expires_in: 3600
			}

			;(ApiClient.post as jest.Mock).mockResolvedValue(mockResponse)

			// Before login
			expect(isTokenValid()).toBe(false)

			// Perform login
			await authApi.login(credentials)

			// After login
			expect(getToken()).toBe('test-token.header.signature')
			expect(getTokenMeta().token_type).toBe('Bearer')
			expect(isTokenValid()).toBe(true)
			expect(isTokenExpired()).toBe(false)
		})

		it('should detect expired token after timeout', async () => {
			const mockResponse = {
				token: 'short-lived-token.header.signature',
				token_type: 'Bearer',
				expires_in: 120 // 2 minutes
			}

			;(ApiClient.post as jest.Mock).mockResolvedValue(mockResponse)

			await authApi.login({
				email: 'test@example.com',
				password: 'Password123'
			})

			expect(isTokenValid()).toBe(true)

			// Fast forward time to just before expiration
			jest.advanceTimersByTime(119000)
			expect(isTokenValid()).toBe(true)
			expect(willExpireSoon(60000)).toBe(true)

			// Fast forward past expiration
			jest.advanceTimersByTime(2000)
			expect(isTokenValid()).toBe(false)
			expect(isTokenExpired()).toBe(true)
		})

		it('should handle token refresh and update stored token', async () => {
			// Initial login
			const initialToken = {
				token: 'initial-token.header.signature',
				token_type: 'Bearer',
				expires_in: 3600
			}

			;(ApiClient.post as jest.Mock).mockResolvedValueOnce(initialToken)

			await authApi.login({
				email: 'test@example.com',
				password: 'Password123'
			})

			const firstToken = getToken()
			expect(firstToken).toBe('initial-token.header.signature')

			// Refresh token
			const refreshedToken = {
				token: 'refreshed-token.header.signature',
				token_type: 'Bearer',
				expires_in: 3600
			}

			;(ApiClient.post as jest.Mock).mockResolvedValueOnce(refreshedToken)

			await authApi.refresh()

			const secondToken = getToken()
			expect(secondToken).toBe('refreshed-token.header.signature')
			expect(secondToken).not.toBe(firstToken)
		})

		it('should clear token on logout', async () => {
			// Setup: login
			const mockResponse = {
				token: 'some-token.header.signature',
				token_type: 'Bearer',
				expires_in: 3600
			}

			;(ApiClient.post as jest.Mock).mockResolvedValueOnce(mockResponse)

			await authApi.login({
				email: 'test@example.com',
				password: 'Password123'
			})

			expect(isTokenValid()).toBe(true)
			expect(getToken()).toBe('some-token.header.signature')

			// Logout
			;(ApiClient.post as jest.Mock).mockResolvedValueOnce({
				message: 'Logged out'
			})

			await authApi.logout()

			// Token should be cleared
			expect(getToken()).toBe('')
			expect(isTokenValid()).toBe(false)
			expect(getTokenMeta()).toEqual({})
		})
	})

	describe('Register with token', () => {
		it('should set token from registration response', async () => {
			const registerData = {
				username: 'newuser',
				email: 'newuser@example.com',
				password: 'Password123',
				password_confirmation: 'Password123',
				birth_date: '2000-01-01',
				last_name: 'User',
				first_name: 'New',
				university_id: 1,
				faculty: 'Engineering',
				specialization: 'Software Engineering',
				course: 1,
				group: 'SE-1'
			}

			const mockResponse = {
				message: 'Registered',
				user: {
					id: 1,
					username: 'newuser',
					email: 'newuser@example.com',
					first_name: 'New',
					last_name: 'User',
					birth_date: '2000-01-01',
					university_id: 1,
					faculty: 'Engineering',
					specialization: 'Software Engineering',
					course: 1,
					group: 'SE-1',
					created_at: '2026-02-14T10:00:00Z',
					updated_at: '2026-02-14T10:00:00Z'
				},
				token: 'registration-token.header.signature',
				token_type: 'Bearer',
				expires_in: 7200
			}

			;(ApiClient.post as jest.Mock).mockResolvedValue(mockResponse)

			await authApi.register(registerData)

			expect(getToken()).toBe('registration-token.header.signature')
			expect(isTokenValid()).toBe(true)
			expect(getTokenMeta().token_type).toBe('Bearer')
		})
	})

	describe('Error scenarios', () => {
		it('should not affect token storage on login failure', async () => {
			// First successful login
			const firstLogin = {
				token: 'initial-token.header.signature',
				token_type: 'Bearer',
				expires_in: 3600
			}

			;(ApiClient.post as jest.Mock).mockResolvedValueOnce(firstLogin)

			await authApi.login({
				email: 'test@example.com',
				password: 'correct-password'
			})

			expect(getToken()).toBe('initial-token.header.signature')

			// Failed login attempt
			;(ApiClient.post as jest.Mock).mockRejectedValueOnce(
				new Error('Invalid credentials')
			)

			try {
				await authApi.login({
					email: 'test@example.com',
					password: 'wrong-password'
				})
			} catch {
				// Expected to fail
			}

			// Original token should still be valid
			expect(getToken()).toBe('initial-token.header.signature')
			expect(isTokenValid()).toBe(true)
		})

		it('should always clear token on logout, even if API fails', async () => {
			// Setup: login
			const mockResponse = {
				token: 'some-token.header.signature',
				token_type: 'Bearer',
				expires_in: 3600
			}

			;(ApiClient.post as jest.Mock).mockResolvedValueOnce(mockResponse)

			await authApi.login({
				email: 'test@example.com',
				password: 'Password123'
			})

			expect(getToken()).toBe('some-token.header.signature')

			// Simulate logout API failure
			;(ApiClient.post as jest.Mock).mockRejectedValueOnce(
				new Error('Network error')
			)

			try {
				await authApi.logout()
			} catch {
				// Expected to fail
			}

			// Token should still be cleared despite API error
			expect(getToken()).toBe('')
			expect(isTokenValid()).toBe(false)
		})
	})

	describe('User session management', () => {
		it('should fetch user info with valid token', async () => {
			// Setup: login first
			;(ApiClient.post as jest.Mock).mockResolvedValueOnce({
				token: 'auth-token.header.signature',
				token_type: 'Bearer',
				expires_in: 3600
			})

			await authApi.login({
				email: 'user@example.com',
				password: 'Password123'
			})

			// Fetch user info
			const mockMeResponse = {
				user: {
					id: 1,
					username: 'testuser',
					email: 'user@example.com',
					first_name: 'Test',
					last_name: 'User',
					birth_date: '2000-01-01',
					university_id: 1,
					faculty: 'Engineering',
					specialization: 'Software Engineering',
					course: 2,
					group: 'SE-2',
					created_at: '2026-02-14T10:00:00Z',
					updated_at: '2026-02-14T10:00:00Z'
				}
			}

			;(ApiClient.get as jest.Mock).mockResolvedValueOnce(mockMeResponse)

			const userInfo = await authApi.getMe()

			expect(userInfo.user.username).toBe('testuser')
			expect(userInfo.user.email).toBe('user@example.com')
		})

		it('should handle session expiration during getMe call', async () => {
			// Setup: login with short-lived token
			;(ApiClient.post as jest.Mock).mockResolvedValueOnce({
				token: 'short-token.header.signature',
				token_type: 'Bearer',
				expires_in: 60
			})

			await authApi.login({
				email: 'user@example.com',
				password: 'Password123'
			})

			// Fast forward to near token expiration
			jest.advanceTimersByTime(50000)

			// At this point, token is about to expire but still valid
			expect(isTokenValid()).toBe(true)
			expect(willExpireSoon()).toBe(true)
		})
	})

	describe('Multiple authentication flows', () => {
		it('should handle switching users (logout -> login)', async () => {
			// User 1 login
			;(ApiClient.post as jest.Mock).mockResolvedValueOnce({
				token: 'user1-token.header.signature',
				token_type: 'Bearer',
				expires_in: 3600
			})

			await authApi.login({
				email: 'user1@example.com',
				password: 'Password123'
			})

			expect(getToken()).toBe('user1-token.header.signature')

			// Get User 1 info
			;(ApiClient.get as jest.Mock).mockResolvedValueOnce({
				user: {
					id: 1,
					username: 'user1',
					email: 'user1@example.com',
					first_name: 'User',
					last_name: 'One',
					birth_date: '2000-01-01',
					university_id: 1,
					faculty: 'Engineering',
					specialization: 'Software Engineering',
					course: 1,
					group: 'SE-1',
					created_at: '2026-02-14T10:00:00Z',
					updated_at: '2026-02-14T10:00:00Z'
				}
			})

			const user1 = await authApi.getMe()
			expect(user1.user.username).toBe('user1')

			// Logout User 1
			;(ApiClient.post as jest.Mock).mockResolvedValueOnce({
				message: 'Logged out'
			})

			await authApi.logout()
			expect(getToken()).toBe('')

			// User 2 login
			;(ApiClient.post as jest.Mock).mockResolvedValueOnce({
				token: 'user2-token.header.signature',
				token_type: 'Bearer',
				expires_in: 3600
			})

			await authApi.login({
				email: 'user2@example.com',
				password: 'Password123'
			})

			expect(getToken()).toBe('user2-token.header.signature')

			// Get User 2 info
			;(ApiClient.get as jest.Mock).mockResolvedValueOnce({
				user: {
					id: 2,
					username: 'user2',
					email: 'user2@example.com',
					first_name: 'User',
					last_name: 'Two',
					birth_date: '1999-12-31',
					university_id: 2,
					faculty: 'Medicine',
					specialization: 'Medicine',
					course: 2,
					group: 'MED-2',
					created_at: '2026-02-14T10:00:00Z',
					updated_at: '2026-02-14T10:00:00Z'
				}
			})

			const user2 = await authApi.getMe()
			expect(user2.user.username).toBe('user2')
		})
	})
})
