import { CourseButton, CourseTitle, NavigationPanel, SkillsGrid } from '@/components/courses'
import AccordionModule from '@/components/courses/AccordionModule'
import { Subtitle } from '@/components/shared'
import CardList from '@/components/shared/cardList'
import { modulesData } from '@/data/accordion'
import { navItems } from '@/data/navItems'
import { courses } from '@/data/recommend'
import { skills } from '@/data/skills'
import { useState } from 'react'

const CoursePage = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className='my-8 container mx-auto px-4'>
			<CourseTitle 
				title={
					<>
						<span className="text-7xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
							Доктор VR:
							<br />
						</span>
						<span className='block my-4'>виртуальная лаборатория по патофизиологии</span>
					</>}
				description="Поможет разобраться в основах физиологии через интерактивные эксперименты и моделирование процессов в организме"
				imageAlt='Молния'
				imageSrc='src/assets/courseImage.png'
			/>
			<CourseButton 
        isRegistered={isRegistered} 
        isLoggedIn={isLoggedIn} 
        onRegister={() => setIsLoggedIn(true)} 
      />
			<NavigationPanel items={navItems} />
			<Subtitle title="Получаемые навыки" anchor="about"/>
			<SkillsGrid skills={skills} />
			<Subtitle title="Модули" anchor="modules" className='mt-14 mb-4'/>
			<p className="my-4 sm:my-5 md:my-6 text-base sm:text-lg md:text-xl text-gray-500 sm:px-0">
				В данном курсе представлено пять модулей, в которых вы изучите ключевые аспекты физиологии человека. Каждый модуль охватывает важные системы организма, начиная с основ физиологии и заканчивая глубоким изучением сердечно-сосудистой, дыхательной, нервной и мышечной систем. Этот курс даст вам целостное понимание того, как органы и системы взаимодействуют, поддерживая здоровье и жизнедеятельность организма, и подготовит к более сложным концепциям физиологии.
			</p>
			<div className="flex flex-col md:flex-row items-start gap-8">
				<div className="w-full md:w-2/3">
					<AccordionModule modules={modulesData} />
				</div>
				
				<div className="hidden md:flex w-1/3 justify-end">
					<img 
						src="src/assets/backCourse.png" 
						alt="Декоративная иллюстрация"
						className="max-w-full h-auto max-h-[500px] object-contain rounded-lg"
					/>
				</div>
			</div>
			<Subtitle title="Рекомендации" anchor='recommendations' />
			<CardList 
        courses={courses} 
        cols={4}
        className="mt-8"
      />
    </div>
  );
};

export default CoursePage;