import { IconType } from 'react-icons'

export interface CardProps {
	icon: IconType
	label: string
	href: string
	className?: string // Добавляем className
}
