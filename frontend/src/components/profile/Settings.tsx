import { useState } from 'react'
export const Settings = () => {
	const [notifications, setNotifications] = useState(true)
	const [darkMode, setDarkMode] = useState(false)

	return (
		<div className='space-y-6'>
			<div className='bg-white rounded-lg shadow-sm p-6'>
				<h2 className='text-xl font-semibold text-gray-900 mb-6'>
					Настройки аккаунта
				</h2>

				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<div>
							<h3 className='font-medium text-gray-900'>Email-уведомления</h3>
							<p className='text-sm text-gray-500'>
								Получать новости и обновления
							</p>
						</div>
						<label className='relative inline-flex items-center cursor-pointer'>
							<input
								type='checkbox'
								className='sr-only peer'
								checked={notifications}
								onChange={() => setNotifications(!notifications)}
							/>
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
						</label>
					</div>

					<div className='flex items-center justify-between'>
						<div>
							<h3 className='font-medium text-gray-900'>Темная тема</h3>
							<p className='text-sm text-gray-500'>Переключить интерфейс</p>
						</div>
						<label className='relative inline-flex items-center cursor-pointer'>
							<input
								type='checkbox'
								className='sr-only peer'
								checked={darkMode}
								onChange={() => setDarkMode(!darkMode)}
							/>
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
						</label>
					</div>
				</div>
			</div>

			<div className='bg-white rounded-lg shadow-sm p-6'>
				<h2 className='text-xl font-semibold text-gray-900 mb-6'>
					Безопасность
				</h2>
				<div className='space-y-4 gap-2'>
					<button className='w-full md:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors'>
						Сменить пароль
					</button>
					<button className='w-full md:w-auto px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors'>
						Удалить аккаунт
					</button>
				</div>
			</div>
		</div>
	)
}
