import { AuthCredentials } from './auth-types'
import { UniversityInfo } from './education-types'
import { UserPersonalData } from './user-types'

export interface RegisterData
	extends AuthCredentials,
		UserPersonalData,
		UniversityInfo {}

export type UserProfile = Omit<
	RegisterData,
	'password' | 'password_confirmation'
> & {
	id?: number
	created_at?: string
}
