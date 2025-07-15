import { LoginData } from '@/app/store/auth/model'
import {
	selectAuthError,
	selectAuthStatus,
	selectUser
} from '@/app/store/auth/selectors'
import { login } from '@/app/store/auth/thunks'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from '../../icons'
import Label from '../form/Label'
import Input from '../form/input/InputField'
import Button from '../ui/button/Button'
import { ErrorAlert } from './ErrorAlert'

export default function SignInForm() {
	const dispatch = useAppDispatch()
	const status = useAppSelector(selectAuthStatus)
	const error = useAppSelector(selectAuthError)
	const user = useAppSelector(selectUser)
	const navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		watch,
		reset
	} = useForm<LoginData>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
			//remember_me: false
		}
	})

	//const isChecked = watch('remember_me')

	const onSubmit = async (data: LoginData) => {
		try {
			const result = await dispatch(login(data))

			if (login.fulfilled.match(result)) {
				reset()
				if (data.email.toLowerCase() === 'admin@example.com') {
					navigate('/admin/dashboard')
				} else {
					navigate('/profile')
				}
			}
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
					На главную
				</Link>
			</div>
			<div className='flex flex-col justify-center flex-1 w-full max-w-md mx-auto'>
				<div>
					<div className='mb-5 sm:mb-8'>
						<h1 className='mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md'>
							Войти в систему
						</h1>
						<p className='text-sm text-gray-500 dark:text-gray-400'>
							Введите вашу электронную почту и пароль для входа!
						</p>
					</div>
					<div>
						{/* <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5'>
							<button
								type='button'
								className='inline-flex items-center justify-center gap-3 py-2 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-5 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									fill='none'
								>
									<path
										d='M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z'
										fill='#FC3F1D'
									/>
									<path
										d='M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z'
										fill='#fff'
									/>
								</svg>
								Войти через Яндекс
							</button>
							<button
								type='button'
								className='inline-flex items-center justify-center gap-3 py-2 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-5 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 48 48'
									fill='none'
								>
									<path
										d='M0 23.04C0 12.1788 0 6.74826 3.37413 3.37413C6.74826 0 12.1788 0 23.04 0H24.96C35.8212 0 41.2517 0 44.6259 3.37413C48 6.74826 48 12.1788 48 23.04V24.96C48 35.8212 48 41.2517 44.6259 44.6259C41.2517 48 35.8212 48 24.96 48H23.04C12.1788 48 6.74826 48 3.37413 44.6259C0 41.2517 0 35.8212 0 24.96V23.04Z'
										fill='#0077FF'
									/>
									<path
										d='M25.54 34.5801C14.6 34.5801 8.3601 27.0801 8.1001 14.6001H13.5801C13.7601 23.7601 17.8 27.6401 21 28.4401V14.6001H26.1602V22.5001C29.3202 22.1601 32.6398 18.5601 33.7598 14.6001H38.9199C38.0599 19.4801 34.4599 23.0801 31.8999 24.5601C34.4599 25.7601 38.5601 28.9001 40.1201 34.5801H34.4399C33.2199 30.7801 30.1802 27.8401 26.1602 27.4401V34.5801H25.54Z'
										fill='white'
									/>
								</svg>
								Войти через VK ID
							</button>
						</div> */}
						{/* <div className='relative py-3 sm:py-5'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-200 dark:border-gray-800'></div>
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2'>
									Или
								</span>
							</div>
						</div> */}
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
							<div>
								<Label>
									Электронная почта <span className='text-error-500'>*</span>
								</Label>
								<Input
									placeholder='info@gmail.com'
									{...register('email', {
										required: 'Email обязателен',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: 'Некорректный email'
										}
									})}
									error={errors.email?.message}
								/>
							</div>

							<div>
								<Label>
									Пароль <span className='text-error-500'>*</span>
								</Label>
								<div className='relative'>
									<Input
										type={showPassword ? 'text' : 'password'}
										placeholder='Введите пароль'
										{...register('password', {
											required: 'Пароль обязателен',
											minLength: {
												value: 6,
												message: 'Пароль должен быть не менее 6 символов'
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
								{/* <div className='flex items-center gap-3'>
									<Checkbox
										checked={isChecked}
										onChange={checked => setValue('remember_me', checked)}
									/>
									<span className='block font-normal text-gray-700 text-theme-sm dark:text-gray-400'>
										Запомнить меня
									</span>
								</div> */}
								<Link
									to='/reset-password'
									className='text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400'
								>
									Забыли пароль?
								</Link>
							</div>

							<ErrorAlert error={error} />

							<div>
								<Button
									className='w-full'
									size='sm'
									type='submit'
									disabled={status === 'loading' || !isValid}
									//loading={status === 'loading'}
								>
									Войти
								</Button>
							</div>
						</form>

						<div className='mt-5'>
							<p className='text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start'>
								Нет аккаунта? {''}
								<Link
									to='/signup'
									className='text-brand-500 hover:text-brand-600 dark:text-brand-400'
								>
									Зарегистрироваться
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
