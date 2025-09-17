import {
	CourseInfo,
	CourseModules,
	CoursePartners,
	CourseSteps,
	Footer
} from '@/components/coursePage'

const CoursePage: React.FC = () => {
	return (
		<div className='my-8 container mx-auto'>
			<CourseInfo />
			<CourseSteps />
			<CourseModules />
			<CoursePartners />
			<Footer />
		</div>
	)
}

export default CoursePage
