import { Module } from '@/app/api/modules/modules.types'
import { useState } from 'react'

interface ModuleFormProps {
	module?: Module | null
	defaultOrderNumber?: number
	onSubmit: (data: {
		module_title: string
		module_description?: string
		order_number: number
	}) => Promise<void>
	onCancel: () => void
	isLoading?: boolean
}

export const ModuleForm = ({
	module,
	defaultOrderNumber,
	onSubmit,
	onCancel,
	isLoading = false
}: ModuleFormProps) => {
	const [title, setTitle] = useState(module?.module_title ?? '')
	const [description, setDescription] = useState(
		module?.module_description ?? ''
	)
	const [orderNumber, setOrderNumber] = useState(
		module?.order_number?.toString() ??
			(defaultOrderNumber ? String(defaultOrderNumber) : '')
	)
	const [error, setError] = useState<string | null>(null)
	const [saving, setSaving] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!title.trim()) {
			setError('Название модуля обязательно')
			return
		}
		if (!orderNumber || Number.isNaN(parseInt(orderNumber, 10))) {
			setError('Поле "Порядок" обязательно')
			return
		}

		setError(null)
		setSaving(true)
		try {
			await onSubmit({
				module_title: title.trim(),
				module_description: description.trim() || undefined,
				order_number: parseInt(orderNumber, 10)
			})
		} catch {
			setError('Ошибка при сохранении модуля')
		} finally {
			setSaving(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
					Название модуля *
				</label>
				<input
					type='text'
					value={title}
					onChange={e => setTitle(e.target.value)}
					disabled={isLoading || saving}
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					placeholder='Введите название модуля'
					required
				/>
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
					Описание
				</label>
				<textarea
					value={description}
					onChange={e => setDescription(e.target.value)}
					disabled={isLoading || saving}
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					placeholder='Введите описание модуля'
					rows={3}
				/>
			</div>

			<div>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
					Порядок
				</label>
				<input
					type='number'
					value={orderNumber}
					onChange={e => setOrderNumber(e.target.value)}
					disabled={isLoading || saving}
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50'
					placeholder='Введите номер порядка'
					min='1'
					required
				/>
			</div>

			{error && (
				<div className='p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm'>
					{error}
				</div>
			)}

			<div className='flex gap-3 justify-end pt-4'>
				<button
					type='button'
					onClick={onCancel}
					disabled={isLoading || saving}
					className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50'
				>
					Отмена
				</button>
				<button
					type='submit'
					disabled={isLoading || saving}
					className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50'
				>
					{saving ? 'Сохранение...' : module ? 'Обновить' : 'Добавить'}
				</button>
			</div>
		</form>
	)
}
