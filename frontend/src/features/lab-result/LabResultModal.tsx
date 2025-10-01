import React, { JSX, useState } from 'react'
import { createPortal } from 'react-dom'
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

	const percentageCorrect =
		totalAnswers > 0
			? ((correctAnswers / totalAnswers) * 100).toFixed(2)
			: '0.00'

	const handleRestart = () => {
		localStorage.removeItem('ddtAnswers')
		localStorage.removeItem('dndResults')
		localStorage.removeItem('testResults')
		localStorage.removeItem('freeInputBlock_answers_clinical-case-1-1')
		localStorage.removeItem('freeInputBlock_submitted_clinical-case-1-1')
		resetReadStatus()
		onRestart()
		setIsModalOpen(false)
	}

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsModalOpen(false)
		}
	}

	const modalContent = isModalOpen ? (
		<div
			id='lab-result-modal'
			tabIndex={-1}
			aria-hidden='true'
			className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/30 backdrop-blur-sm transition'
			onClick={handleBackdropClick}
		>
			<div className='relative w-full max-w-md mx-4 animate-fadeIn'>
				<div className='relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden'>
					<div className='flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
							{t('lab_modal.yourResults')}
						</h3>
						<button
							type='button'
							className='text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition'
							onClick={() => setIsModalOpen(false)}
						>
							✕
						</button>
					</div>

					<div className='px-6 py-5 space-y-4 text-left'>
						<div className='space-y-2'>
							<p className='text-sm text-gray-700 dark:text-gray-200'>
								{t('lab_modal.correctAnswers')}:{' '}
								<span className='font-semibold'>{correctAnswers}</span>
							</p>
							<p className='text-sm text-gray-700 dark:text-gray-200'>
								{t('lab_modal.totalAnswers')}:{' '}
								<span className='font-semibold'>{totalAnswers}</span>
							</p>
							<p className='text-sm text-gray-700 dark:text-gray-200'>
								{t('lab_modal.percentageCorrect', {
									percentage: percentageCorrect
								})}
							</p>
						</div>

						<div className='flex gap-3 pt-3'>
							<button
								type='button'
								onClick={() => setIsModalOpen(false)}
								className='px-5 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition'
							>
								{t('lab_modal.close')}
							</button>
							<button
								type='button'
								onClick={handleRestart}
								className='px-5 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 transition'
							>
								{t('lab_modal.restart')}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : null

	return (
		<>
			<div
				onClick={() => isAllRead && setIsModalOpen(true)}
				className={isAllRead ? '' : 'opacity-50 cursor-not-allowed'}
			>
				{triggerButton}
			</div>
			{modalContent && createPortal(modalContent, document.body)}
		</>
	)
}
