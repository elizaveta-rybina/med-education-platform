import ThemeTogglerTwo from '@/components/common/ThemeTogglerTwo'
import React from 'react'
import authImage from '/images/auth/photo_2025-05-07_12-00-10.jpg'

/**
 * Компонент лейаута для страниц аутентификации (логин, регистрация и т.д.)
 *
 * @component
 * @param {React.ReactNode} children - Дочерние элементы (форма входа/регистрации)
 * @returns {JSX.Element} Возвращает JSX разметку лейаута
 *
 * @example
 * <AuthLayout>
 *   <LoginForm />
 * </AuthLayout>
 */
export default function AuthLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className='relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0'>
			{/* Основной контейнер */}
			<div className='relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0'>
				{children}

				{/* Фоновая картинка (видна только на десктопах) */}
				<div
					className='hidden lg:block lg:w-1/2 h-full bg-cover bg-center'
					style={{ backgroundImage: `url(${authImage})` }}
				></div>

				{/* Переключатель темы (фиксированный в правом нижнем углу) */}
				<div className='fixed z-50 hidden bottom-6 right-6 sm:block'>
					<ThemeTogglerTwo />
				</div>
			</div>
		</div>
	)
}
