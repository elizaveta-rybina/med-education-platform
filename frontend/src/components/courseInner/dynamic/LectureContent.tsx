import type { Lecture } from '@/app/api/lectures/lectures.types'
import React from 'react'
import { MarkdownRenderer } from './MarkdownRenderer'

interface LectureContentProps {
	lecture: Lecture | null | undefined
}

export const LectureContent: React.FC<LectureContentProps> = ({ lecture }) => {
	if (!lecture?.content) return null
	return (
		<div className='prose prose-base max-w-none [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:my-6 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2'>
			<MarkdownRenderer text={lecture.content} />
		</div>
	)
}
