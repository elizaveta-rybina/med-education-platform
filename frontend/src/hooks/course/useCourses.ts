import { ApiError } from '@/app/api/errorHandler'
import { AppDispatch, RootState } from '@/app/store'
import { Course } from '@/app/store/courses/model/course-types'
import {
	selectCourses,
	selectCoursesError,
	selectCoursesStatus
} from '@/app/store/courses/selectors'
import { clearError } from '@/app/store/courses/slice'
import { deleteCourse, fetchCourses } from '@/app/store/courses/thunks'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const useCourses = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const courses = useSelector<RootState, Course[]>(selectCourses)
	const status = useSelector<
		RootState,
		'idle' | 'loading' | 'succeeded' | 'failed'
	>(selectCoursesStatus)
	const error = useSelector<RootState, string | null>(selectCoursesError)
	const [localError, setLocalError] = useState<string | null>(null)

	useEffect(() => {
		const loadCourses = async () => {
			setLocalError(null)
			dispatch(clearError())
			//console.log('Fetching courses, token:', localStorage.getItem('token'))
			try {
				await dispatch(fetchCourses()).unwrap()
				//console.log('Courses fetched successfully:', courses)
			} catch (err: unknown) {
				const error = err as ApiError | { message: string }
				console.error('Failed to fetch courses:', error)
				if (
					error.message === 'Unauthorized' ||
					error.message?.includes('401')
				) {
					console.log('Unauthorized error detected, redirecting to /signin')
					localStorage.removeItem('token')
					navigate('/signin')
				} else {
					setLocalError(
						'Ошибка при загрузке курсов. Пожалуйста, попробуйте снова.'
					)
				}
			}
		}

		if (status === 'idle') {
			loadCourses()
		}
	}, [dispatch, navigate, status])

	const removeCourse = async (courseId: number) => {
		setLocalError(null)
		dispatch(clearError())
		console.log(
			`Deleting course with ID: ${courseId}, token:`,
			localStorage.getItem('token')
		)
		try {
			await dispatch(deleteCourse(courseId)).unwrap()
			//console.log(`Course ${courseId} deleted successfully`)
		} catch (err: unknown) {
			const error = err as ApiError | { message: string }
			console.error('Failed to delete course:', error)
			if (error.message === 'Unauthorized' || error.message?.includes('401')) {
				//console.log('Unauthorized error detected, redirecting to /signin')
				localStorage.removeItem('token')
				navigate('/signin')
			} else {
				setLocalError(
					'Ошибка при удалении курса. Пожалуйста, попробуйте снова.'
				)
			}
			throw err
		}
	}

	return {
		courses,
		isLoading: status === 'loading',
		error: localError || error,
		removeCourse
	}
}
