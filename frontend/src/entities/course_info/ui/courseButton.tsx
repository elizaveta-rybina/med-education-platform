import { ChevronDown } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface CourseButtonProps {
	targetId: string
}

export const CourseButton: React.FC<CourseButtonProps> = ({ targetId }) => {
	const { t } = useTranslation('coursePage')

	const handleClick = () => {
		const el = document.getElementById(targetId)
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<button
			onClick={handleClick}
			className='flex text-xl items-center mx-auto gap-2 border-2 border-[#9D358E] text-[#9D358E] font-medium px-15 py-2 rounded-full hover:bg-purple-50 transition-colors'
		>
			{t('info.goToModules')}
			<ChevronDown size={24} />
		</button>
	)
}
