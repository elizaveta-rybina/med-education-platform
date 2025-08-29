import { LoginData } from '@/app/store/auth/model'
import { selectAuthError, selectAuthStatus } from '@/app/store/auth/selectors'
import { useAppSelector } from '@/app/store/hooks'
import { useAuthActions } from '@/hooks/auth/useAuthActions'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from '../../icons'
import Label from '../form/Label'
import Input from '../form/input/InputField'
import Button from '../ui/button/Button'
import { ErrorAlert } from './ErrorAlert'

export const SignInForm = () => {
	const { t } = useTranslation('auth')
	const status = useAppSelector(selectAuthStatus)
	const error = useAppSelector(selectAuthError)
	const { login } = useAuthActions()
	const [showPassword, setShowPassword] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset
	} = useForm<LoginData>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = async (data: LoginData) => {
		try {
			await login(data)
			reset()
		} catch (err) {
			console.error('Login error:', err)
		}
	}

	return (
		<div className='flex flex-col flex-1'>
			<div className='w-full max-w-md pt-10 mx-auto'>
				<Link
					to='/'
					className='inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
				>
					<ChevronLeftIcon className='size-5' />
					{t('backToHome')}
				</Link>
			</div>
			<div className='flex flex-col justify-center flex-1 w-full max-w-md mx-auto'>
				<div>
					<div className='mb-5 sm:mb-8'>
						<h1 className='mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md'>
							{t('signInTitle')}
						</h1>
						<p className='text-sm text-gray-500 dark:text-gray-400'>
							{t('signInDescription')}
						</p>
					</div>
					<div>
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
							<div>
								<Label>
									{t('emailLabel')} <span className='text-error-500'>*</span>
								</Label>
								<Input
									placeholder={t('enterEmail')}
									{...register('email', {
										required: t('emailRequired'),
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: t('emailInvalid')
										}
									})}
									error={errors.email?.message}
								/>
							</div>

							<div>
								<Label>
									{t('passwordLabel')} <span className='text-error-500'>*</span>
								</Label>
								<div className='relative'>
									<Input
										type={showPassword ? 'text' : 'password'}
										placeholder={t('enterPassword')}
										{...register('password', {
											required: t('passwordRequired'),
											minLength: {
												value: 6,
												message: t('passwordMinLength')
											}
										})}
										error={errors.password?.message}
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute z-30 -translate-y-1/2 right-4 top-1/2'
									>
										{showPassword ? (
											<EyeIcon className='fill-gray-500 dark:fill-gray-400 size-5' />
										) : (
											<EyeCloseIcon className='fill-gray-500 dark:fill-gray-400 size-5' />
										)}
									</button>
								</div>
							</div>

							<div className='flex items-center justify-between'>
								<Link
									to='/reset-password'
									className='text-sm text-purple-500 hover:text-purple-600 dark:text-purple-400'
								>
									{t('forgotPassword')}
								</Link>
							</div>

							<ErrorAlert error={error} />

							<div>
								<Button
									className='w-full'
									size='sm'
									type='submit'
									disabled={status === 'loading' || !isValid}
								>
									{t('signInButton')}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
