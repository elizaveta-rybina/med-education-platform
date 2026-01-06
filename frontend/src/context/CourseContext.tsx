import { createContext, ReactNode, useCallback, useState } from 'react'

interface CourseContextType {
	course: any | null
	courseId?: string
	resetReadFlags: () => void
}

export const CourseContext = createContext<CourseContextType | undefined>(
	undefined
)

export const CourseProvider = ({ children }: { children: ReactNode }) => {
	const [course, setCourse] = useState<any | null>(null)

	const resetReadFlags = useCallback(() => {
		setCourse((prev: any) => {
			if (!prev) return prev
			return {
				...prev,
				modules: (prev.modules || []).map((module: any) => ({
					...module,
					chapters: (module.chapters || []).map((chapter: any) => ({
						...chapter,
						isRead: false,
						testPassed: false
					}))
				}))
			}
		})
	}, [])

	return (
		<CourseContext.Provider
			value={{
				course,
				courseId: undefined,
				resetReadFlags
			}}
		>
			{children}
		</CourseContext.Provider>
	)
}
