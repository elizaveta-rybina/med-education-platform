import {
	DropdownTableBlock,
	DropdownTableComponent
} from '@/features/dropdown-table'
import { useCourse } from '@/hooks/useCourse'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
	const { i18n, t } = useTranslation('courseInner')
	const { courseId } = useCourse()
	const [gameTableData, setGameTableData] = useState<DropdownTableBlock | null>(
		null
	)
	const [isTableLoading, setIsTableLoading] = useState(true)
	const [tableLoadError, setTableLoadError] = useState<string | null>(null)
	const [isIframeLoading, setIsIframeLoading] = useState(true)
	const [iframeLoadError, setIframeLoadError] = useState<string | null>(null)

	// Динамическая загрузка данных таблицы
	useEffect(() => {
		const loadTableData = async () => {
			if (!courseId) {
				setTableLoadError(t('courseIdMissing'))
				setIsTableLoading(false)
				return
			}
			try {
				const langSuffix = i18n.language === 'en' ? '.en' : ''
				const module = await import(
					`@/data/semester_one/${courseId}/games/content${langSuffix}.ts`
				)
				const newData: DropdownTableBlock = module.gameTableData
				setGameTableData(newData)
				setIsTableLoading(false)
			} catch (e) {
				console.error('Ошибка загрузки данных таблицы игры:', e)
				setTableLoadError(t('tableLoadError'))
				setIsTableLoading(false)
			}
		}

		loadTableData()
	}, [courseId, i18n.language, t])

	// Обработка сообщений от игры
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

	// Обработка загрузки/ошибки iframe
	const handleIframeLoad = () => {
		setIsIframeLoading(false)
	}

	const handleIframeError = () => {
		setIsIframeLoading(false)
		setIframeLoadError(t('gameLoadError'))
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
				{isIframeLoading && (
					<div className='absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg'>
						<p className='text-gray-600'>{t('loadingGame')}</p>
					</div>
				)}
				{iframeLoadError && (
					<div className='absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg'>
						<p className='text-red-600'>{iframeLoadError}</p>
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

			<div className='mt-6'>
				{isTableLoading && (
					<div className='flex items-center justify-center bg-gray-200 rounded-lg p-4'>
						<p className='text-gray-600'>{t('loadingTable')}</p>
					</div>
				)}
				{tableLoadError && (
					<div className='flex items-center justify-center bg-gray-200 rounded-lg p-4'>
						<p className='text-red-600'>{tableLoadError}</p>
					</div>
				)}
				{gameTableData && !isTableLoading && !tableLoadError && (
					<DropdownTableComponent
						block={gameTableData}
						onComplete={isCorrect => {
							if (isCorrect) onComplete(true)
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default GameBlock
