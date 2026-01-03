import { useEffect } from 'react'

declare global {
	interface Window {
		google: any
		googleTranslateElementInit: () => void
	}
}

const GoogleTranslate = () => {
	useEffect(() => {
		const STORAGE_KEY = 'preferredLanguage'
		const STORAGE_ACTUAL_KEY = 'preferredLanguageActual'
		let isApplying = false
		let cleanupInterval: number | null = null

		const setLanguage = (lang: string, triggerChange = false) => {
			const normalizedActual = lang || 'ru'
			const simplified = normalizedActual === 'ru' ? 'ru' : 'en'

			localStorage.setItem(STORAGE_KEY, simplified)
			localStorage.setItem(STORAGE_ACTUAL_KEY, normalizedActual)

			const translationPath =
				normalizedActual === 'ru' ? '/ru/ru' : `/ru/${normalizedActual}`
			document.cookie = `googtrans=${translationPath};path=/`
			document.cookie = `googtrans=${translationPath};domain=${window.location.hostname};path=/`

			const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo')
			if (combo) {
				isApplying = true
				if (combo.value !== normalizedActual) {
					combo.value = normalizedActual
				}
				if (triggerChange) {
					combo.dispatchEvent(new Event('change'))
				}
				isApplying = false
			}
		}

		const attachChangeListener = () => {
			const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo')
			if (!combo) return false

			combo.addEventListener('change', () => {
				if (isApplying) return
				const selected = combo.value || 'ru'
				setLanguage(selected, false)
			})
			return true
		}

		const applySavedLanguageIfReady = () => {
			const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo')
			if (!combo) return false
			const saved =
				localStorage.getItem(STORAGE_ACTUAL_KEY) ||
				localStorage.getItem(STORAGE_KEY) ||
				'ru'
			setLanguage(saved, true)
			attachChangeListener()
			return true
		}

		const hideTooltipFrame = () => {
			const tooltip = document.querySelector<HTMLIFrameElement>(
				'iframe[id=":2.container"]'
			)
			if (!tooltip) return false
			tooltip.style.display = 'none'
			tooltip.style.visibility = 'hidden'
			tooltip.style.pointerEvents = 'none'
			return true
		}

		const styleMenuIframe = () => {
			const iframe = document.querySelector<HTMLIFrameElement>(
				'iframe.goog-te-menu-frame'
			)
			const doc = iframe?.contentDocument || iframe?.contentWindow?.document
			if (!doc) return false

			const menu = doc.querySelector<HTMLElement>('.goog-te-menu2')
			if (!menu) return false

			menu.style.border = '1px solid #dde9ff'
			menu.style.backgroundColor = '#f2f7ff'
			menu.style.borderRadius = '10px'

			const frameBody = doc.body
			if (frameBody) {
				frameBody.style.backgroundColor = '#f2f7ff'
			}

			doc
				.querySelectorAll<HTMLElement>(
					'.goog-te-menu2-item div, .goog-te-menu2-item:link div, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div'
				)
				.forEach(el => {
					el.style.color = '#344054'
					el.style.backgroundColor = '#f2f7ff'
					el.style.fontFamily = '"Open Sans", Helvetica, Arial, sans-serif'
					el.style.padding = '20px 12px'
					el.style.transition = 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)'
				})

			doc
				.querySelectorAll<HTMLElement>('.goog-te-menu2-item div')
				.forEach(el => {
					const hoverIn = () => {
						el.style.backgroundColor = '#ecf3ff'
						el.style.borderRadius = '6px'
						const textSpan = el.querySelector<HTMLElement>('span.text')
						if (textSpan) {
							textSpan.style.color = '#465fff'
							textSpan.style.fontWeight = '600'
						}
					}
					const hoverOut = () => {
						el.style.backgroundColor = '#f2f7ff'
						el.style.borderRadius = '10px'
						const textSpan = el.querySelector<HTMLElement>('span.text')
						if (textSpan) {
							textSpan.style.color = '#344054'
							textSpan.style.fontWeight = '500'
						}
					}
					el.removeEventListener('mouseenter', hoverIn)
					el.removeEventListener('mouseleave', hoverOut)
					el.addEventListener('mouseenter', hoverIn)
					el.addEventListener('mouseleave', hoverOut)
				})

			const menuFrame = iframe
			if (menuFrame) {
				menuFrame.style.boxShadow =
					'0 10px 32px -4px rgba(70, 95, 255, 0.15), 0 4px 8px -2px rgba(70, 95, 255, 0.1)'
				menuFrame.style.border = 'none'
				menuFrame.style.borderRadius = '10px'
			}

			return true
		}

		const scheduleMenuStyling = () => {
			if (cleanupInterval !== null) window.clearInterval(cleanupInterval)
			let attempts = 0
			cleanupInterval = window.setInterval(() => {
				attempts += 1
				if (styleMenuIframe() || attempts > 40) {
					if (cleanupInterval !== null) window.clearInterval(cleanupInterval)
					cleanupInterval = null
				}
			}, 75)
		}

		window.googleTranslateElementInit = () => {
			new window.google.translate.TranslateElement(
				{
					pageLanguage: 'ru',
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

		const observer = new MutationObserver(() => {
			if (applySavedLanguageIfReady()) {
				observer.disconnect()
			}
		})

		observer.observe(document.body, { childList: true, subtree: true })

		const tooltipObserver = new MutationObserver(() => {
			hideTooltipFrame()
		})

		tooltipObserver.observe(document.body, { childList: true, subtree: true })

		const root = document.getElementById('google_translate_element')
		if (root) {
			root.addEventListener('click', scheduleMenuStyling)
		}

		return () => {
			observer.disconnect()
			tooltipObserver.disconnect()
			if (cleanupInterval !== null) window.clearInterval(cleanupInterval)
			if (root) root.removeEventListener('click', scheduleMenuStyling)
		}
	}, [])

	return <div id='google_translate_element'></div>
}

export default GoogleTranslate
