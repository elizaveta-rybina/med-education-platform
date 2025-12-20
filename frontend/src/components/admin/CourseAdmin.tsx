import { courseApi } from '@/app/api/course/course.api'
import type { Course, CourseCreateRequest } from '@/app/api/course/course.types'
import { useEffect, useState } from 'react'

const emptyForm: CourseCreateRequest = {
	title: '',
	description: '',
	skills: [],
	description_modules: ''
}

export const CourseAdmin = () => {
	const [courses, setCourses] = useState<Course[]>([])
	const [form, setForm] = useState<CourseCreateRequest>(emptyForm)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	const loadCourses = async () => {
		try {
			setLoading(true)
			const data = await courseApi.getAll()
			setCourses(data)
		} catch (err: any) {
			setError(err?.response?.data?.message || 'Не удалось загрузить курсы')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadCourses()
	}, [])

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
		setError(null)
		setSuccess(null)
		try {
			setLoading(true)
			await courseApi.create(form)
			setSuccess('Курс создан')
			setForm(emptyForm)
			await loadCourses()
		} catch (err: any) {
			setError(err?.response?.data?.message || 'Не удалось создать курс')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='p-4 space-y-6'>
			<section className='p-4 border rounded-md shadow-sm bg-white'>
				<h2 className='text-lg font-semibold mb-3'>Создать курс</h2>
				<form className='space-y-3' onSubmit={handleSubmit}>
					<div>
						<label className='block text-sm font-medium'>Название</label>
						<input
							name='title'
							value={form.title}
							onChange={handleChange}
							className='w-full border rounded px-3 py-2'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium'>Описание</label>
						<textarea
							name='description'
							value={form.description}
							onChange={handleChange}
							className='w-full border rounded px-3 py-2'
							rows={3}
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium'>
							Навыки (через запятую)
						</label>
						<input
							name='skills'
							value={form.skills.join(', ')}
							onChange={handleChange}
							className='w-full border rounded px-3 py-2'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium'>
							Описание модулей
						</label>
						<textarea
							name='description_modules'
							value={form.description_modules}
							onChange={handleChange}
							className='w-full border rounded px-3 py-2'
							rows={3}
							required
						/>
					</div>
					<div className='flex items-center gap-3'>
						<button
							type='submit'
							disabled={loading}
							className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60'
						>
							{loading ? 'Сохранение...' : 'Создать курс'}
						</button>
						{error && <span className='text-red-600 text-sm'>{error}</span>}
						{success && (
							<span className='text-green-600 text-sm'>{success}</span>
						)}
					</div>
				</form>
			</section>

			<section className='p-4 border rounded-md shadow-sm bg-white'>
				<h2 className='text-lg font-semibold mb-3'>Существующие курсы</h2>
				{loading && <div>Загрузка...</div>}
				{!loading && courses.length === 0 && (
					<div className='text-sm text-gray-500'>Курсов пока нет</div>
				)}
				<ul className='divide-y'>
					{courses.map(course => (
						<li key={course.id} className='py-3'>
							<div className='flex items-start justify-between'>
								<div>
									<div className='font-medium'>{course.title}</div>
									<div className='text-sm text-gray-600'>
										{course.description}
									</div>
									<div className='text-xs text-gray-500'>
										Навыки: {course.skills.join(', ')}
									</div>
								</div>
								<span className='text-xs text-gray-400'>ID: {course.id}</span>
							</div>
						</li>
					))}
				</ul>
			</section>
		</div>
	)
}
