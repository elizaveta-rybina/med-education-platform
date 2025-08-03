import { useTranslation } from 'react-i18next'

export const useNavItems = () => {
	const { t } = useTranslation('coursePage')

	return [
		{ label: t('navAbout'), anchor: 'about' },
		{ label: t('navModules'), anchor: 'modules' },
		{ label: t('navRecommendations'), anchor: 'recommendations' },
	]
}
