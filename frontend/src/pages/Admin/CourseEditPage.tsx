import { courseApi } from '@/app/api/course/course.api'
import type { Course, CourseUpdateRequest } from '@/app/api/course/course.types'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CourseEditPage = () => {
	const { courseId } = useParams<{ courseId: string }>()
	const navigate = useNavigate()
	const [course, setCourse] = useState<Course | null>(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	const [form, setForm] = useState<CourseUpdateRequest>({
		title: '',
		description: '',
		skills: [],
		description_modules: ''
	})

	useEffect(() => {
		const loadCourse = async () => {
			if (!courseId) return
			try {
				setLoading(true)
				const response = await courseApi.getById(Number(courseId))

				// Проверяем если это объект с полем 'course'
				if (response && 'course' in response && response.course) {
					courseData = response.course
				} else if (response && 'course_title' in response) {
					// Новый формат API - преобразуем в привычный формат
					courseData = {
						id: courseId,
						title: response.course_title,
						description: response.course_description,
						skills: response.skills || [],
						description_modules: response.description_modules || '',
						modules: response.modules,
						created_at: response.created_at || new Date().toISOString(),
						updated_at: response.updated_at || new Date().toISOString()
					}
				} else if (response && 'title' in response) {
					// Стандартный формат
					courseData = response
				} else {
					// Сам ответ - это данные курса
					courseData = response
				}

				if (!courseData || (!courseData.title && !courseData.course_title)) {
					throw new Error('Некорректные данные курса')
				}

				const title = courseData.title || courseData.course_title
				const description =
					courseData.description || courseData.course_description
				const skills = courseData.skills || []
				const description_modules = courseData.description_modules || ''

				setCourse(courseData)
				setForm({
					title,
					description,
					skills,
					description_modules
				})
			} catch (err: any) {
				setError('Не удалось загрузить курс')
			} finally {
				setLoading(false)
			}
		}
		loadCourse()
	}, [courseId])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		if (name === 'skills') {
			setForm(prev => ({
				...prev,
				skills: value.split(',').map(v => v.trim())
			}))
		} else {
			setForm(prev => ({ ...prev, [name]: value }))
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!courseId) return

		setError(null)
		setSuccess(null)
		try {
			setSaving(true)
			await courseApi.update(Number(courseId), form)
			setSuccess('Курс успешно обновлен')
			setTimeout(() => {
				navigate('/admin/courses')
			}, 1500)
		} catch (err: any) {
			setError(err?.response?.data?.message || 'Не удалось обновить курс')
		} finally {
			setSaving(false)
		}
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-gray-600 dark:text-gray-400'>Загрузка...</div>
			</div>
		)
	}

	if (!course) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-red-600'>Курс не найден</div>
			</div>
		)
	}

	return (
		<div className='p-6 max-w-4xl mx-auto'>
			<div className='mb-8'>
				<button
					onClick={() => navigate('/admin/courses')}
					className='text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 flex items-center gap-2 mb-4'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 19l-7-7 7-7'
						/>
					</svg>
					Назад к списку курсов
				</button>
				<h1 className='text-3xl font-bold text-gray-800 dark:text-white'>
					Редактирование курса
				</h1>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							Название курса
						</label>
						<input
							name='title'
							value={form.title}
							onChange={handleChange}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							Описание
						</label>
						<textarea
							name='description'
							value={form.description}
							onChange={handleChange}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							rows={4}
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							Навыки (через запятую)
						</label>
						<input
							name='skills'
							value={form.skills?.join(', ') || ''}
							onChange={handleChange}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							placeholder='Например: JavaScript, React, TypeScript'
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							Описание модулей
						</label>
						<textarea
							name='description_modules'
							value={form.description_modules}
							onChange={handleChange}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
							rows={4}
							required
						/>
					</div>

					{error && (
						<div className='p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg'>
							{error}
						</div>
					)}

					{success && (
						<div className='p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 rounded-lg'>
							{success}
						</div>
					)}

					<div className='flex gap-4 justify-end'>
						<button
							type='button'
							onClick={() => navigate('/admin/courses')}
							className='px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
						>
							Отмена
						</button>
						<button
							type='submit'
							disabled={saving}
							className='px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50'
						>
							{saving ? 'Сохранение...' : 'Сохранить изменения'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CourseEditPage
