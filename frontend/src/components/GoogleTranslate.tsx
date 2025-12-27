import { useEffect } from 'react'

declare global {
	interface Window {
		google: any
		googleTranslateElementInit: () => void
	}
}

const GoogleTranslate = () => {
	useEffect(() => {
		window.googleTranslateElementInit = () => {
			new window.google.translate.TranslateElement(
				{
					pageLanguage: 'ru',
					// 👇 ДОБАВИЛ 'hi' (Хинди) в этот список
					includedLanguages: 'ru,en,de,fr,es,it,zh-CN,ar,hi',
					layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
					autoDisplay: false
				},
				'google_translate_element'
			)
		}

		const scriptId = 'google-translate-script'
		if (!document.getElementById(scriptId)) {
			const script = document.createElement('script')
			script.id = scriptId
			script.type = 'text/javascript'
			script.src =
				'//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
			script.async = true
			document.body.appendChild(script)
		}
	}, [])

	return <div id='google_translate_element'></div>
}

export default GoogleTranslate
