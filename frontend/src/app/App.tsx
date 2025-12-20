import { MainProviders } from '@/app/providers'
import { AppRouter } from '@/app/routes'
import { AutoLogin } from '@/components/AutoLogin'
import { SidebarProvider } from '@/context/SidebarContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
	return (
		<MainProviders>
			<QueryClientProvider client={queryClient}>
				<SidebarProvider>
					<AutoLogin />
					<div className='min-h-screen flex flex-col'>
						<main className='flex-1'>
							<AppRouter />
						</main>
					</div>
				</SidebarProvider>
			</QueryClientProvider>
		</MainProviders>
	)
}

export default App
