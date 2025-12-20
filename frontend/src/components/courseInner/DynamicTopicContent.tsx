import { lecturesApi } from '@/app/api/lectures/lectures.api'
import type { Lecture } from '@/app/api/lectures/lectures.types'
import { topicsApi } from '@/app/api/topics/topics.api'
import type { Topic } from '@/app/api/topics/topics.types'
import { ChapterHeader } from '@/components/courseInner/ChapterHeader'
import { MarkAsReadButton } from '@/components/courseInner/MarkAsReadButton'
import React, { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSearchParams } from 'react-router-dom'

const DynamicTopicContent: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const topicIdParam = searchParams.get('topic')
	const lectureIdParam = searchParams.get('lecture')
	const [topic, setTopic] = useState<Topic | null>(null)
	const [lectures, setLectures] = useState<Lecture[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [lectureReadStatus, setLectureReadStatus] = useState<
		Record<string, boolean>
	>({})

	// Фильтруем только markdown лекции (всегда одинаковый порядок хуков)
	const markdownLectures = lectures.filter(
		l => (l.content_type || '').toLowerCase() === 'markdown'
	)

	// Выбор текущей лекции по параметру URL или первая доступная
	const selectedLecture = lectureIdParam
		? markdownLectures.find(l => String(l.id) === String(lectureIdParam)) ||
		  markdownLectures[0]
		: markdownLectures[0]

	const isSelectedRead = useMemo(() => {
		if (!selectedLecture?.id) return false
		return !!lectureReadStatus[String(selectedLecture.id)]
	}, [lectureReadStatus, selectedLecture])

	useEffect(() => {
		const load = async () => {
			const topicId = Number(topicIdParam)
			if (!topicId) {
				setError('Тема не указана')
				setLoading(false)
				return
			}
			try {
				setLoading(true)
				setError(null)
				const topicResp = await topicsApi.getById(topicId)
				const topicData =
					(topicResp as any).data || (topicResp as any).topic || topicResp
				setTopic(topicData as Topic)

				const contentsResp = await lecturesApi.getByTopicId(topicId)
				const lecturesData = (contentsResp as any).data?.lectures || []
				setLectures(lecturesData as Lecture[])
			} catch (e) {
				console.error('Failed to load topic contents', e)
				setError('Не удалось загрузить содержание темы')
			} finally {
				setLoading(false)
			}
		}
		void load()
	}, [topicIdParam])

	useEffect(() => {
		const saved = localStorage.getItem('lectureReadStatus')
		setLectureReadStatus(saved ? JSON.parse(saved) : {})
		const handler = () => {
			const refreshed = localStorage.getItem('lectureReadStatus')
			setLectureReadStatus(refreshed ? JSON.parse(refreshed) : {})
		}
		window.addEventListener('lectureReadStatusUpdated', handler)
		return () => window.removeEventListener('lectureReadStatusUpdated', handler)
	}, [])

	if (loading) {
		return <div className='p-6 text-center text-gray-500'>Загрузка...</div>
	}

	if (error) {
		return <div className='p-6 text-center text-red-600'>{error}</div>
	}

	if (!topic) {
		return <div className='p-6 text-center text-gray-500'>Тема не найдена</div>
	}

	const handleMarkAsRead = () => {
		if (!selectedLecture?.id) return
		const key = 'lectureReadStatus'
		const saved = localStorage.getItem(key)
		const status = saved ? JSON.parse(saved) : {}
		status[String(selectedLecture.id)] = true
		localStorage.setItem(key, JSON.stringify(status))
		setLectureReadStatus(status)
		window.dispatchEvent(new Event('lectureReadStatusUpdated'))
	}

	const navigateLecture = (direction: 'prev' | 'next') => {
		if (!selectedLecture) return
		const idx = markdownLectures.findIndex(l => l.id === selectedLecture.id)
		if (idx < 0) return
		const nextIdx = direction === 'prev' ? idx - 1 : idx + 1
		if (nextIdx < 0 || nextIdx >= markdownLectures.length) return
		const nextLecture = markdownLectures[nextIdx]
		const nextParams = new URLSearchParams(searchParams)
		nextParams.set('lecture', String(nextLecture.id))
		setSearchParams(nextParams)
	}

	return (
		<div className='flex-1 p-4 sm:p-6 min-h-screen border-t-1'>
			<div className='max-w-9xl mx-auto pb-20'>
				<ChapterHeader
					title={selectedLecture?.title || topic.title}
					isRead={false}
				/>
				{selectedLecture?.content ? (
					<div className='prose max-w-none'>
						<ReactMarkdown>{selectedLecture.content}</ReactMarkdown>
					</div>
				) : (
					<div className='text-gray-500'>
						Для темы пока нет лекций в формате markdown.
					</div>
				)}
				{selectedLecture && (
					<div className='mt-6 pt-4 border-t border-gray-200 flex items-center gap-3'>
						<MarkAsReadButton
							isRead={isSelectedRead}
							onMark={handleMarkAsRead}
						/>
						<div className='ml-auto flex gap-2'>
							<button
								onClick={() => navigateLecture('prev')}
								className='px-4 py-2 bg-gray-800 text-white rounded-xl shadow-sm hover:bg-gray-700'
							>
								Предыдущая лекция
							</button>
							<button
								onClick={() => navigateLecture('next')}
								className='px-4 py-2 bg-fuchsia-700 text-white rounded-xl shadow-sm hover:bg-fuchsia-500'
							>
								Следующая лекция
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default DynamicTopicContent
