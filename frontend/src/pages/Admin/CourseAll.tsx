import { courseApi } from '@/app/api/course/course.api'
import type { Course } from '@/app/api/course/course.types'
import { Modal } from '@/shared/ui/modal'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CourseAll = () => {
	const [courses, setCourses] = useState<Course[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [deletingId, setDeletingId] = useState<number | null>(null)
	const [deleteModal, setDeleteModal] = useState<{
		isOpen: boolean
		course: Course | null
	}>({ isOpen: false, course: null })
	const navigate = useNavigate()

	const loadCourses = useCallback(async () => {
		try {
			setLoading(true)
			setError(null)
			const data = await courseApi.getAll()
			setCourses(data)
		} catch {
			setError('Не удалось загрузить курсы')
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		void loadCourses()
	}, [loadCourses])

	const handleDelete = async () => {
		if (!deleteModal.course) return
		try {
			setDeletingId(deleteModal.course.id)
			setError(null)
			await courseApi.delete(deleteModal.course.id)
			setDeleteModal({ isOpen: false, course: null })
			await loadCourses()
		} catch (err: unknown) {
			const message =
				err &&
				typeof err === 'object' &&
				'message' in err &&
				typeof (err as { message?: unknown }).message === 'string'
					? (err as { message: string }).message
					: 'Не удалось удалить курс'
			setError(message)
		}
		setDeletingId(null)
	}

	return (
		<div className='p-6 max-w-7xl mx-auto'>
			<div className='flex items-center justify-between mb-8'>
				<h1 className='text-3xl font-bold text-gray-800 dark:text-white'>
					Управление курсами
				</h1>
				<button
					onClick={() => navigate('/admin/courses/new')}
					className='flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg'
					title='Добавить курс'
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
			</div>

			{error && (
				<div className='mb-6 p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg'>
					{error}
				</div>
			)}

			{loading && (
				<div className='flex justify-center items-center py-12'>
					<div className='text-gray-600 dark:text-gray-400'>Загрузка...</div>
				</div>
			)}

			{!loading && courses.length === 0 && (
				<div className='text-center py-12'>
					<p className='text-gray-500 dark:text-gray-400 mb-4'>
						Курсов пока нет
					</p>
					<button
						onClick={() => navigate('/admin/courses/new')}
						className='px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'
					>
						Создать первый курс
					</button>
				</div>
			)}

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{courses.map(course => (
					<div
						key={course.id}
						className='bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 relative group cursor-pointer'
						onClick={() => navigate(`/admin/courses/${course.id}`)}
					>
						<div className='absolute top-4 right-4 flex gap-2 z-10'>
							<button
								onClick={e => {
									e.stopPropagation()
									navigate(`/admin/courses/${course.id}/edit`)
								}}
								className='p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors'
								title='Редактировать'
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
							</button>
							<button
								onClick={e => {
									e.stopPropagation()
									setDeleteModal({ isOpen: true, course })
								}}
								className='p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50'
								disabled={deletingId === course.id}
								title='Удалить'
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
										d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
									/>
								</svg>
							</button>
						</div>

						<h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-3 pr-20'>
							{course.title}
						</h3>
						<p className='text-gray-600 dark:text-gray-300 mb-4 line-clamp-3'>
							{course.description}
						</p>
						<div className='flex flex-wrap gap-2 mb-4'>
							{course.skills.map((skill, idx) => (
								<span
									key={idx}
									className='px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full'
								>
									{skill}
								</span>
							))}
						</div>
						<div className='text-xs text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors'>
							ID: {course.id}
						</div>
					</div>
				))}
			</div>

			<Modal
				isOpen={deleteModal.isOpen}
				onClose={() => setDeleteModal({ isOpen: false, course: null })}
				className='max-w-md mx-4'
			>
				<div className='p-6'>
					<h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-4'>
						Подтверждение удаления
					</h3>
					<p className='text-gray-600 dark:text-gray-300 mb-6'>
						Вы уверены, что хотите удалить курс
						<span className='font-semibold'>
							{' "'}
							{deleteModal.course?.title}
							{'"'}
						</span>
						? Это действие нельзя отменить.
					</p>
					<div className='flex gap-3 justify-end'>
						<button
							onClick={() => setDeleteModal({ isOpen: false, course: null })}
							className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
						>
							Отмена
						</button>
						<button
							onClick={handleDelete}
							className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50'
							disabled={Boolean(deletingId)}
						>
							{deletingId ? 'Удаление...' : 'Удалить'}
						</button>
					</div>
				</div>
			</Modal>
		</div>
	)
}
