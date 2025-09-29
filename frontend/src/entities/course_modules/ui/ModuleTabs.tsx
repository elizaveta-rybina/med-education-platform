import { LoginModal } from '@/features/auth-modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Module } from '../cfg/modules.data'

interface ModuleTabsProps {
	language?: 'en' | 'ru'
	modules: Module[]
}

export const ModuleTabs = ({ language = 'ru', modules }: ModuleTabsProps) => {
	const navigate = useNavigate()
	const [active, setActive] = useState(1)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const current = modules.find(m => m.id === active)!

	const getImageSrc = (image: Module['image'], lang: 'en' | 'ru'): string => {
		return typeof image === 'string' ? image : image[lang]
	}

	const handleStart = () => {
		if (localStorage.getItem('auth') === 'true') {
			navigate(`/course/${current.id}`)
		} else {
			setIsModalOpen(true)
		}
	}

	const handleModalClose = () => {
		setIsModalOpen(false)
	}

	return (
		<div className='w-[603px] flex flex-col'>
			<div className='relative w-[603px]'>
				{/* Tabs */}
				<div className='flex'>
					{modules.map(m => (
						<button
							key={m.id}
							onClick={() => setActive(m.id)}
							className={`relative -ml-2 first:ml-0 transition-all duration-200
                ${
									m.id === active
										? 'z-20 px-6 bg-white text-[#8C3192] text-base font-medium border-2 border-b-[#fff] border-[#8C3192] rounded-tl-[20px] rounded-tr-[20px] overflow-hidden -mb-0.5'
										: 'z-10 w-10 h-10 rounded-t-[20px] bg-[#9D82AA] border-b-0 text-white text-sm hover:bg-[#9D82AA] border-2 border-[#8C3192]'
								}`}
						>
							{m.id === active ? m.shortTitle[language] : m.id}
						</button>
					))}
				</div>
			</div>

			{/* Card */}
			<div className='flex flex-col border-2 border-t-2 border-[#8C3192] rounded-b-[20px] bg-white shadow-[6px_10px_4px_rgba(0,0,0,0.25)] p-5 rounded-tr-[20px]'>
				{/* Title */}
				<div className='text-black text-3xl w-full mb-4 whitespace-pre-wrap'>
					{current.title[language]}
				</div>

				{/* Content Container */}
				<div className='flex gap-4'>
					{/* Text Content */}
					<div className='flex flex-col flex-1'>
						<div className='text-black text-base mb-4 text-left text-wrap whitespace-pre-line'>
							{current.description[language]}
						</div>
						<div className='text-zinc-600 text-base'>
							{current.time[language]}
						</div>
					</div>

					{/* Image */}
					<div className='flex flex-col justify-center'>
						<img
							src={getImageSrc(current.image, language)}
							alt={current.title[language]}
							className='w-80 h-48 rounded-[10px] object-cover'
						/>
						<button
							onClick={handleStart}
							className='mt-4 w-56 h-9 bg-[#8C3192] rounded-[10px] flex items-center justify-center text-white text-xl self-center'
						>
							{language === 'en' ? 'Get started' : 'Начать работу'}
						</button>
					</div>
				</div>
			</div>

			{/* Login Modal */}
			<LoginModal isOpen={isModalOpen} onClose={handleModalClose} />
		</div>
	)
}
