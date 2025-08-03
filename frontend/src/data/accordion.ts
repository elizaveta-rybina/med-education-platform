import { useTranslation } from 'react-i18next'

export const useModulesData = () => {
	const { t } = useTranslation('coursePage')

	return [
		{
			title: t('module1Title'),
			moduleNumber: '1',
			timeRemaining: t('module1TimeRemaining'),
			description: t('module1Description'),
			topics: [
				{ title: t('module1Topic1'), duration: '10 минут', completed: true },
				{ title: t('module1Topic2'), duration: '12 минут', completed: true },
				{ title: t('module1Topic3'), duration: '10 минут', completed: false },
			],
			hasFinalTest: true,
			totalTopics: 3,
			completedTopics: 2,
			isUserRegistered: true,
		},
		{
			title: t('module2Title'),
			moduleNumber: '2',
			timeRemaining: t('module2TimeRemaining'),
			description: t('module2Description'),
			topics: [
				{ title: t('module2Topic1'), duration: '15 минут', completed: true },
				{ title: t('module2Topic2'), duration: '15 минут', completed: false },
				{ title: t('module2Topic3'), duration: '15 минут', completed: false },
			],
			hasFinalTest: true,
			totalTopics: 3,
			completedTopics: 1,
			isUserRegistered: true,
		},
		{
			title: t('module3Title'),
			moduleNumber: '3',
			timeRemaining: t('module3TimeRemaining'),
			description: t('module3Description'),
			topics: [
				{ title: t('module3Topic1'), duration: '12 минут', completed: false },
				{ title: t('module3Topic2'), duration: '13 минут', completed: false },
				{ title: t('module3Topic3'), duration: '13 минут', completed: false },
			],
			hasFinalTest: true,
			totalTopics: 3,
			completedTopics: 0,
			isUserRegistered: true,
		},
		{
			title: t('module4Title'),
			moduleNumber: '4',
			timeRemaining: t('module4TimeRemaining'),
			description: t('module4Description'),
			topics: [
				{ title: t('module4Topic1'), duration: '15 минут', completed: false },
				{ title: t('module4Topic2'), duration: '17 минут', completed: false },
				{ title: t('module4Topic3'), duration: '20 минут', completed: false },
			],
			hasFinalTest: true,
			totalTopics: 3,
			completedTopics: 0,
			isUserRegistered: true,
		},
		{
			title: t('module5Title'),
			moduleNumber: '5',
			timeRemaining: t('module5TimeRemaining'),
			description: t('module5Description'),
			topics: [
				{ title: t('module5Topic1'), duration: '12 минут', completed: false },
				{ title: t('module5Topic2'), duration: '14 минут', completed: false },
				{ title: t('module5Topic3'), duration: '14 минут', completed: false },
			],
			hasFinalTest: true,
			totalTopics: 3,
			completedTopics: 0,
			isUserRegistered: true,
		},
	]
}
