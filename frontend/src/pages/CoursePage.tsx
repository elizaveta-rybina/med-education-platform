import { CourseInfo, CourseSteps } from '@/components/coursePage'

const CoursePage: React.FC = () => {
	return (
		<div className='my-8 container mx-auto'>
			<CourseInfo />
			<CourseSteps />
		</div>
	)
}

export default CoursePage
