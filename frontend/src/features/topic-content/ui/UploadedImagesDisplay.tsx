import { useState } from 'react'

export interface UploadedImage {
	id: number
	url: string
	filename: string
}

interface UploadedImagesDisplayProps {
	images: UploadedImage[]
	onDeleteImage?: (imageId: number) => Promise<void>
	isLoading?: boolean
	message?: string
}

export const UploadedImagesDisplay = ({
	images,
	onDeleteImage,
	isLoading = false,
	message = 'Все изображения успешно загружены и сохранены.'
}: UploadedImagesDisplayProps) => {
	const [deletingImageId, setDeletingImageId] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)

	if (images.length === 0) {
		return null
	}

	const handleDeleteImage = async (imageId: number) => {
		if (!onDeleteImage) {
			return
		}

		setDeletingImageId(imageId)
		setError(null)
		try {
			await onDeleteImage(imageId)
		} catch (e) {
			console.error('Ошибка при удалении изображения:', e)
			setError('Не удалось удалить изображение')
		} finally {
			setDeletingImageId(null)
		}
	}

	return (
		<div>
			<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
				✓ Загруженные изображения ({images.length})
			</label>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
				{images.map(image => (
					<div
						key={image.id}
						className='relative group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:ring-2 hover:ring-green-500 transition-all'
					>
						<img
							src={image.url}
							alt={image.filename}
							className='w-full h-32 object-cover'
							onError={() => {
								console.error(`Не удалось загрузить изображение: ${image.url}`)
							}}
						/>
						<div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center'>
							<div className='text-white text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity px-2'>
								{image.filename}
							</div>
						</div>
						<div className='absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
							<div className='bg-green-500 text-white text-xs px-2 py-1 rounded-full'>
								✓ Сохранено
							</div>
							{onDeleteImage && (
								<button
									onClick={() => handleDeleteImage(image.id)}
									disabled={isLoading || deletingImageId === image.id}
									className='bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-full disabled:opacity-50 transition-colors'
									title='Удалить'
								>
									{deletingImageId === image.id ? '⏳' : '✕'}
								</button>
							)}
						</div>
					</div>
				))}
			</div>
			{error && (
				<p className='text-xs text-red-500 dark:text-red-400 mt-2'>{error}</p>
			)}
			<p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>{message}</p>
		</div>
	)
}
