import backCourse from '@/assets/backCourse.png'
import {
	CourseInfo,
	NavigationPanel,
	SkillsGrid
} from '@/components/coursePage'
import AccordionModule from '@/components/coursePage/AccordionModule'
import { Subtitle } from '@/components/shared'
import CardList from '@/components/shared/cardList'
import { useModulesData } from '@/data/accordion'
import { useNavItems } from '@/data/navItems'
import { useCourses } from '@/data/recommend'
import { useSkills } from '@/data/skills'
import { useTranslation } from 'react-i18next'

const CoursePage: React.FC = () => {
	const { t } = useTranslation('coursePage')
	const navItems = useNavItems()
	const skills = useSkills()
	const modules = useModulesData()
	const courses = useCourses()

	return (
		<div className='my-8 container mx-auto'>
			<CourseInfo />
			<NavigationPanel items={navItems} />
			<Subtitle title={t('skillsTitle')} anchor='about' />
			<SkillsGrid skills={skills} />
			<Subtitle
				title={t('modulesTitle')}
				anchor='modules'
				className='mt-14 mb-4'
			/>
			<p className='my-4 sm:my-5 md:my-6 text-base sm:text-lg md:text-xl text-gray-500 sm:px-0'>
				{t('modulesDescription')}
			</p>
			<div className='flex flex-col md:flex-row items-start gap-8'>
				<div className='w-full md:w-2/3'>
					<AccordionModule modules={modules} />
				</div>
				<div className='hidden md:flex w-1/3 justify-end'>
					<img
						src={backCourse}
						alt={t('decorativeImageAlt')}
						className='max-w-full h-auto max-h-[500px] object-contain rounded-lg'
					/>
				</div>
			</div>
			<Subtitle title={t('recommendationsTitle')} anchor='recommendations' />
			<CardList courses={courses} cols={4} className='mt-8' />
		</div>
	)
}

export default CoursePage
