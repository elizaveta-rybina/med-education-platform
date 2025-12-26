import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface FreeInputQuestion {
	id: string
	text: string
	maxLength?: number
	placeholder?: string | null
}

export interface FreeInputBlock {
	id: string
	type: 'free-input'
	title: string
	description?: string
	submissionText?: string
	questions: FreeInputQuestion[]
}

interface FreeInputBlockProps {
	block: FreeInputBlock
	onComplete?: (isCompleted: boolean) => void
}

export const FreeInputBlock: React.FC<FreeInputBlockProps> = ({
	block,
	onComplete = () => {}
}) => {
	const { t } = useTranslation('courseInner')
	const [answers, setAnswers] = useState<Record<string, string>>({})
	const [isSubmitted, setIsSubmitted] = useState(false)

	// Ключи для localStorage, привязанные к block.id
	const answersStorageKey = `freeInputBlock_answers_${block.id}`
	const submittedStorageKey = `freeInputBlock_submitted_${block.id}`

	// Загрузка данных из localStorage при монтировании
	useEffect(() => {
		const savedAnswers = localStorage.getItem(answersStorageKey)
		if (savedAnswers) {
			setAnswers(JSON.parse(savedAnswers))
		}

		const savedSubmitted = localStorage.getItem(submittedStorageKey)
		if (savedSubmitted === 'true') {
			setIsSubmitted(true)
		}
	}, [answersStorageKey, submittedStorageKey])

	// Сохранение ответов в localStorage при изменении
	const handleAnswerChange = (questionId: string, value: string) => {
		setAnswers(prev => {
			const updatedAnswers = { ...prev, [questionId]: value }
			localStorage.setItem(answersStorageKey, JSON.stringify(updatedAnswers))
			return updatedAnswers
		})
	}

	// Сохранение состояния отправки
	const handleSubmit = () => {
		setIsSubmitted(true)
		localStorage.setItem(submittedStorageKey, 'true')
		onComplete(false) // Ответ требует проверки преподавателем
	}

	return (
		<div className='w-full'>
			{/* Поля для ответов */}
			<div className='space-y-8'>
				{block.questions.map((question, questionIndex) => (
					<div
						key={question.id}
						className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'
					>
						{/* Номер и текст вопроса */}
						<div className='flex items-start gap-3 mb-4'>
							<span className='flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold'>
								{questionIndex + 1}
							</span>
							<h3 className='text-lg font-semibold text-gray-800 flex-1 pt-0.5'>
								{question.text}
							</h3>
						</div>

						{/* Textarea */}
						<div className='relative'>
							<textarea
								value={answers[question.id] || ''}
								onChange={e => handleAnswerChange(question.id, e.target.value)}
								className='w-full p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all text-gray-700 placeholder-gray-400 resize-none'
								rows={5}
								placeholder={
									question.placeholder ||
									t('enterAnswer') ||
									'Введите ваш ответ...'
								}
								disabled={isSubmitted}
								maxLength={question.maxLength}
								style={{ fontFamily: 'inherit' }}
							/>
						</div>

						{/* Счётчик символов */}
						{question.maxLength && (
							<div className='mt-3 flex items-center justify-between'>
								<span className='text-xs text-gray-500 font-medium'>
									Максимум символов: {question.maxLength}
								</span>
								<span
									className={`text-sm font-semibold ${
										(answers[question.id]?.length || 0) >
										question.maxLength * 0.9
											? 'text-orange-600'
											: 'text-gray-600'
									}`}
								>
									{answers[question.id]?.length || 0} / {question.maxLength}
								</span>
							</div>
						)}
					</div>
				))}
			</div>

			{/* Кнопка отправки */}
			<div className='flex justify-end mt-8'>
				<button
					onClick={handleSubmit}
					disabled={isSubmitted}
					className={`relative px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
						isSubmitted
							? 'bg-gray-300 text-gray-600 cursor-not-allowed'
							: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
					}`}
				>
					<span className='flex items-center gap-2'>
						{isSubmitted ? (
							<>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M5 13l4 4L19 7'
									/>
								</svg>
								{t('answerSubmitted') || 'Ответ отправлен'}
							</>
						) : (
							<>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
									/>
								</svg>
								{t('submitForReview') || 'Отправить на проверку'}
							</>
						)}
					</span>
				</button>
			</div>

			{/* Сообщение после отправки */}
			{isSubmitted && (
				<div className='mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-lg'>
					<div className='flex items-start gap-3'>
						<svg
							className='w-6 h-6 text-green-600 flex-shrink-0 mt-0.5'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path
								fillRule='evenodd'
								d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
								clipRule='evenodd'
							/>
						</svg>
						<div>
							<p className='font-semibold text-green-800'>Успешно!</p>
							<p className='text-sm text-green-700 mt-1'>
								{block.submissionText ||
									'Ваш ответ отправлен на проверку преподавателю.'}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
