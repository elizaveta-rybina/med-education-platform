import { store } from '@/app/store/mainStore'
import { ThemeProvider } from '@/context/ThemeContext'
import { Provider } from 'react-redux'

export const MainProviders: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	return (
		<Provider store={store}>
			<ThemeProvider>{children}</ThemeProvider>
		</Provider>
	)
}
