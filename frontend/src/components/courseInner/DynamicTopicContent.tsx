import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// UI Components
import { FreeInputBlock } from '@/components/courseInner/block/FreeInputBlock'
import { ChapterHeader } from '@/components/courseInner/ChapterHeader'
import { MarkAsReadButton } from '@/components/courseInner/MarkAsReadButton'
import { DragDropTableManager } from '@/features/drag-drop-table'
import { DropdownTableComponent } from '@/features/dropdown-table/ui/DropdownTableComponent'
import { LectureContent } from './dynamic/LectureContent'
import { LectureNavigation } from './dynamic/LectureNavigation'
import { QuizView } from './dynamic/QuizView'
import { ResultsButton } from './dynamic/ResultsButton'

// Hook
import { useDynamicTopicContent } from './useDynamicTopicContent'

const DynamicTopicContent: React.FC = () => {
	const {
		topic,
		loading,
		error,
		selectedLecture,
		displayedQuiz,
		activeQuiz,
		assignmentQuiz,
		assignmentType,
		quizzes,
		isSelectedRead,
		showResults,
		userAnswers,
		currentTableIndex,
		setCurrentTableIndex,
		dndTableBlocks,
		allTableQuestionsInTopic,

		handleMarkAsRead,
		handleAnswerSelect,
		handleSubmitQuiz,
		navigateLecture,
		resetActiveQuiz,
		setActiveQuiz,
		handleTableComplete
	} = useDynamicTopicContent()

	if (loading)
		return <div className='p-6 text-center text-gray-500'>Загрузка...</div>
	if (error) return <div className='p-6 text-center text-red-600'>{error}</div>
	if (!topic)
		return <div className='p-6 text-center text-gray-500'>Тема не найдена</div>

	return (
		<div className='flex-1 p-4 sm:p-6 min-h-screen border-t-1'>
			<div className='max-w-9xl mx-auto pb-20'>
				<ChapterHeader
					title={assignmentQuiz?.title || selectedLecture?.title || topic.title}
					isRead={false}
				/>

				{/* --- ЛЕКЦИЯ --- */}
				{!displayedQuiz && selectedLecture?.content ? (
					<LectureContent lecture={selectedLecture} />
				) : null}

				{/* --- 1. ИНТЕРАКТИВНОЕ ЗАДАНИЕ (ИГРА + ТАБЛИЦА) --- */}
				{assignmentType === 'interactive' && displayedQuiz && (
					<div className='mt-4'>
						<div className='p-6 bg-gray-50 rounded-lg'>
							<h3 className='text-lg font-medium mb-4'>
								Пройдите интерактивное задание, а после заполните таблицу под
								ним.
							</h3>

							{/* Iframe игры */}
							{displayedQuiz.game_path || displayedQuiz.file_name ? (
								<div className='space-y-2'>
									<div className='flex gap-2'>
										<iframe
											src={`http://localhost:8000${
												displayedQuiz.game_path ||
												`/games/semester_one/${displayedQuiz.file_name}`
											}/index.html`}
											className='w-full h-[578px] border border-gray-300 rounded-lg mt-4'
											title={displayedQuiz.file_name || displayedQuiz.title}
											allow='fullscreen; autoplay; encrypted-media'
										/>
									</div>
								</div>
							) : (
								<div className='p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800'>
									<p>Не удалось загрузить игру: отсутствуют данные пути</p>
									<p className='text-sm mt-2'>Quiz ID: {displayedQuiz.id}</p>
								</div>
							)}

							{/* Рендерим таблицы, найденные в теме */}
							{allTableQuestionsInTopic.length > 0
								? allTableQuestionsInTopic.map(q => {
										let metadata: any = q.metadata
										if (typeof metadata === 'string') {
											try {
												metadata = JSON.parse(metadata)
											} catch (e) {
												return null
											}
										}
										const questionWithMeta = { ...q, metadata }

										return (
											<div key={q.id} className='mt-8 border-t pt-6'>
												<DropdownTableComponent
													question={questionWithMeta as any}
													chapterHash={`quiz_q_${q.id}`}
													onComplete={isCorrect => {
														console.log('Table completed:', isCorrect)
														if (displayedQuiz.id)
															handleTableComplete(
																displayedQuiz.id,
																{
																	correct: isCorrect ? 1 : 0,
																	total: 1
																},
																'dropdown-table'
															)
													}}
												/>
											</div>
										)
								  })
								: // Fallback: рендер таблиц внутри самого квиза
								  displayedQuiz.questions?.map(q => {
										if (
											q.question_type !== 'select-table' &&
											q.question_type !== 'table'
										)
											return null
										let metadata: any = q.metadata
										if (typeof metadata === 'string') {
											try {
												metadata = JSON.parse(metadata)
											} catch (e) {
												return null
											}
										}
										if (
											!metadata?.rows?.[0]?.cells?.some(
												(c: any) => c.available_option_ids
											)
										)
											return null

										const questionWithMeta = { ...q, metadata }
										return (
											<div key={q.id} className='mt-8 border-t pt-6'>
												<DropdownTableComponent
													question={questionWithMeta as any}
													chapterHash={`quiz_${displayedQuiz.id}`}
													onComplete={isCorrect => {
														if (displayedQuiz.id)
															handleTableComplete(displayedQuiz.id, {
																correct: isCorrect ? 1 : 0,
																total: 1
															})
													}}
												/>
											</div>
										)
								  })}
						</div>
					</div>
				)}

				{/* --- 2. НОВАЯ ТАБЛИЦА БЕЗ ИГРЫ (Select Table) --- */}
				{(assignmentType === 'select-table' ||
					(assignmentType === 'table' && dndTableBlocks.length === 0)) &&
					displayedQuiz && (
						<div className='mt-4 space-y-8'>
							{displayedQuiz.questions?.map(q => {
								let metadata: any = q.metadata
								if (typeof metadata === 'string') {
									try {
										metadata = JSON.parse(metadata)
									} catch (e) {
										return null
									}
								}

								// Фильтр только для Dropdown формата
								if (
									!metadata?.rows?.[0]?.cells?.some(
										(c: any) => c.available_option_ids
									)
								)
									return null

								const questionWithMeta = { ...q, metadata }
								return (
									<DropdownTableComponent
										key={q.id}
										question={questionWithMeta as any}
										chapterHash={`quiz_${displayedQuiz.id}`}
										onComplete={isCorrect => {
											if (displayedQuiz.id)
												handleTableComplete(
													displayedQuiz.id,
													{
														correct: isCorrect ? 1 : 0,
														total: 1
													},
													'dropdown-table'
												)
										}}
									/>
								)
							})}
						</div>
					)}

				{/* --- 3. СТАРАЯ DND ТАБЛИЦА --- */}
				{assignmentType === 'table' && dndTableBlocks.length > 0 && (
					<div className='mt-4'>
						<div className='mb-4'>
							<div className='flex items-center justify-between'>
								{dndTableBlocks.length > 1 && (
									<div className='flex gap-2'>
										<button
											onClick={() =>
												setCurrentTableIndex(prev => Math.max(0, prev - 1))
											}
											disabled={currentTableIndex === 0}
											className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50'
										>
											← Предыдущая
										</button>
										<button
											onClick={() =>
												setCurrentTableIndex(prev =>
													Math.min(dndTableBlocks.length - 1, prev + 1)
												)
											}
											disabled={currentTableIndex === dndTableBlocks.length - 1}
											className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50'
										>
											Следующая →
										</button>
									</div>
								)}
							</div>
						</div>
						<DragDropTableManager
							blocks={[dndTableBlocks[currentTableIndex]]}
							chapterHash={
								displayedQuiz?.id ? `quiz_${displayedQuiz.id}` : undefined
							}
							onComplete={(_isCorrect, stats) => {
								if (displayedQuiz?.id)
									handleTableComplete(displayedQuiz.id, stats, 'dnd-table')
							}}
						/>
					</div>
				)}

				{/* --- 4. FREE INPUT --- */}
				{assignmentType === 'free-input' && displayedQuiz && (
					<div className='mt-4'>
						<div className='p-1 rounded-lg'>
							{displayedQuiz.description && (
								<div className='mb-6 p-4 bg-white rounded-lg border border-gray-200 prose prose-sm max-w-none'>
									<ReactMarkdown remarkPlugins={[remarkGfm]}>
										{displayedQuiz.description}
									</ReactMarkdown>
								</div>
							)}
							{displayedQuiz.questions &&
								displayedQuiz.questions.length > 0 && (
									<FreeInputBlock
										block={{
											id: `free-input-${displayedQuiz.id}`,
											type: 'free-input' as const,
											title: displayedQuiz.title || '',
											description: displayedQuiz.description || '',
											submissionText:
												'Ваш ответ отправлен на проверку преподавателю.',
											questions: displayedQuiz.questions.map((q, idx) => ({
												id: `q_${q.id || idx}`,
												text: q.text,
												maxLength: q.max_length ?? undefined,
												placeholder: q.placeholder || undefined
											}))
										}}
										onComplete={() => {
											if (displayedQuiz.id)
												handleTableComplete(
													displayedQuiz.id,
													{
														correct: 1,
														total: 1
													},
													'free-input'
												)
										}}
									/>
								)}
						</div>
					</div>
				)}

				{/* --- 5. INPUT (OLD) --- */}
				{assignmentType === 'input' && displayedQuiz && (
					<div className='mt-4'>
						<div className='p-6 bg-gray-50 rounded-lg'>
							<h3 className='text-lg font-medium mb-4'>
								Задание с вводом ответа
							</h3>
							<p className='text-gray-600 mb-4'>
								Компонент для ввода ответа будет добавлен позже
							</p>
							<button
								onClick={() => {
									if (displayedQuiz?.id)
										handleTableComplete(
											displayedQuiz.id,
											{
												correct: 1,
												total: 1
											},
											'input'
										)
								}}
								className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'
							>
								Отметить как выполнено
							</button>
						</div>
					</div>
				)}

				{/* --- 6. STANDARD QUIZ --- */}
				{assignmentType === 'standard' && displayedQuiz && (
					<div className='mt-4'>
						<QuizView
							quiz={displayedQuiz}
							showResults={showResults}
							userAnswers={userAnswers}
							onSelect={handleAnswerSelect}
							onSubmit={handleSubmitQuiz}
						/>
						{showResults && (
							<div className='mt-6 pt-4 border-t border-gray-200'>
								<button
									onClick={resetActiveQuiz}
									className='px-6 py-2 bg-gray-600 text-white rounded-xl shadow-sm hover:bg-gray-700 transition-colors'
								>
									Вернуться к лекции
								</button>
							</div>
						)}
					</div>
				)}

				{/* --- FOOTER / NAVIGATION --- */}
				{!displayedQuiz && !selectedLecture?.content && (
					<div className='text-gray-500'>
						Для темы пока нет лекций в формате markdown.
					</div>
				)}

				{selectedLecture && !activeQuiz && !assignmentQuiz && (
					<div className='mt-6 pt-4 border-t border-gray-200 flex items-center gap-3'>
						<MarkAsReadButton
							isRead={isSelectedRead}
							onMark={handleMarkAsRead}
						/>
						<ResultsButton
							selectedLecture={selectedLecture || null}
							quizzes={quizzes}
							onOpenResults={quiz => setActiveQuiz(quiz)}
						/>
						<LectureNavigation
							onPrev={() => navigateLecture('prev')}
							onNext={() => navigateLecture('next')}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default DynamicTopicContent
