interface ErrorMap {
	[key: string]: string
}

const errorTranslationMap: ErrorMap = {
	'Network Error': 'Проблема с подключением к интернету.',
	'Request failed with status code 400': 'Неверный запрос.',
	'Request failed with status code 401': 'Неверный логин или пароль',
	'Request failed with status code 403': 'Нет доступа к ресурсу.',
	'Request failed with status code 404': 'Ресурс не найден.',
	'Request failed with status code 500': 'Внутренняя ошибка сервера.',
	'timeout exceeded': 'Превышено время ожидания ответа.',
	ECONNABORTED: 'Запрос был прерван из-за тайм-аута.'
}

export const getErrorMessage = (error: unknown): string => {
	if (!error) return 'Неизвестная ошибка.'

	if (typeof error === 'string') {
		return errorTranslationMap[error] || `Ошибка: ${error}`
	}

	if (error instanceof Error) {
		const translated = errorTranslationMap[error.message]
		return translated || `Ошибка: ${error.message}`
	}

	if (typeof error === 'object' && error !== null) {
		const err = error as any

		// Axios-style error with response
		if (err.response && err.response.data) {
			const message =
				err.response.data.message ||
				err.response.data.error ||
				JSON.stringify(err.response.data)

			return errorTranslationMap[message] || `Ошибка: ${message}`
		}

		// Fetch-style or unknown object error
		if (err.message) {
			return errorTranslationMap[err.message] || `Ошибка: ${err.message}`
		}
	}

	return 'Произошла неизвестная ошибка.'
}
