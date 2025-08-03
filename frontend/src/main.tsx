import App from '@/app/App.tsx'
import '@/app/i18n/i18.ts'
import 'flatpickr/dist/flatpickr.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'swiper/swiper-bundle.css'
import { AppWrapper } from './components/common/PageMeta.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<AppWrapper>
				<App />
			</AppWrapper>
		</ThemeProvider>
	</StrictMode>
)
