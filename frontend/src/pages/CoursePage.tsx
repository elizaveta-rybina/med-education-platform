import {
	CourseInfo,
	CourseModules,
	CoursePartners,
	CourseSteps
} from '@/components/coursePage'

const CoursePage: React.FC = () => {
	return (
		<div className='my-8 container mx-auto'>
			<CourseInfo />
			<CourseSteps />
			<CourseModules />
			<CoursePartners />
		</div>
	)
}

export default CoursePage
