import HeroSection from '@/components/shared/title'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
	const { t } = useTranslation('homePage')

	return (
		<div>
			<HeroSection
				title={t('title')}
				description={t('description')}
				buttonText={t('buttonText')}
				buttonHref='course/1'
				imageSrc='/src/assets/heroImage.webp'
				imageAlt={t('imageAlt')}
			/>
		</div>
	)
}

export default HomePage
