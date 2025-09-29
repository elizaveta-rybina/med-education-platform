const ru = {
	coursePage: {
		auth: {
			button: 'Войти',
			title: 'Войти в систему',
			email: 'Электронная почта',
			password: 'Пароль',
			invalidCredentials: 'Неверный email или пароль',
			logout: 'Выйти'
		},
		info: {
			title: 'Доктор VR:',
			subtitle: 'Виртуальная лаборатория по физиологии',
			description:
				'Клинические кейсы, визуальные эксперименты и наглядный материал — всё, чтобы прокачать клиническое мышление и сдать экзамен уверенно!',
			imageAlt: 'Молния',
			goToModules: 'Перейти к модулям',
			modules: {
				top: '26 модулей',
				bottom: 'Доступно для прохождения'
			},
			time: {
				top: '25 минут',
				bottom: 'И тема усвоена'
			},
			course: {
				top: '2-3 курс',
				bottom: 'Для тех, кому пора\nот зубрёжки к практике'
			}
		},
		steps: {
			title: 'Как это работает?',
			step1: 'Читаешь теорию и\n закрепляешь материал тестом',
			step2: 'Решаешь клиническую задачу',
			step3:
				'Моделируешь патологические\n процессы в режиме \nреального времени'
		},
		card_modules: {
			title: 'Модули',
			first_semester_title: '1 семестр',
			second_semester_title: '2 семестр',
			first_semester_description:
				'В первом семестре вы познакомитесь с основами патологической физиологии: узнаете, как повреждаются клетки, почему возникают воспаление, гипоксия, аллергия, опухолевый рост и другие типовые патологические процессы. Эти знания помогут понять, с чего начинаются болезни и как организм пытается справиться с нарушениями.',
			second_semester_description:
				'Во втором семестре вы перейдёте к изучению частной патофизиологии —  разберёте, как именно болезни проявляются в разных системах организма: дыхательной, сердечно-сосудистой, пищеварительной, нервной, эндокринной и других. \nЗдесь вы увидите, как общие механизмы превращаются в конкретные клинические ситуации.'
		},
		partners: {
			title: 'Наши партнёры'
		},
		footer: {
			title: 'Контакты',
			email1: 'v.t.i@bk.ru',
			email2: 'smyakushin@mail.ru',
			telegram1: 't.me/snk_patphys',
			telegram2: 't.me/medik_foxford',
			vk_link: 'https://vk.com/snk_patphys',
			politic: 'Политика конфиденциальности',
			up_button: 'Наверх'
		}
	},
	courseInner: {
		completed: '✓ Прочитано',
		back: 'Назад',
		next: 'Далее',
		markAsCompleted: 'Отметить как прочитанное',
		previous: 'Предыдущая',
		nextChapter: 'Следующая',
		error: 'Ошибка',
		errorMessage: 'Произошла ошибка: {{testError}}',
		tryAgain: 'Попробовать снова',
		testResults: 'Результаты тестирования',
		testResultsSummary:
			'Вы ответили правильно на {{totalCorrect}} из {{totalQuestions}} вопросов.',
		testPassed: 'Тест зачтён',
		testFailed: 'Тест не зачтён',
		submittingResults: 'Отправка результатов...',
		questionNumber: 'Вопрос {{currentQuestionIndex}} из {{totalQuestions}}',
		nextQuestion: 'Следующий вопрос',
		completeTest: 'Завершить тестирование',
		retakeTest: 'Пройти тест заново',
		timeRemaining: 'осталось',
		timeUp: 'Время вышло! Ответы будут автоматически отправлены',
		enterAnswer: 'Введите ваш ответ здесь...',
		characterCount: '{{currentLength}}/{{maxLength}} символов',
		answerSubmitted: 'Ответ отправлен',
		submitForReview: 'Отправить на проверку',
		availableAnswers: 'Доступные ответы',
		dragHere: 'Перетащите сюда',
		allAnswersUsed: 'Все ответы использованы',
		checkAnswers: 'Проверить',
		resetAnswers: 'Сбросить',
		answersIncorrect: 'Есть ошибки в ответах. Проверьте еще раз!',
		answersCorrect: '✓ Все ответы верные! Отличная работа!'
	},
	auth: {
		backToHome: 'На главную',
		signInTitle: 'Войти в систему',
		signInDescription: 'Введите вашу электронную почту и пароль для входа!',
		signUpTitle: 'Зарегистрироваться',
		signUpDescription:
			'Введите свою электронную почту и пароль для регистрации!',
		emailLabel: 'Электронная почта',
		passwordLabel: 'Пароль',
		firstNameLabel: 'Имя',
		lastNameLabel: 'Фамилия',
		emailRequired: 'Email обязателен',
		emailInvalid: 'Некорректный email',
		passwordRequired: 'Пароль обязателен',
		passwordMinLength: 'Пароль должен быть не менее 6 символов',
		forgotPassword: 'Забыли пароль?',
		signInButton: 'Войти',
		signUpButton: 'Зарегистрироваться',
		noAccount: 'Нет аккаунта?',
		alreadyHaveAccount: 'Уже есть аккаунт?',
		signInLink: 'Войти',
		signUpLink: 'Зарегистрироваться',
		signInWithYandex: 'Войти через Яндекс',
		signInWithVk: 'Войти через VK ID',
		or: 'Или',
		enterFirstName: 'Введите свое имя',
		enterLastName: 'Введите свою фамилию',
		enterEmail: 'Введите свою электронную почту',
		enterPassword: 'Введите пароль',
		termsAgreement:
			'Создавая аккаунт, вы соглашаетесь с <terms>Условиями использования</terms> и нашей <privacy>Политикой конфиденциальности</privacy>',
		termsOfUse: 'Условиями использования',
		privacyPolicy: 'Политикой конфиденциальности'
	}
}

export default ru
