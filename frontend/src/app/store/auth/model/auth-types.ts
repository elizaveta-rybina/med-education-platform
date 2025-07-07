export interface AuthCredentials {
	username: string
	email: string
	password: string
	password_confirmation: string
}

export interface LoginData {
	email: string
	password: string
}

export interface AuthResponse {
	token: string
	message: string
}

export interface LoginResponse {
	token: string
	token_type: 'bearer' | 'basic'
	expires_in: number
}
