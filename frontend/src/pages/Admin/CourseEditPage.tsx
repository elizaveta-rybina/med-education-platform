import { courseApi } from '@/app/api/course/course.api'
import type {
	Course,
	CourseDetailResponse,
	CourseResponse,
	CourseUpdateRequest
} from '@/app/api/course/course.types'
import { modulesApi } from '@/app/api/modules/modules.api'
import type { Module } from '@/app/api/modules/modules.types'
import { ModuleForm } from '@/features/course-modules/ui/ModuleForm'
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

const CourseEditPage = () => {
	const { courseId } = useParams<{ courseId: string }>()
	const navigate = useNavigate()
	const [course, setCourse] = useState<Course | null>(null)
	const [modules, setModules] = useState<Module[]>([])
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [editingModule, setEditingModule] = useState<Module | null>(null)
	const [showModuleForm, setShowModuleForm] = useState(false)
	const [moduleFormLoading, setModuleFormLoading] = useState(false)

	const [form, setForm] = useState<CourseUpdateRequest>({
		title: '',
		description: '',
		skills: [],
		description_modules: ''
	})

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
			setForm({
				title: normalized.title,
				description: normalized.description,
				skills: normalized.skills,
				description_modules: normalized.description_modules
			})

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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target

		if (name === 'skills') {
			const skillsList = value
				.split(',')
				.map(skill => skill.trim())
				.filter(Boolean)
			setForm(prev => ({ ...prev, skills: skillsList }))
			return
		}

		setForm(prev => ({ ...prev, [name]: value }))
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
			setTimeout(() => navigate('/admin/courses'), 1200)
		} catch (err: unknown) {
			const message =
				err &&
				typeof err === 'object' &&
				'message' in err &&
				typeof (err as { message?: unknown }).message === 'string'
					? (err as { message: string }).message
					: 'Не удалось обновить курс'
			setError(message)
		} finally {
			setSaving(false)
		}
	}

	const handleAddModule = async (data: {
		module_title: string
		module_description?: string
		order_number: number
	}) => {
		if (!courseId) return
		setModuleFormLoading(true)
		try {
			if (editingModule?.id) {
				await modulesApi.update(editingModule.id, data)
			} else {
				await modulesApi.create(Number(courseId), data)
			}
			// Перезагружаем только список модулей, без общего спиннера страницы
			const loaded = await courseApi.getModules(Number(courseId))
			const normalized = (Array.isArray(loaded) ? loaded : []).map(
				(m: any) => ({
					id: m.id,
					course_id: m.course_id,
					module_title: m.title || m.module_title,
					module_description: m.description || m.module_description,
					topics_count: m.topics_count,
					order_number: m.order_number,
					created_at: m.created_at,
					updated_at: m.updated_at
				})
			)
			setModules(normalized)
			setShowModuleForm(false)
			setEditingModule(null)
		} finally {
			setModuleFormLoading(false)
		}
	}

	const handleDeleteModule = async (moduleId: number) => {
		await modulesApi.delete(moduleId)
		setModules(prev => prev.filter(m => m.id !== moduleId))
	}

	const handleEditModule = (module: Module) => {
		setEditingModule(module)
		setShowModuleForm(true)
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
				<h1 className='text-3xl font-bold text-gray-800 dark:text-white'>
					Редактирование курса
				</h1>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6'>
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

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
				<div className='flex items-center justify-between mb-6'>
					<h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
						Модули курса
					</h2>
					{!showModuleForm && (
						<button
							onClick={() => {
								setEditingModule(null)
								setShowModuleForm(true)
							}}
							className='flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors'
							title='Добавить модуль'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 4v16m8-8H4'
								/>
							</svg>
						</button>
					)}
				</div>

				{showModuleForm && (
					<div className='mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600'>
						<h3 className='font-semibold text-gray-800 dark:text-white mb-4'>
							{editingModule
								? 'Редактирование модуля'
								: 'Добавление нового модуля'}
						</h3>
						<ModuleForm
							module={editingModule}
							defaultOrderNumber={
								editingModule
									? undefined
									: Math.max(0, ...modules.map(m => m.order_number ?? 0)) + 1
							}
							onSubmit={handleAddModule}
							onCancel={() => {
								setShowModuleForm(false)
								setEditingModule(null)
							}}
							isLoading={moduleFormLoading}
						/>
					</div>
				)}

				<ModuleList
					modules={modules}
					onEdit={handleEditModule}
					onDelete={handleDeleteModule}
					isLoading={moduleFormLoading}
				/>
			</div>
		</div>
	)
}

export default CourseEditPage
