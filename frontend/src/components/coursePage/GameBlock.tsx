import React, { useState } from 'react'

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
	const [inputValue, setInputValue] = useState('')
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [loadError, setLoadError] = useState<string | null>(null)

	// Handle messages from the game
	React.useEffect(() => {
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

	// Handle input submission
	const handleSubmit = () => {
		if (inputValue.trim()) {
			setIsSubmitted(true)
			onComplete(true)
		}
	}

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

	// Handle manual completion
	const handleManualComplete = () => {
		onComplete(true)
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

			<div className='game-instructions bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-6'>
				<p className='font-medium mb-1'>Управление игрой:</p>
				<p>Используйте мышку и клавиатуру для взаимодействия с игрой.</p>
			</div>

			<div className='game-explanation'>
				<h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-2'>
					Опишите ваш интерактивный опыт
				</h3>
				<textarea
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					disabled={isSubmitted}
					placeholder='Опишите, что вы узнали о гипоксии и как интерактивный опыт помог вам понять гипоксию (200-300 слов)'
					className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed'
					rows={6}
					maxLength={1000}
				/>
				{!isSubmitted && (
					<div className='flex gap-3 mt-3'>
						<button
							onClick={handleSubmit}
							disabled={!inputValue.trim()}
							className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
						>
							Отправить
						</button>
						{loadError && (
							<button
								onClick={handleManualComplete}
								className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200'
							>
								Завершить игру
							</button>
						)}
					</div>
				)}
				{isSubmitted && (
					<p className='mt-2 text-sm text-green-500'>Ответ отправлен</p>
				)}
			</div>
		</div>
	)
}
