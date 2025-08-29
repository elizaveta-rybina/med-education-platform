import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { FaHome } from 'react-icons/fa'
import { MemoryRouter } from 'react-router-dom'
import { Card } from '../Card'
import { CardProps } from '../types'

// Упрощаем мок, убирая явные TypeScript-типы
jest.mock('@/shared/lib/utils', () => ({
	cn: (...args: string[]) => args.filter(Boolean).join(' ')
}))

describe('Card', () => {
	const defaultProps: CardProps = {
		icon: FaHome,
		label: 'Домашняя страница',
		href: '/home'
	}

	const renderCard = (props: Partial<CardProps> = {}) =>
		render(
			<MemoryRouter>
				<Card {...defaultProps} {...props} />
			</MemoryRouter>
		)

	test('рендерит компонент с корректной надписью и иконкой', () => {
		renderCard()

		expect(screen.getByText('Домашняя страница')).toBeInTheDocument()
		expect(screen.getByTestId('icon')).toBeInTheDocument()
	})

	test('устанавливает корректный href для ссылки', () => {
		renderCard()

		const link = screen.getByRole('link')
		expect(link).toHaveAttribute('href', '/home')
	})

	test('применяет пользовательские классы через className', () => {
		renderCard({ className: 'bg-gray-100' })

		const link = screen.getByRole('link')
		expect(link).toHaveClass('bg-gray-100')
		expect(link).toHaveClass(
			'flex items-center gap-3 p-4 bg-white border border-gray-200'
		)
	})

	test('иконка имеет атрибут aria-hidden', () => {
		renderCard()

		const icon = screen.getByTestId('icon')
		expect(icon).toHaveAttribute('aria-hidden', 'true')
	})

	test('рендерит корректно с другим label и href', () => {
		renderCard({ label: 'Профиль', href: '/profile' })

		expect(screen.getByText('Профиль')).toBeInTheDocument()
		expect(screen.getByRole('link')).toHaveAttribute('href', '/profile')
	})

	test('иконка имеет корректные Tailwind-классы', () => {
		renderCard()

		const icon = screen.getByTestId('icon')
		expect(icon).toHaveClass('w-6 h-6 text-purple-600')
	})

	test('компонент рендерится без ошибок с минимальными пропсами', () => {
		const { container } = renderCard()
		expect(container).toBeInTheDocument()
	})
})
