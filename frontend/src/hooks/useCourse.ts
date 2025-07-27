import { useContext } from 'react'
import { CourseContext } from '../context/CourseContext'

export const useCourse = () => {
	const context = useContext(CourseContext)
	if (context === undefined) {
		throw new Error('useCourse must be used within a CourseProvider')
	}
	console.log(context)
	return context
}
