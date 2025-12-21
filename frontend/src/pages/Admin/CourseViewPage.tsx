import { courseApi } from '@/app/api/course/course.api'
import type {
	Course,
	CourseDetailResponse,
	CourseResponse
} from '@/app/api/course/course.types'
import { modulesApi } from '@/app/api/modules/modules.api'
import type { Module } from '@/app/api/modules/modules.types'
import { ModuleList } from '@/features/course-modules/ui/ModuleList'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type CourseApiResult = CourseResponse | CourseDetailResponse | Course

const normalizeCourseResponse = (
	data: CourseApiResult,
	courseId?: string
): Course | null => {
	const payload = 'course' in data && data.course ? data.course : data
	if (!payload) return null

	const title =
		'title' in payload
			? payload.title
			: 'course_title' in payload
			? payload.course_title
			: undefined

	if (!title) return null

	const description =
		'description' in payload && payload.description
			? payload.description
			: 'course_description' in payload
			? payload.course_description ?? ''
			: ''

	const skills =
		'skills' in payload && Array.isArray(payload.skills) ? payload.skills : []

	const description_modules =
		'description_modules' in payload
			? payload.description_modules ?? ''
			: 'modules_description' in payload
			? payload.modules_description ?? ''
			: ''

	const created_at =
		'created_at' in payload && payload.created_at
			? payload.created_at
			: new Date().toISOString()

	const updated_at =
		'updated_at' in payload && payload.updated_at
			? payload.updated_at
			: created_at

	return {
		id:
			'id' in payload && payload.id !== undefined
				? Number(payload.id)
				: Number(courseId),
		title,
		description,
		skills,
		description_modules,
		created_at,
		updated_at
	}
}

const CourseViewPage = () => {
	const { courseId } = useParams<{ courseId: string }>()
	const navigate = useNavigate()
	const [course, setCourse] = useState<Course | null>(null)
	const [modules, setModules] = useState<Module[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const loadCourse = useCallback(async () => {
		if (!courseId) return
		try {
			setLoading(true)
			setError(null)
			const response = await courseApi.getById(Number(courseId))
			const normalized = normalizeCourseResponse(response, courseId)
			if (!normalized) {
				throw new Error('Некорректные данные курса')
			}

			setCourse(normalized)

			// Load modules
			const loadedModules = await courseApi.getModules(Number(courseId))
			const normalizedModules = (
				Array.isArray(loadedModules) ? loadedModules : []
			).map((m: any) => ({
				id: m.id,
				course_id: m.course_id,
				module_title: m.title || m.module_title,
				module_description: m.description || m.module_description,
				topics_count: m.topics_count,
				order_number: m.order_number,
				created_at: m.created_at,
				updated_at: m.updated_at
			}))
			setModules(normalizedModules)
		} catch {
			setError('Не удалось загрузить курс')
		} finally {
			setLoading(false)
		}
	}, [courseId])

	useEffect(() => {
		void loadCourse()
	}, [loadCourse])

	const handleDeleteModule = async (moduleId: number) => {
		await modulesApi.delete(moduleId)
		setModules(prev => prev.filter(m => m.id !== moduleId))
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
				<div className='text-red-600'>{error ?? 'Курс не найден'}</div>
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
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold text-gray-800 dark:text-white'>
						{course.title}
					</h1>
					<button
						onClick={() => navigate(`/admin/courses/${courseId}/edit`)}
						className='px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2'
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
								d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
							/>
						</svg>
						Редактировать
					</button>
				</div>
			</div>

			<div className='space-y-6'>
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<div className='space-y-4'>
						<div>
							<h2 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
								Описание
							</h2>
							<p className='text-gray-600 dark:text-gray-300 whitespace-pre-wrap'>
								{course.description}
							</p>
						</div>

						{course.skills && course.skills.length > 0 && (
							<div>
								<h2 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
									Навыки
								</h2>
								<div className='flex flex-wrap gap-2'>
									{course.skills.map((skill, idx) => (
										<span
											key={idx}
											className='px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm'
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						)}

						{course.description_modules && (
							<div>
								<h2 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
									О модулях
								</h2>
								<p className='text-gray-600 dark:text-gray-300 whitespace-pre-wrap'>
									{course.description_modules}
								</p>
							</div>
						)}

						<div className='text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700'>
							ID: {course.id}
							{course.created_at && (
								<span>
									{' '}
									| Создано:{' '}
									{new Date(course.created_at).toLocaleDateString('ru-RU')}
								</span>
							)}
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-6'>
						Модули курса
					</h2>

					<ModuleList
						modules={modules}
						onOpen={module => navigate(`/admin/modules/${module.id}`)}
						onEdit={module => {
							navigate(`/admin/courses/${courseId}/edit`, { state: { module } })
						}}
						onDelete={handleDeleteModule}
						isLoading={false}
					/>
				</div>
			</div>
		</div>
	)
}

export default CourseViewPage
