import type { Lecture } from '@/app/api/lectures/lectures.types'
import type { Quiz } from '@/app/api/quizzes/quizzes.types'
import React from 'react'

interface ResultsButtonProps {
	selectedLecture: Lecture | null | undefined
	quizzes: Quiz[]
	onOpenResults: (quiz: Quiz) => void
}

export const ResultsButton: React.FC<ResultsButtonProps> = ({
	selectedLecture,
	quizzes,
	onOpenResults
}) => {
	if (!selectedLecture) return null
	const matchingQuiz = quizzes.find(
		q => q.title?.toLowerCase() === selectedLecture.title?.toLowerCase()
	)
	const hasSaved =
		matchingQuiz && localStorage.getItem(`quizResults_${matchingQuiz.id}`)
	if (!matchingQuiz || !hasSaved) return null

	return (
		<button
			onClick={() => onOpenResults(matchingQuiz)}
			className='px-4 py-2 bg-blue-200 text-black rounded-xl shadow-sm hover:bg-blue-300'
		>
			Посмотреть результаты теста
		</button>
	)
}
