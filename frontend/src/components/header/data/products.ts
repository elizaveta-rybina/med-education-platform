import {
	ArrowPathIcon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Product } from './types'

export const useProducts = (): Product[] => {
	const { t } = useTranslation('header')

	return [
		{
			name: t('theory'),
			description: t('theoryDescription'),
			to: '/courses/theory',
			icon: ChartPieIcon,
		},
		{
			name: t('webinars'),
			description: t('webinarsDescription'),
			to: '/courses/webinars',
			icon: CursorArrowRaysIcon,
		},
		{
			name: t('certification'),
			description: t('certificationDescription'),
			to: '/courses/certification',
			icon: FingerPrintIcon,
		},
		{
			name: t('resources'),
			description: t('resourcesDescription'),
			to: '/resources',
			icon: SquaresPlusIcon,
		},
		{
			name: t('support'),
			description: t('supportDescription'),
			to: '/support',
			icon: ArrowPathIcon,
		},
	]
}
