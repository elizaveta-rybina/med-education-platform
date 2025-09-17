import courseImage from '@/assets/courseImage.svg'
import { CourseButton, CourseTitle, ModuleInfo } from '@/entities'
import { useTranslation } from 'react-i18next'

export const CourseInfo = () => {
	const { t } = useTranslation('coursePage')
	return (
		<div>
			<CourseTitle
				title={
					<>
						<span className='lg:text-8xl font-extrabold bg-gradient-to-r from-[#6C3F99] to-[#BE1B86] bg-clip-text text-transparent drop-shadow-lg sm:text-4xl'>
							{t('title')}
							<br />
						</span>
						<span className='block my-4 text-3xl font-semibold bg-gradient-to-r from-[#753B97] to-[#B71E88] bg-clip-text text-transparent drop-shadow-lg'>
							{t('subtitle')}
						</span>
					</>
				}
				description={t('description')}
				imageAlt={t('imageAlt')}
				imageSrc={courseImage}
			/>
			<div className='flex justify-between my-15'>
				<ModuleInfo
					topText={t('modules.top')}
					bottomText={t('modules.bottom')}
				/>
				<ModuleInfo topText={t('time.top')} bottomText={t('time.bottom')} />
				<ModuleInfo topText={t('course.top')} bottomText={t('course.bottom')} />
			</div>
			<CourseButton targetId='' />
		</div>
	)
}
