import { MainProviders } from '@/app/providers'
import { AppRouter } from '@/app/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

/**
 * Главный компонент приложения
 */
function App() {
	return (
		<MainProviders>
			<QueryClientProvider client={queryClient}>
				<div className='min-h-screen flex flex-col'>
					<main className='flex-1'>
						<AppRouter />
					</main>
				</div>
			</QueryClientProvider>
		</MainProviders>
	)
}

export default App
