import type { PublicModuleResponse } from '@/app/api/course/publicCourse.api'
import { LoginModal } from '@/features/auth-modal'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Topic {
	id: number
	title: string
	description?: string
	cover_image?: string | null
	order_number?: number
}

interface ModuleTabsProps {
	modules: PublicModuleResponse[]
	courseId: number
}

export const ModuleTabs = ({ modules, courseId }: ModuleTabsProps) => {
	const navigate = useNavigate()
	const [topics, setTopics] = useState<Topic[]>([])
	const [activeTopicId, setActiveTopicId] = useState<number | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Загружаем темы для первого модуля
	useEffect(() => {
		const firstModule = modules[0]
		if (!firstModule) return

		if (firstModule.topics && firstModule.topics.length > 0) {
			setTopics(firstModule.topics)
			setActiveTopicId(firstModule.topics[0]?.id || null)
		} else {
			setTopics([])
			setActiveTopicId(null)
		}
	}, [modules])

	const current = topics.find(t => t.id === activeTopicId)

	const handleStart = () => {
		if (!current) return
		// Берём id модуля из первого элемента массива (именно его темы отображаются в табах)
		const moduleId = modules[0]?.id
		if (!moduleId) return

		if (localStorage.getItem('auth') === 'true') {
			// Переходим на страницу курса, передавая выбранные модуль и тему
			navigate(`/course/${courseId}?module=${moduleId}&topic=${current.id}`)
		} else {
			setIsModalOpen(true)
		}
	}

	const handleModalClose = () => {
		setIsModalOpen(false)
	}

	if (!current || topics.length === 0) {
		return (
			<div className='w-[603px] flex items-center justify-center p-8 text-gray-500'>
				Темы не найдены
			</div>
		)
	}

	return (
		<div className='w-[700px] flex flex-col'>
			<div className='relative w-[603px]'>
				{/* Topic Tabs */}
				<div className='flex'>
					{topics.map((topic, index) => (
						<button
							key={topic.id}
							onClick={() => setActiveTopicId(topic.id)}
							className={`relative -ml-2 first:ml-0 transition-all duration-600
                ${
									topic.id === activeTopicId
										? 'z-20 px-6 bg-white text-[#8C3192] text-base font-medium border-2 border-b-[#fff] border-[#8C3192] rounded-tl-[20px] rounded-tr-[20px] overflow-hidden -mb-0.5'
										: 'z-10 w-10 h-10 rounded-t-[20px] bg-[#9D82AA] border-b-0 text-white text-sm hover:bg-[#9D82AA] border-2 border-[#8C3192]'
								}`}
						>
							{topic.id === activeTopicId
								? `${topic.order_number ?? index + 1} модуль`
								: topic.order_number ?? index + 1}
						</button>
					))}
				</div>
			</div>

			{/* Card */}
			<div className='flex flex-col border-2 border-t-2 border-[#8C3192] rounded-b-[20px] bg-white shadow-[6px_10px_4px_rgba(0,0,0,0.25)] p-5 rounded-tr-[20px]'>
				{/* Title */}
				<div className='text-black text-3xl w-full mb-4 whitespace-pre-wrap'>
					{current.order_number ?? topics.indexOf(current) + 1} модуль -{' '}
					{current.title}
				</div>

				{/* Content Container */}
				<div className='flex gap-4'>
					{/* Text Content */}
					<div className='flex flex-col flex-1'>
						<div className='text-black text-base mb-4 text-left text-wrap whitespace-pre-line'>
							{current.description}
						</div>
						<div className='text-zinc-600 text-base'>
							Среднее время прохождения 25 мин.
						</div>
					</div>

					{/* Image */}
					<div className='flex flex-col justify-center'>
						<img
							src={current.cover_image || '/assets/default_topic_cover.png'}
							alt={current.title}
							className='w-80 h-48 rounded-[10px] object-cover'
						/>
						<button
							onClick={handleStart}
							className='mt-4 w-56 h-9 bg-[#8C3192] rounded-[10px] flex items-center justify-center text-white text-xl self-center'
						>
							Начать работу
						</button>
					</div>
				</div>
			</div>

			{/* Login Modal */}
			<LoginModal isOpen={isModalOpen} onClose={handleModalClose} />
		</div>
	)
}
