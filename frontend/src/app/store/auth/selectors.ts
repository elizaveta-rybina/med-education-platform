import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../mainStore'
import { LoginResponse, User } from './model'
import { AuthState } from './slice'

/**
 * Selects the entire auth state
 */
export const selectAuth = (state: RootState): AuthState => state.auth

/**
 * Selects the authenticated user
 */
export const selectUser = createSelector(
	[selectAuth],
	(auth): User | null => auth.user
)

/**
 * Selects the auth token object
 */
export const selectAuthToken = createSelector(
	[selectAuth],
	(auth): LoginResponse | null => auth.authToken
)

/**
 * Selects the token string or null
 */
export const selectToken = createSelector(
	[selectAuth],
	(auth): string | null => auth.authToken?.token || null
)

/**
 * Selects the auth status
 */
export const selectAuthStatus = createSelector(
	[selectAuth],
	(auth): 'idle' | 'loading' | 'succeeded' | 'failed' => auth.status
)

/**
 * Selects the auth error
 */
export const selectAuthError = createSelector(
	[selectAuth],
	(auth): string | null => auth.error
)

/**
 * Selects the remembered email
 */
export const selectRememberedEmail = createSelector(
	[selectAuth],
	(auth): string | null => auth.rememberedEmail
)
