import { useTranslation } from 'react-i18next'

export const useSkills = () => {
	const { t } = useTranslation('coursePage')

	return [
		t('criticalThinking'),
		t('problemSolving'),
		t('analyticalThinking'),
		t('abstractThinking'),
		t('reasoning'),
		t('logicalThinking'),
		t('creativity'),
		t('decisionMaking'),
	]
}
