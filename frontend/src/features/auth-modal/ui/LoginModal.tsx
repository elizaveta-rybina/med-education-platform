import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface LoginFormData {
	email: string
	password: string
	remember: boolean
}

interface LoginModalProps {
	isOpen: boolean
	onClose: () => void
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
	const { t } = useTranslation('coursePage')
	const [formData, setFormData] = useState<LoginFormData>({
		email: '',
		password: '',
		remember: false
	})
	const [sessionExpired, setSessionExpired] = useState(false)

	useEffect(() => {
		// Check if redirected due to session expiration
		const params = new URLSearchParams(window.location.search)
		if (params.get('session') === 'expired') {
			setSessionExpired(true)
			// Clear the query parameter
			window.history.replaceState({}, '', window.location.pathname)
		}
	}, [])

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onClose()
			}
		}
		window.addEventListener('keydown', handleEscape)
		return () => window.removeEventListener('keydown', handleEscape)
	}, [isOpen, onClose])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (formData.email === 'med' && formData.password === 'student') {
			localStorage.setItem('auth', 'true')
			onClose()
		} else {
			alert(t('auth.invalidCredentials'))
		}
	}

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	if (!isOpen) return null

	return (
		<div
			id='authentication-modal'
			tabIndex={-1}
			aria-hidden='true'
			className='fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-opacity-10 backdrop-blur-sm'
			onClick={handleBackdropClick}
		>
			<div className='relative p-4 w-full max-w-md max-h-full'>
				<div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-700'>
					<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
							{t('auth.title')}
						</h3>
						<button
							type='button'
							className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
							onClick={onClose}
						>
							<svg
								className='w-3 h-3'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 14 14'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
								/>
							</svg>
							<span className='sr-only'>Close modal</span>
						</button>
					</div>
					<div className='p-4 md:p-5'>
						{sessionExpired && (
							<div className='mb-4 p-3 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300'>
								Ваша сессия истекла. Пожалуйста, войдите снова.
							</div>
						)}
						<div className='space-y-4'>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									{t('auth.email')}
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
									placeholder='name@company.com'
									required
									value={formData.email}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									{t('auth.password')}
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
									required
									value={formData.password}
									onChange={handleInputChange}
								/>
							</div>

							<button
								type='button'
								onClick={handleSubmit}
								className='w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800'
							>
								{t('auth.button')}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
