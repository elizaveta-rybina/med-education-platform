import CourseProgressCard, {
	CourseProgressCardProps
} from './CourseProgressCard'

const CourseList = () => {
	const courses: CourseProgressCardProps[] = [
		{
			courseTitle: 'Основы кардиологии для начинающих',
			completionPercentage: 42,
			offlineMaterialTitle: 'Дополнительные материалы',
			offlineMaterialText: 'Атлас сердечно-сосудистой системы',
			offlineMaterialDuration: '15 минут'
		},
		{
			courseTitle: 'Современные методы диагностики в онкологии',
			completionPercentage: 78,
			offlineMaterialTitle: 'Практические задания',
			offlineMaterialText: 'Разбор клинических случаев',
			offlineMaterialDuration: '25 минут'
		},
		{
			courseTitle: 'Неотложная помощь в педиатрии',
			completionPercentage: 15,
			offlineMaterialTitle: 'Дополнительные ресурсы',
			offlineMaterialText: 'Алгоритмы действий при неотложных состояниях',
			offlineMaterialDuration: '30 минут'
		},
		{
			courseTitle: 'Фармакотерапия хронических заболеваний',
			completionPercentage: 56,
			offlineMaterialTitle: 'Справочные материалы',
			offlineMaterialText: 'Современные протоколы лечения',
			offlineMaterialDuration: '20 минут'
		},
		{
			courseTitle: 'Основы медицинской визуализации',
			completionPercentage: 33,
			offlineMaterialTitle: 'Практикум',
			offlineMaterialText: 'Разбор рентгенограмм и МРТ-снимков',
			offlineMaterialDuration: '40 минут'
		}
	]

	return (
		<div className='space-y-5  mx-auto'>
			<h2 className='text-2xl font-semibold text-gray-900 mb-6'>
				Мои медицинские курсы
			</h2>
			{courses.map((course, index) => (
				<CourseProgressCard
					key={index}
					courseTitle={course.courseTitle}
					completionPercentage={course.completionPercentage}
					offlineMaterialTitle={course.offlineMaterialTitle}
					offlineMaterialText={course.offlineMaterialText}
					offlineMaterialDuration={course.offlineMaterialDuration}
				/>
			))}
		</div>
	)
}

export default CourseList
