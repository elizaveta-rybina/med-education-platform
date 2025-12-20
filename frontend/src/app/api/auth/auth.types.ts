/**
 * Auth API types
 */

export interface RegisterRequest {
	username: string
	email: string
	password: string
	password_confirmation: string
	birth_date: string
	last_name: string
	first_name: string
	middle_name?: string
	university_id: number
	faculty: string
	specialization: string
	course: number
	group: string
}

export interface LoginRequest {
	email: string
	password: string
}

export interface LoginResponse {
	token: string
	token_type: string
	expires_in: number
}

export interface User {
	id: number
	username: string
	email: string
	first_name: string
	last_name: string
	middle_name?: string
	birth_date: string
	university_id: number
	faculty: string
	specialization: string
	course: number
	group: string
	roles?: string[]
	created_at: string
	updated_at: string
}

export interface RegisterResponse {
	message: string
	user?: User
	token?: string
	token_type?: string
	expires_in?: number
}

export interface MeResponse {
	user: User
}

export interface LogoutResponse {
	message: string
}
