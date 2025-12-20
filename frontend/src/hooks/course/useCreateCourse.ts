import { ApiError } from '@/app/api/errorHandler'
import { AppDispatch, RootState } from '@/app/store'
import { Course, CourseRequest } from '@/app/store/courses/model/course-types'
import {
	selectCoursesError,
	selectCoursesStatus
} from '@/app/store/courses/selectors'
import { clearError } from '@/app/store/courses/slice'
import { createCourse } from '@/app/store/courses/thunks'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const useCreateCourse = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const status = useSelector<
		RootState,
		'idle' | 'loading' | 'succeeded' | 'failed'
	>(selectCoursesStatus)
	const error = useSelector<RootState, string | null>(selectCoursesError)
	const [localError, setLocalError] = useState<string | null>(null)

	const create = async (formData: FormData) => {
		setLocalError(null)
		dispatch(clearError())

		try {
			const courseData: CourseRequest = {
				title: formData.get('title') as string,
				description: formData.get('description') as string,
				skills: JSON.parse(formData.get('skills') as string),
				description_modules: formData.get('modules_description') as string
			}

			const result = (await dispatch(
				createCourse(courseData)
			).unwrap()) as Course
			navigate('/admin/courses')
			return result
		} catch (err: unknown) {
			const error = err as ApiError | { message: string }
			if (error.message === 'Unauthorized' || error.message?.includes('401')) {
				localStorage.removeItem('token')
				navigate('/signin')
			} else {
				setLocalError(
					'Ошибка при создании курса. Пожалуйста, попробуйте снова.'
				)
			}
			throw err
		}
	}

	return {
		create,
		isLoading: status === 'loading',
		error: localError || error
	}
}
