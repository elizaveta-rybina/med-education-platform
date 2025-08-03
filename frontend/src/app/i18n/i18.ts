import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import ru from './ru'

const resources = {
	en,
	ru,
}

i18next.use(initReactI18next).init({
	resources,
	lng: localStorage.getItem('language') || 'en',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false, // React already escapes values
	},
	react: {
		useSuspense: false, // Disable suspense to avoid issues in some setups
	},
})

export default i18next
