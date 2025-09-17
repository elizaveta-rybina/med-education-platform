import { PartnerCard, partnersData } from '@/entities/course_partners'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const CoursePartners = () => {
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
		<div className='mt-25 bg-[url(@/assets/partnership_background.svg)] bg-no-repeat bg-[center_-160px] bg-[length:100%]'>
			<motion.h2
				className='bg-gradient-to-r from-[#6C3F99] to-[#BE1B86] bg-clip-text text-transparent text-center justify-start text-6xl/tight italic font-bold mb-25 mt-50'
				style={{ originY: 0.5 }}
				{...animationProps}
			>
				{t('partners.title')}
			</motion.h2>
			<motion.div
				className='flex flex-row justify-around gap-20'
				style={{ originY: 0.5 }}
				{...animationProps}
			>
				<PartnerCard partners={partnersData} language={language} />
			</motion.div>
		</div>
	)
}
