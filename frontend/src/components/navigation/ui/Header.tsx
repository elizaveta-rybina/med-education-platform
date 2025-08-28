import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CourseHeader } from './CourseHeader'
import { DefaultHeader } from './DefaultHeader'

export const Header: React.FC = () => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
	const location = useLocation()
	const inputRef = useRef<HTMLInputElement>(null)

	const isCoursePage = location.pathname.toLowerCase().includes('course')

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!isMobileMenuOpen)
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
				event.preventDefault()
				inputRef.current?.focus()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [])

	return isCoursePage ? (
		<CourseHeader
			isMobileMenuOpen={isMobileMenuOpen}
			toggleMobileMenu={toggleMobileMenu}
		/>
	) : (
		<DefaultHeader />
	)
}
