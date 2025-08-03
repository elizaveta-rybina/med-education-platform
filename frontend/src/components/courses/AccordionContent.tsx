import React from 'react'
import { useTranslation } from 'react-i18next'

type Topic = {
	title: string
	duration: string
	completed: boolean
}

type AccordionContentProps = {
	description: string
	topics: Topic[]
	hasFinalTest: boolean
	totalTopics: number
	completedTopics: number
	moduleNumber: string
	isUserRegistered: boolean
}

const AccordionContent: React.FC<AccordionContentProps> = ({
	description,
	topics,
	hasFinalTest,
	totalTopics,
	completedTopics,
	isUserRegistered,
}) => {
	const { t } = useTranslation('coursePage')

	return (
		<div className='pl-8 sm:pl-11 pb-3 sm:pb-4'>
			{/* Описание модуля */}
			<div className='mb-4 sm:mb-6'>
				<p className='text-sm sm:text-base text-gray-700 mb-2'>{description}</p>
				<p className='text-xs sm:text-sm text-gray-500'>
					{t('moduleTopics', {
						totalTopics,
						topicWord: t(`topicWord.${getTopicWord(totalTopics)}`),
					})}
				</p>
			</div>

			{/* Прогресс */}
			{isUserRegistered && (
				<div className='mb-4 sm:mb-6'>
					<div className='flex items-center justify-between mb-1'>
						<span className='text-xs sm:text-sm font-medium text-gray-700'>
							{t('moduleProgress')}
						</span>
						<span className='text-xs sm:text-sm text-gray-500'>
							{t('completed', { completedTopics, totalTopics })}
						</span>
					</div>
					<div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2'>
						<div
							className='bg-pink-600 h-1.5 sm:h-2 rounded-full'
							style={{ width: `${(completedTopics / totalTopics) * 100}%` }}
						></div>
					</div>
				</div>
			)}

			{/* Темы модуля */}
			<div className='space-y-2 sm:space-y-3 mb-3 sm:mb-4'>
				{topics.map((topic, index) => (
					<div key={index} className='flex items-start'>
						{isUserRegistered ? (
							<input
								type='checkbox'
								checked={topic.completed}
								className='mt-0.5 sm:mt-1 mr-2 sm:mr-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500'
								readOnly
							/>
						) : (
							<div className='mt-0.5 sm:mt-1 mr-2 sm:mr-3 h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center'>
								<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-300'></div>
							</div>
						)}
						<div>
							<p
								className={`text-sm sm:text-base text-gray-800 ${
									topic.completed ? 'opacity-75' : ''
								}`}
							>
								{topic.title}
							</p>
							<p className='text-xs sm:text-sm text-gray-500'>
								{topic.duration}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Итоговый тест */}
			{hasFinalTest && (
				<div className='mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200'>
					<div className='flex items-start'>
						{isUserRegistered ? (
							<input
								type='checkbox'
								checked={completedTopics === totalTopics}
								disabled={completedTopics !== totalTopics}
								className='mt-0.5 sm:mt-1 mr-2 sm:mr-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500'
								readOnly
							/>
						) : (
							<div className='mt-0.5 sm:mt-1 mr-2 sm:mr-3 h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center'>
								<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-300'></div>
							</div>
						)}
						<div>
							<p
								className={`text-sm sm:text-base font-medium text-gray-800 ${
									completedTopics === totalTopics ? '' : 'opacity-50'
								}`}
							>
								{t('finalTest')}
							</p>
							<p className='text-xs sm:text-sm text-gray-500'>
								{completedTopics === totalTopics
									? t('testAvailable')
									: t('testLocked', { totalTopics })}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

function getTopicWord(count: number): string {
	const lastDigit = count % 10
	const lastTwoDigits = count % 100

	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'many'
	if (lastDigit === 1) return 'one'
	if (lastDigit >= 2 && lastDigit <= 4) return 'few'
	return 'many'
}

export default AccordionContent
