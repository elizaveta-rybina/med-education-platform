type LoginResponse = {
	token: string
	token_type?: string
	expires_in?: number // seconds
}

const STORAGE_KEY = 'token'
const STORAGE_META_KEY = 'token_meta'

export const getToken = () => localStorage.getItem(STORAGE_KEY) || ''

export const getTokenMeta = () => {
	try {
		const raw = localStorage.getItem(STORAGE_META_KEY)
		return raw
			? (JSON.parse(raw) as { token_type?: string; expires_at?: number })
			: {}
	} catch {
		return {}
	}
}

export const isTokenExpired = () => {
	const meta = getTokenMeta()
	if (!meta.expires_at) return false
	const now = Date.now()
	return now >= meta.expires_at
}

export const willExpireSoon = (thresholdMs = 60_000) => {
	const meta = getTokenMeta()
	if (!meta.expires_at) return false
	return meta.expires_at - Date.now() <= thresholdMs
}

export const setAuthTokenFromLoginResponse = (data: LoginResponse) => {
	const expiresInSec = data.expires_in ?? 0
	const expiresAt = expiresInSec ? Date.now() + expiresInSec * 1000 : undefined
	localStorage.setItem(STORAGE_KEY, data.token)
	localStorage.setItem(
		STORAGE_META_KEY,
		JSON.stringify({ token_type: data.token_type, expires_at: expiresAt })
	)
}

export const clearAuthToken = () => {
	localStorage.removeItem(STORAGE_KEY)
	localStorage.removeItem(STORAGE_META_KEY)
}

/**
 * Check if token exists and is still valid (not expired)
 * @returns true if token is present and valid
 */
export const isTokenValid = (): boolean => {
	const token = getToken()
	if (!token) return false

	// If no expiry metadata, assume token is valid
	const meta = getTokenMeta()
	if (!meta.expires_at) return true

	// Check if not expired
	return !isTokenExpired()
}
