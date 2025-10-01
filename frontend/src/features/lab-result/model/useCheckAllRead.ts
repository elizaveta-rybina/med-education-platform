import { useCourse } from '@/hooks/useCourse'
import { useEffect, useState } from 'react'

export const useCheckAllRead = () => {
	const { course } = useCourse()
	const [isAllRead, setIsAllRead] = useState(false)

	useEffect(() => {
		const savedReadStatus = localStorage.getItem('chapterReadStatus')
		if (!savedReadStatus || !course) {
			setIsAllRead(false)
			return
		}

		const readStatus = JSON.parse(savedReadStatus) as Record<string, boolean>
		const allChapters = course.modules.flatMap(m => m.chapters)
		const allChaptersRead = allChapters.every(
			chapter => readStatus[chapter.hash] === true
		)
		setIsAllRead(allChaptersRead)
	}, [course])

	const resetReadStatus = () => {
		localStorage.removeItem('chapterReadStatus')
		setIsAllRead(false)
	}

	return { isAllRead, resetReadStatus }
}
