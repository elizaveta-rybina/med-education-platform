export interface UniversityInfo {
	university_id: number
	faculty: string
	specialization: string
	course: number
	group: string
}

export type EducationInfo = null | {
	university_id?: number
	faculty?: string
	specialization?: string
	course?: number
	group?: string
}
