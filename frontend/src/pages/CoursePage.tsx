import {
	CourseInfo,
	CourseModules,
	CoursePartners,
	CourseSteps,
	Footer
} from '@/components/coursePage'
import { Header } from '@/components/navigation'

const CoursePage: React.FC = () => {
	return (
		<div className='bg-gradient-to-b from-white to-[#E0C6FA] overflow-hidden'>
			<Header backgroundColor='#7D4F93' />
			<div className='my-8 container mx-auto'>
				<CourseInfo />
				<CourseSteps />
				<CourseModules />
				<CoursePartners />
				<Footer />
			</div>
		</div>
	)
}

export default CoursePage
