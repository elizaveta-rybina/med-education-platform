import {
	modules_fisrt_semester,
	modules_second_semester,
	ModuleTabs,
	TextModuleBlock
} from '@/entities/course_modules'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const CourseModules = () => {
	const { i18n, t } = useTranslation('coursePage')
	const language = i18n.language.startsWith('ru') ? 'ru' : 'en'

	const animationProps = {
		initial: { opacity: 0, y: 50 },
		whileInView: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 50 },
		transition: { duration: 0.6, ease: 'easeOut' as const }, // Explicitly type ease as a literal
		viewport: { amount: 0.3 }
	}

	return (
		<div>
			<motion.h2
				className='bg-gradient-to-r from-[#6C3F99] to-[#BE1B86] bg-clip-text text-transparent text-center justify-start text-6xl/tight italic font-bold mb-25 mt-40'
				style={{ originY: 0.5 }}
				{...animationProps}
			>
				{t('card_modules.title')}
			</motion.h2>
			<motion.div
				className='flex flex-row justify-around gap-20'
				style={{ originY: 0.5 }}
				{...animationProps}
			>
				<TextModuleBlock
					title={t('card_modules.first_semester_title')}
					text={t('card_modules.first_semester_description')}
				/>
				<ModuleTabs modules={modules_fisrt_semester} language={language} />
			</motion.div>
			<motion.div
				className='flex flex-row justify-around gap-20 mt-30'
				style={{ originY: 0.5 }}
				{...animationProps}
			>
				<ModuleTabs modules={modules_second_semester} language={language} />
				<TextModuleBlock
					title={t('card_modules.second_semester_title')}
					text={t('card_modules.second_semester_description')}
				/>
			</motion.div>
		</div>
	)
}
