import { useTranslation } from 'react-i18next'
import anatomy from '../assets/anatomy.jpg'
import gynecology from '../assets/gynecology.png'
import neurology from '../assets/neurology.jpg'
import pharmacology from '../assets/pharmacology.jpg'
import physiology from '../assets/physiology.jpeg'

export interface Course {
	id?: number
	imageUrl: string
	imageAlt?: string
	title: string
	description: string
	buttonText?: string
	buttonLink?: string
	duration?: string
	modulesCount?: number
	isAvailable?: boolean
	className?: string
}

export const useCourses = (): Course[] => {
	const { t } = useTranslation('coursePage')

	return [
		{
			id: 1,
			imageUrl: anatomy,
			imageAlt: t('anatomyImageAlt'),
			title: t('anatomyTitle'),
			description: t('anatomyDescription'),
			buttonText: t('learnMore'),
			buttonLink: '/404',
			duration: '36 часов',
			modulesCount: 8,
			isAvailable: false,
		},
		{
			id: 2,
			imageUrl: pharmacology,
			imageAlt: t('pharmacologyImageAlt'),
			title: t('pharmacologyTitle'),
			description: t('pharmacologyDescription'),
			buttonText: t('learnMore'),
			buttonLink: '/404',
			duration: '28 часов',
			modulesCount: 6,
			isAvailable: false,
		},
		{
			id: 3,
			imageUrl: neurology,
			imageAlt: t('neurologyImageAlt'),
			title: t('neurologyTitle'),
			description: t('neurologyDescription'),
			buttonLink: '/404',
			duration: '32 часа',
			modulesCount: 7,
			isAvailable: false,
		},
		{
			id: 4,
			imageUrl: gynecology,
			imageAlt: t('gynecologyImageAlt'),
			title: t('gynecologyTitle'),
			description: t('gynecologyDescription'),
			buttonText: t('learnMore'),
			buttonLink: '/404',
			duration: '40 часов',
			modulesCount: 9,
			isAvailable: false,
		},
		{
			id: 5,
			imageUrl: physiology,
			imageAlt: t('physiologyImageAlt'),
			title: t('physiologyTitle'),
			description: t('physiologyDescription'),
			buttonText: t('startCourse'),
			buttonLink: '/courses',
			duration: '30 часов',
			modulesCount: 5,
		},
	]
}
