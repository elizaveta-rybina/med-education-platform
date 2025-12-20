import { Module } from '@/app/api/modules/modules.types'
import { useState } from 'react'

interface ModuleListProps {
	modules: Module[]
	onEdit: (module: Module) => void
	onDelete: (moduleId: number) => Promise<void>
	isLoading?: boolean
}

export const ModuleList = ({
	modules,
	onEdit,
	onDelete,
	isLoading = false
}: ModuleListProps) => {
	const [deletingId, setDeletingId] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)

	const handleDelete = async (moduleId: number) => {
		setDeletingId(moduleId)
		setError(null)
		try {
			await onDelete(moduleId)
		} catch {
			setError('Ошибка при удалении модуля')
		} finally {
			setDeletingId(null)
		}
	}

	if (modules.length === 0) {
		return (
			<div className='text-center py-8 text-gray-500 dark:text-gray-400'>
				Модулей пока нет
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
				{modules.map(module => (
					<div
						key={module.id}
						className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-start justify-between'
					>
						<div className='flex-1'>
							<div className='flex items-center gap-3'>
								{module.order_number && (
									<span className='inline-flex items-center justify-center w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium'>
										{module.order_number}
									</span>
								)}
								<h4 className='font-semibold text-gray-800 dark:text-white'>
									{module.module_title}
								</h4>
							</div>
							{module.module_description && (
								<p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
									{module.module_description}
								</p>
							)}
							{module.topics_count !== undefined && (
								<p className='text-xs text-gray-500 dark:text-gray-500 mt-2'>
									Тем: {module.topics_count}
								</p>
							)}
						</div>

						<div className='flex gap-2 ml-4 flex-shrink-0'>
							<button
								onClick={() => onEdit(module)}
								disabled={isLoading || deletingId === module.id}
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
							<button
								onClick={() => handleDelete(module.id!)}
								disabled={isLoading || !module.id || deletingId === module.id}
								className='p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50'
								title='Удалить'
							>
								{deletingId === module.id ? (
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
