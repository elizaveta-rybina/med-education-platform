import { sampleDropdownTableBlockRu as gameContentRu } from '@/data/semester_one/13/game-content'
import { sampleDropdownTableBlock as gameContentEn } from '@/data/semester_one/13/game-content.en'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	DropdownTableBlock,
	DropdownTableComponent
} from './DropDownTableComponent'

interface GameBlockProps {
	block: {
		id: string
		type: 'game'
		title?: string
		gameUrl: string
		width?: string
		height?: string
	}
	onComplete?: (isCompleted: boolean) => void
}

export const GameBlock: React.FC<GameBlockProps> = ({
	block,
	onComplete = () => {}
}) => {
	const { i18n } = useTranslation('coursePage')
	const [isLoading, setIsLoading] = useState(true)
	const [loadError, setLoadError] = useState<string | null>(null)

	// Выбор данных таблицы в зависимости от языка
	const gameTableData: DropdownTableBlock =
		i18n.language === 'ru' ? gameContentRu : gameContentEn

	// Handle messages from the game
	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			console.log(
				'Event origin:',
				event.origin,
				'Expected origin:',
				new URL(block.gameUrl).origin
			)
			if (event.origin !== new URL(block.gameUrl).origin) return
			if (event.data === 'GAME_COMPLETED') {
				onComplete(true)
			}
		}

		window.addEventListener('message', handleMessage)
		return () => window.removeEventListener('message', handleMessage)
	}, [block.gameUrl, onComplete])

	// Handle iframe load/error
	const handleIframeLoad = () => {
		setIsLoading(false)
	}

	const handleIframeError = () => {
		setIsLoading(false)
		setLoadError(
			'Не удалось загрузить игру. Пожалуйста, проверьте подключение или попробуйте позже.'
		)
	}

	return (
		<div className='game-block p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-gray-200'>
			{block.title && (
				<h2 className='text-lg sm:text-xl font-bold text-gray-800 mb-4'>
					{block.title}
				</h2>
			)}

			<div
				className='game-container mb-6 w-full max-w-[1200px] mx-auto relative'
				style={{ aspectRatio: '1917 / 1090' }}
			>
				{isLoading && (
					<div className='absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg'>
						<p className='text-gray-600'>Загрузка игры...</p>
					</div>
				)}
				{loadError && (
					<div className='absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg'>
						<p className='text-red-600'>{loadError}</p>
					</div>
				)}
				<iframe
					src={block.gameUrl}
					width='100%'
					height='100%'
					frameBorder='0'
					allow='fullscreen; autoplay'
					className='w-full h-full border rounded-lg'
					title={`Игра: ${block.title || block.id}`}
					onLoad={handleIframeLoad}
					onError={handleIframeError}
				/>
			</div>

			{/* Добавление подписи и таблицы */}
			<div className='mt-6'>
				<DropdownTableComponent // Исправлен компонент на DropDownTableComponent
					block={gameTableData}
					onComplete={isCorrect => {
						if (isCorrect) onComplete(true)
					}}
				/>
			</div>
		</div>
	)
}

export default GameBlock
