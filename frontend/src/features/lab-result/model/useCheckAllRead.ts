import { useCourse } from '@/hooks/useCourse'
import { useEffect, useState } from 'react'

export const useCheckAllRead = () => {
	const { course } = useCourse()
	const [isAllRead, setIsAllRead] = useState(false)

	// Функция для пересчета статуса (выделена для переиспользования)
	const checkAllReadStatus = () => {
		const savedReadStatus = localStorage.getItem('chapterReadStatus')
		if (!savedReadStatus || !course) {
			setIsAllRead(false)
			return
		}

		try {
			const readStatus = JSON.parse(savedReadStatus) as Record<string, boolean>
			const allChapters = course.modules.flatMap(m => m.chapters)
			const allChaptersRead = allChapters.every(
				chapter => readStatus[chapter.hash] === true
			)
			setIsAllRead(allChaptersRead)
		} catch (error) {
			console.error('Error parsing chapterReadStatus:', error)
			setIsAllRead(false)
		}
	}

	// Эффект для начальной проверки и изменений course
	useEffect(() => {
		checkAllReadStatus()
	}, [course])

	// Эффект для слушания изменений localStorage (cross-tab + same-tab с dispatch)
	useEffect(() => {
		if (!course) return // Не слушаем, если нет course

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === 'chapterReadStatus') {
				checkAllReadStatus()
			}
		}

		window.addEventListener('storage', handleStorageChange)

		// Изначальная проверка при монтировании слушателя
		checkAllReadStatus()

		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [course]) // Зависимость от course, чтобы пересчитывать при его изменении

	const resetReadStatus = () => {
		localStorage.removeItem('chapterReadStatus')
		setIsAllRead(false)
		window.dispatchEvent(
			new StorageEvent('storage', { key: 'chapterReadStatus' })
		)
	}

	return { isAllRead, resetReadStatus }
}
