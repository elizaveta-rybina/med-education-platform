/**
 * Token Storage Utilities
 *
 * Manages authentication tokens in localStorage with expiration tracking.
 * Uses types from auth.validation.ts for consistency.
 *
 * @module authToken
 */

import type { LoginResponse } from './auth.validation'

/** localStorage key for storing the access token */
const STORAGE_KEY = 'token'

/** localStorage key for storing token metadata (type, expiration) */
const STORAGE_META_KEY = 'token_meta'

/**
 * Token metadata stored in localStorage
 */
interface TokenMetadata {
	token_type?: string
	expires_at?: number
}

/**
 * Retrieves the stored authentication token from localStorage
 * @returns {string} The stored token or empty string if not found
 * @example
 * const token = getToken()
 * // Returns: "eyJhbGciOiJIUzI1NiIs..." or ""
 */
export const getToken = (): string => localStorage.getItem(STORAGE_KEY) || ''

/**
 * Retrieves token metadata (type and expiration time) from localStorage
 * Safely parses JSON and returns empty object if parsing fails
 * @returns {TokenMetadata} Token metadata containing optional token_type and expires_at
 * @example
 * const meta = getTokenMeta()
 * // Returns: { token_type: 'Bearer', expires_at: 1707912000000 }
 */
export const getTokenMeta = (): TokenMetadata => {
	try {
		const raw = localStorage.getItem(STORAGE_META_KEY)
		return raw ? (JSON.parse(raw) as TokenMetadata) : {}
	} catch {
		return {}
	}
}

/**
 * Checks if the stored token has expired
 * Returns false if no expiration metadata is available
 * @returns {boolean} True if token has expired, false otherwise or if no expiry info
 * @example
 * if (isTokenExpired()) {
 *   // Token is no longer valid, need to refresh or re-authenticate
 * }
 */
export const isTokenExpired = (): boolean => {
	const meta = getTokenMeta()
	if (!meta.expires_at) return false
	const now = Date.now()
	return now >= meta.expires_at
}

/**
 * Checks if the token will expire within a specified threshold
 * Useful for preemptively refreshing tokens before they expire
 * Returns false if no expiration metadata is available
 * @param {number} [thresholdMs=60000] - Time threshold in milliseconds (default: 60 seconds)
 * @returns {boolean} True if token expires within threshold, false otherwise
 * @example
 * if (willExpireSoon(120000)) {
 *   // Token will expire in less than 2 minutes, refresh it
 *   await authApi.refresh()
 * }
 */
export const willExpireSoon = (thresholdMs = 60_000): boolean => {
	const meta = getTokenMeta()
	if (!meta.expires_at) return false
	return meta.expires_at - Date.now() <= thresholdMs
}

/**
 * Stores the authentication token and its metadata in localStorage
 * Automatically calculates token expiration timestamp based on expires_in
 * @param {LoginResponse} data - Token response from authentication server
 * @returns {void}
 * @example
 * setAuthTokenFromLoginResponse({
 *   token: 'eyJhbGciOiJIUzI1NiIs...',
 *   token_type: 'Bearer',
 *   expires_in: 3600 // 1 hour
 * })
 */
export const setAuthTokenFromLoginResponse = (data: LoginResponse): void => {
	const expiresInSec = data.expires_in ?? 0
	const expiresAt = expiresInSec ? Date.now() + expiresInSec * 1000 : undefined
	localStorage.setItem(STORAGE_KEY, data.token)
	localStorage.setItem(
		STORAGE_META_KEY,
		JSON.stringify({ token_type: data.token_type, expires_at: expiresAt })
	)
}

/**
 * Removes the authentication token and metadata from localStorage
 * Safe to call even if tokens are not set (no-op if already cleared)
 * @returns {void}
 * @example
 * // On logout
 * clearAuthToken()
 * // Token and metadata are now removed from localStorage
 */
export const clearAuthToken = (): void => {
	localStorage.removeItem(STORAGE_KEY)
	localStorage.removeItem(STORAGE_META_KEY)
}

/**
 * Checks if a valid authentication token exists and is not expired
 *
 * Token is considered valid if:
 * - Token exists in localStorage AND
 * - Token metadata exists (was properly stored) AND
 * - Either has no expiration time (server didn't provide expires_in) OR is not expired
 *
 * Safety check: If token exists but metadata is completely missing (corrupted localStorage),
 * logs a warning and considers token invalid. This prevents infinite retry loops.
 *
 * @returns {boolean} True if token is present and valid, false otherwise
 * @example
 * if (isTokenValid()) {
 *   // Can make authenticated requests
 *   const user = await authApi.getMe()
 * } else {
 *   // Need to login/register/refresh
 *   window.location.href = '/login'
 * }
 */
export const isTokenValid = (): boolean => {
	const token = getToken()
	if (!token) return false

	// Check if metadata exists at all
	const metaRaw = localStorage.getItem(STORAGE_META_KEY)
	if (!metaRaw) {
		// Metadata completely missing - corrupted localStorage
		console.warn(
			'[authToken] Token exists but metadata is completely missing. ' +
				'This may indicate corrupted localStorage or token set by old version. ' +
				'Token considered invalid for safety.'
		)
		return false
	}

	const meta = getTokenMeta()

	// If no expires_at in metadata, token has no expiration (server didn't provide expires_in)
	// This is a valid case - treat as permanent token
	if (!meta.expires_at) {
		return true
	}

	// Check if not expired
	return !isTokenExpired()
}
