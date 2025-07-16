import { persistor, store } from '@/app/store'
import { ThemeProvider } from '@/context/ThemeContext'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

interface MainProvidersProps {
	children: ReactNode
}

export const MainProviders = ({ children }: MainProvidersProps) => {
	return (
		<Provider store={store}>
			<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
				<ThemeProvider>{children}</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}
