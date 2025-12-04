import { Block } from '@/data/types'
import { TestBlockComponent } from '@/features/test-block'
import React, { memo, useCallback, useMemo } from 'react'
import { FreeInputBlock } from '../block'

interface TestSectionProps {
	testBlocks: Block[]
	currentQuestionIndex: number
	moduleId: string
	chapterId: string
	showTest: boolean
	isRead: boolean
	onComplete: (isCorrect: boolean) => void
}

export const TestSection: React.FC<TestSectionProps> = memo(
	({
		testBlocks,
		currentQuestionIndex,
		moduleId,
		chapterId,
		showTest,
		isRead,
		onComplete
	}) => {
		// Мемоизация текущего блока для предотвращения лишних вычислений
		const currentTestBlock = useMemo(
			() => testBlocks[currentQuestionIndex],
			[testBlocks, currentQuestionIndex]
		)

		// Мемоизация условия валидности для предотвращения повторных проверок
		const isInvalidState = useMemo(
			() =>
				!(showTest || isRead) ||
				testBlocks.length === 0 ||
				!currentTestBlock ||
				!chapterId,
			[showTest, isRead, testBlocks.length, currentTestBlock, chapterId]
		)

		// Мемоизация обработчика для предотвращения создания новой функции на каждом рендере
		const handleNext = useCallback(() => {
			onComplete(true)
		}, [onComplete])

		// Мемоизация типа блока для оптимизации условного рендеринга
		const blockType = currentTestBlock?.type

		if (isInvalidState) {
			if (process.env.NODE_ENV === 'development') {
				console.warn(
					`Invalid test state: chapterId=${chapterId}, block=${currentTestBlock?.id}, showTest=${showTest}, isRead=${isRead}`
				)
			}
			return null
		}

		// Общий wrapper вынесен в константу для переиспользования
		const wrapperClassName =
			'bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200'

		return (
			<div className='lg:sticky lg:top-6 space-y-6'>
				{blockType === 'question' && (
					<div className={wrapperClassName}>
						<TestBlockComponent
							block={currentTestBlock}
							moduleId={moduleId}
							chapterId={chapterId}
							questionIndex={currentQuestionIndex}
							totalQuestions={testBlocks.length}
							onNext={handleNext}
						/>
					</div>
				)}
				{blockType === 'free-input' && (
					<div className={wrapperClassName}>
						<FreeInputBlock block={currentTestBlock} onComplete={onComplete} />
					</div>
				)}
			</div>
		)
	}
)
