import type { Quiz } from '@/app/api/quizzes/quizzes.types'
import React from 'react'
import { QuizResults } from './QuizResults'

interface QuizViewProps {
	quiz: Quiz
	showResults: boolean
	userAnswers: Record<number, number[]>
	onSelect: (questionIndex: number, optionIndex: number) => void
	onSubmit: () => void
}

export const QuizView: React.FC<QuizViewProps> = ({
	quiz,
	showResults,
	userAnswers,
	onSelect,
	onSubmit
}) => {
	if (showResults) {
		const total = quiz.questions?.length || 0
		const correct = (quiz.questions || []).reduce((acc, q, idx) => {
			const userAnswer = userAnswers[idx] || []
			const correctIndices = (q.options || [])
				.map((opt, i) => (opt.is_correct ? i : -1))
				.filter(i => i !== -1)
			const isCorrect =
				userAnswer.length === correctIndices.length &&
				userAnswer.every(a => correctIndices.includes(a))
			return acc + (isCorrect ? 1 : 0)
		}, 0)
		return <QuizResults correct={correct} total={total} />
	}

	return (
		<div>
			{(quiz.questions || []).length === 0 ? (
				<div className='text-gray-500'>Вопросы отсутствуют</div>
			) : (
				<div className='space-y-6'>
					{(quiz.questions || []).map((q, idx) => (
						<div key={idx}>
							<div className='font-medium text-lg text-gray-800 dark:text-gray-200 mb-3'>
								Вопрос {idx + 1}: {q.text}
							</div>

							<div className='space-y-2'>
								{(q.options || []).map((opt, oIdx) => {
									const isSelected = (userAnswers[idx] || []).includes(oIdx)
									const questionType = q.question_type

									return (
										<label
											key={oIdx}
											className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
												isSelected
													? 'border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-900/20'
													: 'border-gray-200 dark:border-gray-700 hover:border-fuchsia-300 dark:hover:border-fuchsia-700'
											}`}
										>
											<input
												type={
													questionType === 'single_choice'
														? 'radio'
														: 'checkbox'
												}
												name={`question-${idx}`}
												checked={isSelected}
												onChange={() => onSelect(idx, oIdx)}
												className='w-4 h-4 text-fuchsia-600'
											/>
											<span className='text-gray-700 dark:text-gray-300'>
												{opt.text}
											</span>
										</label>
									)
								})}
							</div>
						</div>
					))}

					<button
						onClick={onSubmit}
						disabled={
							Object.keys(userAnswers).length !== (quiz.questions || []).length
						}
						className='w-full mt-6 px-6 py-3 bg-fuchsia-700 text-white rounded-xl shadow-sm hover:bg-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						Закончить тест
					</button>
				</div>
			)}
		</div>
	)
}
