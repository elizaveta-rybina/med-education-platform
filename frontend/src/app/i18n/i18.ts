import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import ru from './ru'

const resources = { en, ru }

const savedLanguage = localStorage.getItem('language')
const defaultLanguage =
	savedLanguage === 'en' || savedLanguage === 'ru' ? savedLanguage : 'ru'

i18next.use(initReactI18next).init({
	resources,
	lng: defaultLanguage, // <-- тут теперь всегда 'ru', если в localStorage нет корректного значения
	fallbackLng: 'ru',
	interpolation: {
		escapeValue: false // React уже экранирует значения
	},
	react: {
		useSuspense: false
	}
})

export default i18next
