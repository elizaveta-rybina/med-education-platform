export interface UserPersonalData {
	last_name: string
	first_name: string
	middle_name?: string
	birth_date: string
}

export interface UserRole {
	id: number
	name: string
	description: string
	created_at: string | null
	updated_at: string | null
	pivot: {
		user_id: number
		role_id: number
		created_at: string
		updated_at: string
	}
}

type EducationInfo = null | {
	university_id?: number
	faculty?: string
	specialization?: string
	course?: number
	group?: string
}

export interface User {
	id: number
	username: string
	email: string
	birth_date: string
	phone_number: string | null
	last_name: string
	first_name: string
	middle_name: string | null
	is_verified: boolean
	created_at: string
	updated_at: string
	education: EducationInfo
	roles: UserRole[]
	registeredCourses: number[]
}

export type AuthMeResponse = User

export interface LoginData {
	email: string
	password: string
}

export interface LoginResponse {
	token: string
	token_type?: string
	expires_at?: string
}

export interface RegisterData {
	email: string
	password: string
	first_name: string
	last_name: string
	middle_name?: string
	birth_date: string
	phone_number?: string
}

export interface AuthResponse {
	message: string
	token: string
}
