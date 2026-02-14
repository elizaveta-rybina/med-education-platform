import {
	clearAuthToken,
	getToken,
	getTokenMeta,
	isTokenExpired,
	isTokenValid,
	setAuthTokenFromLoginResponse,
	willExpireSoon
} from '../authToken'

describe('authToken', () => {
	beforeEach(() => {
		localStorage.clear()
		jest.useFakeTimers()
	})

	afterEach(() => {
		jest.runOnlyPendingTimers()
		jest.useRealTimers()
	})

	describe('getToken', () => {
		it('should return empty string when token not set', () => {
			expect(getToken()).toBe('')
		})

		it('should return token from localStorage', () => {
			const testToken = 'test-token-123'
			localStorage.setItem('token', testToken)
			expect(getToken()).toBe(testToken)
		})
	})

	describe('getTokenMeta', () => {
		it('should return empty object when meta not set', () => {
			expect(getTokenMeta()).toEqual({})
		})

		it('should return parsed token metadata', () => {
			const meta = { token_type: 'Bearer', expires_at: 1234567890 }
			localStorage.setItem('token_meta', JSON.stringify(meta))
			expect(getTokenMeta()).toEqual(meta)
		})

		it('should return empty object on invalid JSON', () => {
			localStorage.setItem('token_meta', 'invalid-json')
			expect(getTokenMeta()).toEqual({})
		})
	})

	describe('setAuthTokenFromLoginResponse', () => {
		it('should set token and metadata when expires_in provided', () => {
			jest.setSystemTime(new Date('2026-02-14T10:00:00Z'))

			setAuthTokenFromLoginResponse({
				token: 'new-token',
				token_type: 'Bearer',
				expires_in: 3600 // 1 hour
			})

			expect(getToken()).toBe('new-token')

			const meta = getTokenMeta()
			expect(meta.token_type).toBe('Bearer')
			expect(meta.expires_at).toBe(new Date('2026-02-14T11:00:00Z').getTime())
		})

		it('should set token without expiry when expires_in not provided', () => {
			setAuthTokenFromLoginResponse({
				token: 'new-token',
				token_type: 'Bearer'
			})

			expect(getToken()).toBe('new-token')
			const meta = getTokenMeta()
			expect(meta.expires_at).toBeUndefined()
		})

		it('should set token with default token_type when not provided', () => {
			setAuthTokenFromLoginResponse({
				token: 'new-token'
			})

			expect(getToken()).toBe('new-token')
		})
	})

	describe('isTokenExpired', () => {
		beforeEach(() => {
			jest.setSystemTime(new Date('2026-02-14T10:00:00Z'))
		})

		it('should return false when no expires_at in metadata', () => {
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ token_type: 'Bearer' })
			)
			expect(isTokenExpired()).toBe(false)
		})

		it('should return false when token has not expired', () => {
			const expiresAt = Date.now() + 3600000 // 1 hour from now
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ expires_at: expiresAt })
			)
			expect(isTokenExpired()).toBe(false)
		})

		it('should return true when token has expired', () => {
			const expiresAt = Date.now() - 1000 // 1 second ago
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ expires_at: expiresAt })
			)
			expect(isTokenExpired()).toBe(true)
		})

		it('should return true when token expiration time is now', () => {
			const expiresAt = Date.now()
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ expires_at: expiresAt })
			)
			expect(isTokenExpired()).toBe(true)
		})
	})

	describe('willExpireSoon', () => {
		beforeEach(() => {
			jest.setSystemTime(new Date('2026-02-14T10:00:00Z'))
		})

		it('should return false when no expires_at in metadata', () => {
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ token_type: 'Bearer' })
			)
			expect(willExpireSoon()).toBe(false)
		})

		it('should return false when token expires in more than threshold', () => {
			const expiresAt = Date.now() + 120000 // 2 minutes from now
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ expires_at: expiresAt })
			)
			expect(willExpireSoon(60000)).toBe(false) // 60 sec threshold
		})

		it('should return true when token expires within threshold', () => {
			const expiresAt = Date.now() + 30000 // 30 seconds from now
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ expires_at: expiresAt })
			)
			expect(willExpireSoon(60000)).toBe(true) // 60 sec threshold
		})

		it('should use 60 second default threshold', () => {
			const expiresAt = Date.now() + 30000 // 30 seconds from now
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ expires_at: expiresAt })
			)
			expect(willExpireSoon()).toBe(true)
		})

		it('should return true when token is already expired', () => {
			const expiresAt = Date.now() - 1000
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ expires_at: expiresAt })
			)
			expect(willExpireSoon()).toBe(true)
		})
	})

	describe('isTokenValid', () => {
		beforeEach(() => {
			jest.setSystemTime(new Date('2026-02-14T10:00:00Z'))
		})

		it('should return false when token not set', () => {
			expect(isTokenValid()).toBe(false)
		})

		it('should return false when token exists but no expiry metadata (safety)', () => {
			// Mock console.warn to suppress warning in test output
			const warnSpy = jest.spyOn(console, 'warn').mockImplementation()

			localStorage.setItem('token', 'some-token')
			// No token_meta set - corrupted state

			expect(isTokenValid()).toBe(false)
			expect(warnSpy).toHaveBeenCalledWith(
				expect.stringContaining('metadata is completely missing')
			)

			warnSpy.mockRestore()
		})

		it('should return true when token exists with metadata but no expires_at', () => {
			localStorage.setItem('token', 'some-token')
			// Metadata exists but expires_at is undefined (server didn't provide expires_in)
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ token_type: 'Bearer' })
			)
			expect(isTokenValid()).toBe(true)
		})

		it('should return true when token exists and not expired', () => {
			localStorage.setItem('token', 'some-token')
			const expiresAt = Date.now() + 3600000 // 1 hour from now
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ expires_at: expiresAt })
			)
			expect(isTokenValid()).toBe(true)
		})

		it('should return false when token exists but expired', () => {
			localStorage.setItem('token', 'some-token')
			const expiresAt = Date.now() - 1000 // already expired
			localStorage.setItem(
				'token_meta',
				JSON.stringify({ expires_at: expiresAt })
			)
			expect(isTokenValid()).toBe(false)
		})
	})

	describe('clearAuthToken', () => {
		it('should remove token from localStorage', () => {
			localStorage.setItem('token', 'test-token')
			localStorage.setItem('token_meta', '{"expires_at": 1234}')

			clearAuthToken()

			expect(localStorage.getItem('token')).toBeNull()
			expect(localStorage.getItem('token_meta')).toBeNull()
		})

		it('should not throw when localStorage is empty', () => {
			expect(() => clearAuthToken()).not.toThrow()
		})

		it('should clear token even if meta is missing', () => {
			localStorage.setItem('token', 'test-token')
			clearAuthToken()
			expect(localStorage.getItem('token')).toBeNull()
		})

		it('should clear meta even if token is missing', () => {
			localStorage.setItem('token_meta', '{"expires_at": 1234}')
			clearAuthToken()
			expect(localStorage.getItem('token_meta')).toBeNull()
		})
	})
})
