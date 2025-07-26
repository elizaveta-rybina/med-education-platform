import { useState } from 'react'
import CourseList from './course/CourseList'

const MyLearningTabs = () => {
	const [activeTab, setActiveTab] = useState<'in-progress' | 'completed'>(
		'in-progress'
	)

	return (
		<div className='space-y-6'>
			<h1 className='text-2xl font-bold text-gray-900'>Мои курсы</h1>

			<div className='flex space-x-4 border-b border-gray-200 pb-4'>
				<button
					onClick={() => setActiveTab('in-progress')}
					className={`px-4 py-2 text-sm font-medium rounded-md ${
						activeTab === 'in-progress'
							? 'bg-purple-100 text-gray-700'
							: 'text-gray-500 hover:text-gray-700 hover:bg-purple-50'
					}`}
				>
					В процессе
				</button>
				<button
					onClick={() => setActiveTab('completed')}
					className={`px-4 py-2 text-sm font-medium rounded-md ${
						activeTab === 'completed'
							? 'bg-purple-100 text-gray-700'
							: 'text-gray-500 hover:text-gray-700 hover:bg-purple-50'
					}`}
				>
					Пройденные
				</button>
			</div>

			<div>
				{activeTab === 'in-progress' ? (
					<CourseList />
				) : (
					<p>Контент для завершенных курсов</p>
				)}
			</div>
		</div>
	)
}

export default MyLearningTabs
