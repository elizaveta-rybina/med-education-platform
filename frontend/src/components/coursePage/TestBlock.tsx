// components/TestBlock.tsx
import { QuestionBlock } from '@/data/types'
import { useCourse } from '@/hooks/useCourse'
import { useEffect, useState } from 'react'

interface TestBlockProps {
	block: QuestionBlock
	moduleId: string
	chapterId: string
	questionIndex: number
	totalQuestions: number
	onNext: () => void
	onPrev: () => void
	onComplete: (isCorrect: boolean) => void
}

export const TestBlock = ({
	block,
	moduleId,
	chapterId,
	questionIndex,
	totalQuestions,
	onNext,
	onPrev,
	onComplete
}: TestBlockProps) => {
	const { answerQuestion } = useCourse()
	const [selectedOptions, setSelectedOptions] = useState<string[]>([])
	const [isAnswered, setIsAnswered] = useState(false)
	const [isCorrect, setIsCorrect] = useState(false)

	// Сброс состояния при смене вопроса
	useEffect(() => {
		setSelectedOptions([])
		setIsAnswered(false)
		setIsCorrect(false)
	}, [block.id])

	const handleOptionChange = (optionId: string) => {
		if (isAnswered) return

		setSelectedOptions(prev =>
			prev.includes(optionId)
				? prev.filter(id => id !== optionId)
				: [...prev, optionId]
		)
	}

	const checkAnswers = () => {
		// Все правильные ответы
		const correctAnswers = block.options
			.filter(opt => opt.isCorrect)
			.map(opt => opt.id)

		// Все выбранные ответы
		const userAnswers = selectedOptions

		// Проверяем, что выбраны все правильные и только они
		const correct =
			userAnswers.length === correctAnswers.length &&
			userAnswers.every(answer => correctAnswers.includes(answer))

		return correct
	}

	const handleAnswer = () => {
		if (selectedOptions.length === 0) return

		const correct = checkAnswers()
		setIsCorrect(correct)

		// Отправляем все выбранные ответы
		selectedOptions.forEach(optionId => {
			answerQuestion(moduleId, chapterId, block.id, optionId)
		})

		setIsAnswered(true)
		onComplete(correct)
	}

	const handleNext = () => {
		if (!isAnswered) {
			const correct = checkAnswers()
			setIsCorrect(correct)
			setIsAnswered(true)
			onComplete(correct)
		}
		onNext()
	}

	return (
		<div className='my-6 p-4 bg-gray-50 rounded-lg'>
			<div className='flex justify-between items-center mb-4'>
				<h3 className='font-medium text-lg'>
					Вопрос {questionIndex + 1} из {totalQuestions}
				</h3>
				{isAnswered && (
					<span
						className={`px-3 py-1 rounded-full text-sm ${
							isCorrect
								? 'bg-green-100 text-green-800'
								: 'bg-red-100 text-red-800'
						}`}
					>
						{isCorrect ? 'Правильно' : 'Неправильно'}
					</span>
				)}
			</div>

			<h4 className='font-medium mb-3'>{block.question}</h4>
			<ul className='space-y-2 mb-6'>
				{block.options.map(option => (
					<li key={option.id}>
						<label className='flex items-center'>
							<input
								type='checkbox'
								name={`question-${block.id}`}
								className='mr-2'
								checked={selectedOptions.includes(option.id)}
								onChange={() => handleOptionChange(option.id)}
								disabled={isAnswered}
							/>
							<span
								className={
									isAnswered
										? option.isCorrect
											? 'text-green-600 font-medium'
											: selectedOptions.includes(option.id) && !option.isCorrect
											? 'text-red-600'
											: ''
										: ''
								}
							>
								{option.text}
							</span>
						</label>
					</li>
				))}
			</ul>

			{!isAnswered ? (
				<div className='flex justify-between'>
					{/* <button
            onClick={onPrev}
            disabled={questionIndex === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:opacity-50"
          >
            Назад
          </button> */}
					<button
						onClick={handleAnswer}
						disabled={selectedOptions.length === 0}
						className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition disabled:bg-gray-300'
					>
						Проверить ответ
					</button>
				</div>
			) : (
				<div className='space-y-4'>
					{block.explanation && (
						<div className='p-3 rounded bg-blue-50 text-blue-800'>
							<p className='text-sm'>{block.explanation}</p>
						</div>
					)}
					<div className='flex justify-between'>
						<button
							onClick={onPrev}
							disabled={questionIndex === 0}
							className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:opacity-50'
						>
							Назад
						</button>
						<button
							onClick={handleNext}
							className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition'
						>
							{questionIndex < totalQuestions - 1
								? 'Следующий вопрос'
								: 'Завершить тест'}
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
