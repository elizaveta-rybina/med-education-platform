import { StepCard } from '@/entities/course_steps'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const CourseSteps = () => {
	const { t } = useTranslation('coursePage')

	const animationProps = {
		initial: { opacity: 0, y: 50 },
		whileInView: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 50 },
		transition: { duration: 0.6, ease: 'easeOut' as const },
		viewport: { amount: 0.3 }
	}

	return (
		<div className='mt-25 bg-[url(@/assets/howItWorkBack.svg)] bg-no-repeat bg-contain bg-[center_100px]'>
			<motion.h2
				className='bg-gradient-to-r from-[#6C3F99] to-[#BE1B86] bg-clip-text text-transparent text-center justify-start text-6xl/tight italic font-bold mb-25'
				style={{ originY: 0.5 }}
				{...animationProps}
			>
				{t('steps.title')}
			</motion.h2>
			<div className='flex flex-col gap-11'>
				<motion.div
					className='self-start'
					style={{ originY: 0.5 }}
					{...animationProps}
				>
					<StepCard number={1} text={t('steps.step1')} />
				</motion.div>
				<motion.div
					className='self-center'
					style={{ originY: 0.5 }}
					{...animationProps}
				>
					<StepCard
						color='#903091'
						gradientTop='#5E055F'
						number={2}
						text={t('steps.step2')}
					/>
				</motion.div>
				<motion.div
					className='self-end'
					style={{ originY: 0.5 }}
					{...animationProps}
				>
					<StepCard
						gradientTop='rgba(120, 4, 84, 0.86)'
						color='#B81E88'
						number={3}
						text={t('steps.step3')}
					/>
				</motion.div>
			</div>
		</div>
	)
}
