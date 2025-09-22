import { useTranslation } from 'react-i18next'

interface ChapterHeaderProps {
	title: string
	isRead: boolean
}

export const ChapterHeader: React.FC<ChapterHeaderProps> = ({
	title,
	isRead
}) => {
	const { t } = useTranslation('courseInner')

	return (
		<h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center'>
			{title}
			{isRead && (
				<span className='ml-2 text-green-500 text-sm font-normal'>
					{t('completed')}
				</span>
			)}
		</h1>
	)
}
