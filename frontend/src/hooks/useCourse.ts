import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CourseContext } from '../context/CourseContext'

export const useCourse = () => {
	const context = useContext(CourseContext)
	const { i18n } = useTranslation()

	if (context === undefined) {
		throw new Error('useCourse must be used within a CourseProvider')
	}

	return context
}
