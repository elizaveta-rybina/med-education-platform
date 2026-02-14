/**
 * Token Refresh Queue
 *
 * Prevents race conditions when multiple requests get 401 simultaneously.
 * Ensures only one token refresh operation happens at a time.
 *
 * Problem solved:
 * - Multiple parallel requests receive 401
 * - All try to call refresh() simultaneously
 * - Refresh token is one-time use → all but first fail
 *
 * Solution:
 * - First request creates refresh promise
 * - Subsequent requests wait for same promise
 * - All requests retry with new token after refresh succeeds
 *
 * @module tokenRefreshQueue
 */

/** Cached promise for in-progress refresh operation */
let refreshPromise: Promise<boolean> | null = null

/**
 * Queues a token refresh operation
 *
 * If a refresh is already in progress, waits for it to complete.
 * Otherwise, executes the provided refresh function and caches the promise.
 *
 * @param {() => Promise<void>} refreshFn - Async function that performs token refresh
 * @returns {Promise<boolean>} True if refresh succeeded, false otherwise
 *
 * @example
 * // In axios response interceptor
 * const success = await queueTokenRefresh(async () => {
 *   await authApi.refresh()
 * })
 * if (success) {
 *   return retryRequest(originalConfig)
 * }
 */
export const queueTokenRefresh = async (
	refreshFn: () => Promise<void>
): Promise<boolean> => {
	// If refresh already in progress, wait for same promise
	if (refreshPromise) {
		return refreshPromise
	}

	// Create and cache new refresh promise
	refreshPromise = (async () => {
		try {
			await refreshFn()
			return true
		} catch {
			return false
		} finally {
			refreshPromise = null
		}
	})()

	return refreshPromise
}

/**
 * Clears the cached refresh promise
 * Call this on manual logout to prevent stale refresh attempts
 */
export const clearRefreshQueue = (): void => {
	refreshPromise = null
}
