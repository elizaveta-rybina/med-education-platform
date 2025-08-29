import { SignInForm } from '@/components/auth'
import { PageMeta } from '@/components/common'
import AuthLayout from './AuthPageLayout'

export const SignIn = () => {
	return (
		<>
			<PageMeta
				title='Вход в личный кабинет | Доктор VR'
				description='Страница входа в личный кабинет на образовательной платформе Доктор VR'
			/>
			<AuthLayout>
				<SignInForm />
			</AuthLayout>
		</>
	)
}
