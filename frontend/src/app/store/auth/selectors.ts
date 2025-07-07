import { RootState } from '../mainStore'

export const selectAuth = (state: RootState) => state.auth
export const selectUser = (state: RootState) => state.auth.user
export const selectAuthToken = (state: RootState) => state.auth.authToken
export const selectToken = (state: RootState) =>
	state.auth.authToken?.token || null
export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthError = (state: RootState) => state.auth.error
export const selectRememberedEmail = (state: RootState) =>
	state.auth.rememberedEmail
