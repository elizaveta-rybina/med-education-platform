import { selectUser } from '@/app/store/auth/selectors'
import {
	Achievements,
	MyFinances,
	ProfileContent,
	Settings,
	TabsSwitcher
} from '@/components/profile'
import MyLearningTabs from '@/components/profile/MyLearningTabs'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const PersonalAccountStudent = () => {
	const [activeTab, setActiveTab] = useState('Профиль')
	const userData = useSelector(selectUser)

	//console.log('userData', userData)

	const renderContent = () => {
		switch (activeTab) {
			case 'Профиль':
				return <ProfileContent userData={userData} />
			case 'Мое обучение':
				return <MyLearningTabs />
			case 'Мои покупки':
				return <MyFinances />
			case 'Достижения':
				return <Achievements />
			case 'Настройки':
				return <Settings />
			default:
				return <ProfileContent userData={userData} />
		}
	}

	return (
		<div className='flex flex-col items-center w-full'>
			<div className='w-full border-b border-gray-200'>
				<div className='mx-auto max-w-7xl px-6'>
					<TabsSwitcher onTabChange={setActiveTab} />
				</div>
			</div>
			<div className='w-full max-w-7xl p-6'>{renderContent()}</div>
		</div>
	)
}

export default PersonalAccountStudent
