import type { Lecture } from '@/app/api/lectures/lectures.types'
import React from 'react'
import { MarkdownRenderer } from './MarkdownRenderer'

interface LectureContentProps {
	lecture: Lecture | null | undefined
}

export const LectureContent: React.FC<LectureContentProps> = ({ lecture }) => {
	if (!lecture?.content) return null
	return <MarkdownRenderer text={lecture.content} />
}
