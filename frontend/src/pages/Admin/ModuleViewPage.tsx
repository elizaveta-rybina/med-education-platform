import { modulesApi } from '@/app/api/modules/modules.api'
import type { Module } from '@/app/api/modules/modules.types'
import { topicsApi } from '@/app/api/topics/topics.api'
import type { Topic } from '@/app/api/topics/topics.types'
import { TopicForm } from '@/features/module-topics/ui/TopicForm'
import { TopicList } from '@/features/module-topics/ui/TopicList'
import { Modal } from '@/shared/ui/modal'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const normalizeModule = (data: any, moduleId: number): Module => ({
	id: moduleId,
	module_title: data.module_title || data.title || '',
	module_description: data.module_description || data.description || '',
	topics_count: data.topics_count,
	topics: Array.isArray(data.topics)
		? data.topics.map((t: any) => ({ title: t.title }))
		: undefined
})

const ModuleViewPage = () => {
	const { moduleId } = useParams<{ moduleId: string }>()
	const navigate = useNavigate()
	const [module, setModule] = useState<Module | null>(null)
	const [topics, setTopics] = useState<Topic[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [deletingTopicId, setDeletingTopicId] = useState<number | null>(null)

	const loadAll = useCallback(async () => {
		if (!moduleId) return
		try {
			setLoading(true)
			setError(null)
			const moduleRaw = await modulesApi.getById(Number(moduleId))
			const normalized = normalizeModule(moduleRaw as any, Number(moduleId))
			setModule(normalized)

			const topicsList = await topicsApi.getByModule(Number(moduleId))
			const normalizedTopics = (
				Array.isArray(topicsList) ? topicsList : []
			).map((t: any) => ({
				id: t.id,
				module_id: t.module_id,
				title: t.title,
				description: t.description,
				order_number: t.order_number,
				is_published: t.is_published,
				created_at: t.created_at,
				updated_at: t.updated_at
			}))
			setTopics(normalizedTopics)
		} catch (e) {
			setError('Не удалось загрузить модуль')
		} finally {
			setLoading(false)
		}
	}, [moduleId])

	useEffect(() => {
		void loadAll()
	}, [loadAll])

	const nextOrder = useMemo(
		() =>
			topics.length > 0
				? Math.max(...topics.map(t => t.order_number ?? 0)) + 1
				: 1,
		[topics]
	)

	const [showTopicForm, setShowTopicForm] = useState(false)
	const [editingTopic, setEditingTopic] = useState<Topic | null>(null)
	const [saving, setSaving] = useState(false)

	const handleSaveTopic = async (values: {
		title: string
		description?: string
		order_number: number
		is_published?: boolean
		cover_image?: File
	}) => {
		console.log('handleSaveTopic called with values:', {
			...values,
			cover_image: values.cover_image ? 'File present' : 'No file'
		})
		if (!moduleId) return
		setSaving(true)
		try {
			if (editingTopic?.id) {
				console.log('Updating existing topic:', editingTopic.id)
				await topicsApi.update(editingTopic.id, {
					title: values.title,
					description: values.description,
					order_number: values.order_number,
					is_published: values.is_published
				})
				console.log('Topic updated successfully')

				// Загружаем обложку если выбрана
				if (values.cover_image) {
					console.log(
						'Uploading cover for topic:',
						editingTopic.id,
						values.cover_image
					)
					const uploadResult = await topicsApi.uploadCover(
						editingTopic.id,
						values.cover_image
					)
					console.log('Cover upload result:', uploadResult)
				} else {
					console.log('No cover image to upload')
				}
			} else {
				const createResult = await topicsApi.bulkCreate({
					module_id: Number(moduleId),
					topics: [
						{
							title: values.title,
							description: values.description,
							order_number: values.order_number,
							is_published: values.is_published
						}
					]
				})
				// Получаем ID созданной темы
				const createdTopic = (createResult as any).data?.[0]
				if (createdTopic?.id && values.cover_image) {
					console.log('Uploading cover for new topic:', createdTopic.id)
					const uploadResult = await topicsApi.uploadCover(
						createdTopic.id,
						values.cover_image
					)
					console.log('Cover upload result:', uploadResult)
				}
			}

			// Небольшая задержка чтобы backend успел обработать файл
			await new Promise(resolve => setTimeout(resolve, 500))

			// reload list only
			const topicsList = await topicsApi.getByModule(Number(moduleId))
			console.log('Raw topicsList from API:', topicsList)
			const normalized = (Array.isArray(topicsList) ? topicsList : []).map(
				(t: any) => {
					console.log('Processing topic:', t)
					return {
						id: t.id,
						module_id: t.module_id,
						title: t.title,
						description: t.description,
						order_number: t.order_number,
						is_published: t.is_published,
						cover_image: t.cover_image,
						created_at: t.created_at,
						updated_at: t.updated_at
					}
				}
			)
			console.log('Loaded topics with covers:', normalized)
			setTopics(normalized)
			setShowTopicForm(false)
			setEditingTopic(null)
		} catch (err) {
			console.error('Error in handleSaveTopic:', err)
			throw err
		} finally {
			setSaving(false)
		}
	}

	const handleDeleteTopic = async (topicId: number) => {
		setDeletingTopicId(topicId)
		setShowDeleteModal(true)
	}

	const confirmDeleteTopic = async () => {
		if (!deletingTopicId) return
		try {
			await topicsApi.delete(deletingTopicId)
			setTopics(prev => prev.filter(t => t.id !== deletingTopicId))
			setShowDeleteModal(false)
			setDeletingTopicId(null)
		} catch (e) {
			setError('Ошибка при удалении темы')
		}
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-gray-600 dark:text-gray-400'>Загрузка...</div>
			</div>
		)
	}

	if (!module) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-red-600'>{error ?? 'Модуль не найден'}</div>
			</div>
		)
	}

	return (
		<div className='p-6 max-w-4xl mx-auto'>
			<div className='mb-8'>
				<button
					onClick={() => navigate(-1)}
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
					Назад
				</button>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold text-gray-800 dark:text-white'>
						{module.module_title}
					</h1>
				</div>
			</div>

			<div className='space-y-6'>
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					{module.module_description ? (
						<p className='text-gray-600 dark:text-gray-300 whitespace-pre-wrap'>
							{module.module_description}
						</p>
					) : (
						<p className='text-gray-400'>Описание не указано</p>
					)}
				</div>

				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
							Темы модуля
						</h2>
						{!showTopicForm && (
							<button
								onClick={() => {
									setEditingTopic(null)
									setShowTopicForm(true)
								}}
								className='flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors'
								title='Добавить тему'
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

					{showTopicForm && (
						<div className='mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600'>
							<h3 className='font-semibold text-gray-800 dark:text-white mb-4'>
								{editingTopic ? 'Редактирование темы' : 'Добавление новой темы'}
							</h3>
							<TopicForm
								initialValues={
									editingTopic
										? {
												title: editingTopic.title,
												description: editingTopic.description ?? undefined,
												order_number: editingTopic.order_number,
												is_published: !!editingTopic.is_published,
												existing_cover_url:
													editingTopic.cover_image ?? undefined
										  }
										: undefined
								}
								defaultOrderNumber={editingTopic ? undefined : nextOrder}
								isLoading={saving}
								onSubmit={handleSaveTopic}
								onCancel={() => {
									setShowTopicForm(false)
									setEditingTopic(null)
								}}
							/>
						</div>
					)}

					<TopicList
						topics={topics}
						onOpen={t => navigate(`/admin/topics/${t.id}`)}
						onEdit={t => {
							// Ищем актуальную тему из состояния по ID
							const actualTopic = topics.find(topic => topic.id === t.id)
							console.log('Editing topic:', actualTopic)
							setEditingTopic(actualTopic || t)
							setShowTopicForm(true)
						}}
						onDelete={handleDeleteTopic}
						isLoading={saving}
					/>
				</div>

				{/* Модальное окно подтверждения удаления */}
				<Modal
					isOpen={showDeleteModal}
					onClose={() => {
						setShowDeleteModal(false)
						setDeletingTopicId(null)
					}}
					showCloseButton={true}
					className='max-w-sm mx-4'
				>
					<div className='p-6'>
						<h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>
							Удалить тему?
						</h3>
						<p className='text-gray-600 dark:text-gray-300 mb-6'>
							Вы уверены, что хотите удалить выбранную тему? Это действие нельзя
							отменить.
						</p>
						<div className='flex gap-3 justify-end'>
							<button
								onClick={() => {
									setShowDeleteModal(false)
									setDeletingTopicId(null)
								}}
								className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
							>
								Отмена
							</button>
							<button
								onClick={confirmDeleteTopic}
								className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
							>
								Удалить
							</button>
						</div>
					</div>
				</Modal>
			</div>
		</div>
	)
}

export default ModuleViewPage
