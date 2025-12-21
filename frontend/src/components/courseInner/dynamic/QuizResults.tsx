import React from 'react'

interface QuizResultsProps {
	correct?: number
	total?: number
}

export const QuizResults: React.FC<QuizResultsProps> = ({
	correct = 0,
	total = 0
}) => {
	const percent = total > 0 ? Math.round((correct / total) * 100) : 0
	return (
		<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6'>
			<h3 className='text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2'>
				Результаты теста
			</h3>
			<p className='text-blue-800 dark:text-blue-200 text-lg'>
				Правильных ответов: {correct} из {total}
			</p>
			<p className='text-blue-700 dark:text-blue-300 mt-1'>
				Процент: {percent}%
			</p>
		</div>
	)
}
