import type { Lecture } from '@/app/api/lectures/lectures.types'
import type { Quiz } from '@/app/api/quizzes/quizzes.types'
import { useState } from 'react'

export interface ContentItem {
	id: number
	type: 'lecture' | 'quiz'
	title: string
	order_number?: number
	lecture?: Lecture
	quiz?: Quiz
}

interface ContentItemListProps {
	items: ContentItem[]
	onEditLecture: (lecture: Lecture) => void
	onDeleteLecture: (id: number) => Promise<void>
	onEditQuiz?: (quiz: Quiz) => void
	onDeleteQuiz?: (id: number) => Promise<void>
	isLoading?: boolean
}

export const ContentItemList = ({
	items,
	onEditLecture,
	onDeleteLecture,
	onEditQuiz,
	onDeleteQuiz,
	isLoading = false
}: ContentItemListProps) => {
	const [deletingId, setDeletingId] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)

	const handleDelete = async (item: ContentItem) => {
		setDeletingId(item.id)
		setError(null)
		try {
			if (item.type === 'lecture') {
				await onDeleteLecture(item.id)
				return
			}

			if (!onDeleteQuiz) {
				throw new Error('Quiz delete handler is not defined')
			}

			await onDeleteQuiz(item.id)
		} catch {
			setError('Ошибка при удалении элемента')
		} finally {
			setDeletingId(null)
		}
	}

	if (!items || items.length === 0) {
		return (
			<div className='text-center py-8 text-gray-500 dark:text-gray-400'>
				Контента пока нет
			</div>
		)
	}

	return (
		<div className='space-y-3'>
			{error && (
				<div className='p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm'>
					{error}
				</div>
			)}

			<div className='space-y-2'>
				{items.map(item => (
					<div
						key={`${item.type}-${item.id}`}
						className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-start justify-between'
					>
						<div className='flex-1'>
							<div className='flex items-center gap-3'>
								{item.order_number !== undefined && (
									<span className='inline-flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium'>
										{item.order_number}
									</span>
								)}
								{item.type === 'lecture' ? (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-blue-500'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
										/>
									</svg>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-green-500'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
										/>
									</svg>
								)}
								<h4 className='font-semibold text-gray-800 dark:text-white'>
									{item.title}
								</h4>
								<span className='ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'>
									{item.type === 'lecture' ? 'Лекция' : 'Тест'}
								</span>
							</div>
						</div>

						<div className='flex gap-2 ml-4 flex-shrink-0'>
							{item.type === 'lecture' && item.lecture && (
								<button
									onClick={() => onEditLecture(item.lecture!)}
									disabled={isLoading || deletingId === item.id}
									className='p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors disabled:opacity-50'
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
							)}
							{item.type === 'quiz' && item.quiz && onEditQuiz && (
								<button
									onClick={() => onEditQuiz(item.quiz!)}
									disabled={isLoading || deletingId === item.id}
									className='p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors disabled:opacity-50'
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
							)}
							<button
								onClick={() => handleDelete(item)}
								disabled={isLoading || deletingId === item.id}
								className='p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50'
								title='Удалить'
							>
								{deletingId === item.id ? (
									<svg
										className='animate-spin h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										/>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										/>
									</svg>
								) : (
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
								)}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
