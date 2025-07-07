import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface ProfileContentProps {
	userData: {
		last_name?: string | null
		first_name?: string | null
		middle_name?: string | null
		username?: string | null
		email?: string | null
		phone_number?: string | null
		birth_date?: string | null
		is_verified?: boolean
		created_at?: string
		roles?: Array<{
			description?: string
		}>
		education?: {
			faculty?: string | null
			specialization?: string | null
			course?: number | null
			group?: string | null
			is_current?: boolean
			start_date?: string
		} | null
	} | null
	isLoading?: boolean
}

export const ProfileContent = ({
	userData,
	isLoading = false
}: ProfileContentProps) => {
	const formatDate = (dateString?: string | null) => {
		if (!dateString) return 'Не указана'
		try {
			return format(new Date(dateString), 'dd.MM.yyyy', { locale: ru })
		} catch {
			return 'Неверный формат даты'
		}
	}

	const fullName =
		[userData?.last_name, userData?.first_name, userData?.middle_name]
			.filter(name => name != null && name.trim() !== '')
			.join(' ') || 'Не указано'

	if (isLoading) {
		return <div className='space-y-6' />
	}

	if (!userData) {
		return (
			<div className='bg-white dark:bg-gray-900 rounded-xl shadow p-6 text-center'>
				<p className='text-gray-500 dark:text-gray-400'>
					Данные пользователя не загружены
				</p>
			</div>
		)
	}

	const sectionClass = 'bg-white dark:bg-gray-950 rounded-xl shadow p-6'
	const labelClass = 'text-sm text-gray-500 dark:text-gray-400'
	const valueClass = 'text-gray-900 dark:text-gray-100'
	const buttonClass =
		'mt-6 px-4 py-2 rounded-lg text-sm font-medium bg-violet-100 hover:bg-violet-200 text-violet-800 transition-colors'

	return (
		<div className='space-y-8'>
			<div className={sectionClass}>
				<h2 className='text-xl font-semibold text-black dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2'>
					Личные данные
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='space-y-1'>
						<label className={labelClass}>ФИО</label>
						<p className={valueClass}>{fullName}</p>
					</div>

					<div className='space-y-1'>
						<label className={labelClass}>Логин</label>
						<p className={valueClass}>{userData.username || 'Не указан'}</p>
					</div>

					<div className='space-y-1'>
						<label className={labelClass}>Email</label>
						<p className={valueClass}>{userData.email || 'Не указан'}</p>
					</div>

					<div className='space-y-1'>
						<label className={labelClass}>Телефон</label>
						<p className={valueClass}>{userData.phone_number || 'Не указан'}</p>
					</div>

					<div className='space-y-1'>
						<label className={labelClass}>Дата рождения</label>
						<p className={valueClass}>{formatDate(userData.birth_date)}</p>
					</div>

					<div className='space-y-1'>
						<label className={labelClass}>Дата регистрации</label>
						<p className={valueClass}>{formatDate(userData.created_at)}</p>
					</div>

					<div className='space-y-1'>
						<label className={labelClass}>Статус верификации</label>
						<p className={valueClass}>
							{userData.is_verified ? (
								<span className='text-green-600'>Подтвержден</span>
							) : (
								<span className='text-yellow-600'>Требуется подтверждение</span>
							)}
						</p>
					</div>

					<div className='space-y-1'>
						<label className={labelClass}>Роль</label>
						<p className={valueClass}>
							{userData.roles?.[0]?.description || 'Не указана'}
						</p>
					</div>
				</div>
				<button className={buttonClass}>Редактировать профиль</button>
			</div>

			{userData.education && (
				<div className={sectionClass}>
					<h2 className='text-xl font-semibold text-black dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2'>
						Образование
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='space-y-1'>
							<label className={labelClass}>Факультет</label>
							<p className={valueClass}>
								{userData.education.faculty || 'Не указан'}
							</p>
						</div>

						<div className='space-y-1'>
							<label className={labelClass}>Специализация</label>
							<p className={valueClass}>
								{userData.education.specialization || 'Не указана'}
							</p>
						</div>

						<div className='space-y-1'>
							<label className={labelClass}>Курс</label>
							<p className={valueClass}>
								{userData.education.course ?? 'Не указан'}
							</p>
						</div>

						<div className='space-y-1'>
							<label className={labelClass}>Группа</label>
							<p className={valueClass}>
								{userData.education.group || 'Не указана'}
							</p>
						</div>

						<div className='space-y-1'>
							<label className={labelClass}>Статус обучения</label>
							<p className={valueClass}>
								{userData.education.is_current ? (
									<span className='text-green-600'>Обучается</span>
								) : (
									<span className='text-gray-500'>Завершено</span>
								)}
							</p>
						</div>

						<div className='space-y-1'>
							<label className={labelClass}>Дата поступления</label>
							<p className={valueClass}>
								{formatDate(userData.education.start_date)}
							</p>
						</div>
					</div>
					<button className={buttonClass}>Редактировать образование</button>
				</div>
			)}
		</div>
	)
}
