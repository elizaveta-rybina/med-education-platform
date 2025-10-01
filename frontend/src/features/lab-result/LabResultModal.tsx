import React, { JSX, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCheckAllRead } from './model/useCheckAllRead'
import { useResults } from './model/useResults'

interface LabResultModalProps {
	triggerButton: JSX.Element
	onRestart?: () => void
}

export const LabResultModal: React.FC<LabResultModalProps> = ({
	triggerButton,
	onRestart = () => {}
}) => {
	const { t } = useTranslation('courseInner')
	const { isAllRead, resetReadStatus } = useCheckAllRead()
	const { correctAnswers, totalAnswers } = useResults()
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Рассчитываем процент правильных ответов
	const percentageCorrect =
		totalAnswers > 0
			? ((correctAnswers / totalAnswers) * 100).toFixed(2)
			: '0.00'

	// Обработчик для кнопки "Начать заново"
	const handleRestart = () => {
		localStorage.removeItem('ddtAnswers')
		localStorage.removeItem('dndResults')
		localStorage.removeItem('testResults')
		resetReadStatus() // Сбрасываем chapterReadStatus
		onRestart()
		setIsModalOpen(false)
	}

	return (
		<>
			<div
				onClick={() => isAllRead && setIsModalOpen(true)}
				className={isAllRead ? '' : 'opacity-50 cursor-not-allowed'}
			>
				{triggerButton}
			</div>

			{isModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-md p-6 max-w-md w-full'>
						<h3 className='text-lg font-semibold text-gray-800 mb-4'>
							{t('yourResults')}
						</h3>
						<p className='text-gray-700 mb-6'>
							{t('percentageCorrect', { percentage: percentageCorrect })}
						</p>
						<div className='flex gap-3'>
							<button
								onClick={() => setIsModalOpen(false)}
								className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition'
							>
								{t('close')}
							</button>
							<button
								onClick={handleRestart}
								className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
							>
								{t('restart')}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
