import { StepCard } from '@/entities/course_steps'
import { useTranslation } from 'react-i18next'

export const CourseSteps = () => {
	const { t } = useTranslation('coursePage')

	return (
		<div className='mt-25 bg-[url(@/assets/howItWorkBack.svg)] bg-no-repeat bg-contain bg-[center_100px]'>
			<h2 className='bg-gradient-to-r from-[#6C3F99] to-[#BE1B86] bg-clip-text text-transparent text-center justify-start  text-6xl italic font-bold mb-25'>
				{t('steps.title')}
			</h2>
			<div className='flex flex-col gap-11'>
				<div className='self-start'>
					<StepCard number={1} text={t('steps.step1')} />
				</div>

				<div className='self-center'>
					<StepCard
						color='#903091'
						gradientTop='#5E055F'
						number={2}
						text={t('steps.step2')}
					/>
				</div>

				<div className='self-end'>
					<StepCard
						gradientTop='rgba(120, 4, 84, 0.86)'
						color='#B81E88'
						number={3}
						text={t('steps.step3')}
					/>
				</div>
			</div>
		</div>
	)
}
