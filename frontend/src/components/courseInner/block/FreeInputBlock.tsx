import { FreeInputBlock as FreeInputBlockType } from '@/data/types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface FreeInputBlockProps {
	block: FreeInputBlockType
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
		<div className='max-w-4xl mx-auto p-3 bg-white rounded-lg'>
			{/* Поля для ответов */}
			<div className=''>
				{block.questions.map(question => (
					<div key={question.id} className='mb-6'>
						<h3 className='text-lg font-medium mb-3 text-gray-800'>
							{question.text}
						</h3>
						<textarea
							value={answers[question.id] || ''}
							onChange={e => handleAnswerChange(question.id, e.target.value)}
							className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
							rows={5}
							placeholder={t('enterAnswer')}
							disabled={isSubmitted}
							maxLength={question.maxLength}
						/>
						{question.maxLength && (
							<div className='text-sm text-gray-500 mt-1'>
								{t('characterCount', {
									currentLength: answers[question.id]?.length || 0,
									maxLength: question.maxLength
								})}
							</div>
						)}
					</div>
				))}
			</div>

			{/* Кнопка отправки */}
			<div className='flex justify-end mt-6'>
				<button
					onClick={handleSubmit}
					disabled={isSubmitted}
					className={`px-6 py-3 rounded-lg font-medium ${
						isSubmitted
							? 'bg-gray-300 text-gray-600 cursor-not-allowed'
							: 'bg-purple-600 text-white hover:bg-purple-700'
					} transition-colors`}
				>
					{isSubmitted ? t('answerSubmitted') : t('submitForReview')}
				</button>
			</div>

			{/* Сообщение после отправки */}
			{isSubmitted && (
				<div className='mt-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200'>
					<p className='font-medium'>{block.submissionText}</p>
				</div>
			)}
		</div>
	)
}
