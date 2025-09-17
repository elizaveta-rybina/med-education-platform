export type Module = {
	id: number
	shortTitle: { en: string; ru: string }
	title: { en: string; ru: string }
	description: { en: string; ru: string }
	image: { en: string; ru: string } | string
	time: { en: string; ru: string }
}

export const modules_fisrt_semester: Module[] = [
	{
		id: 1,
		shortTitle: {
			en: '1st Module',
			ru: '1 модуль'
		},
		title: {
			en: 'Module 1 - General nosology',
			ru: '1 модуль - Общая нозология'
		},
		description: {
			en: 'In this module, you will learn the basics of pathophysiology as a science that studies the causes, mechanisms of development, and consequences of human diseases, and you will have the opportunity to model a pathological process for the first time.',
			ru: 'В этом модуле вы познакомитесь с основами патофизиологии как науки, изучающей причины, механизмы развития и последствия заболеваний у человека и, конечно, получите возможность впервые смоделировать патологический процесс.'
		},
		image: 'src/assets/semester_one_card/module_1.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 2,
		shortTitle: {
			en: '2nd Module',
			ru: '2 модуль'
		},
		title: {
			en: 'Module 2 - Pathogenic factors',
			ru: '2 модуль - Патогенные факторы'
		},
		description: {
			en: 'This module is devoted to the influence of pathogenic factors on the human body. In addition, in the experiment you will see the effect of electric current on the human body.',
			ru: 'Данный модуль посвящен влиянию болезнетворных факторов на организм человека. Кроме того, в этом эксперименте вы увидите, действие электрического тока на организм.'
		},
		image: 'src/assets/semester_one_card/module_2.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 3,
		shortTitle: {
			en: '3rd Module',
			ru: '3 модуль'
		},
		title: {
			en: 'Module 3 - Mechanisms of cell damage',
			ru: '3 модуль - Механизмы повреждения клетки'
		},
		description: {
			en: 'In this module, you will study on the mechanisms of cell damage. As the practical part, you will master the methods of analyzing the signaling cascade in the cell and learn the importance of teratogenic effects in the embryonic period.',
			ru: 'В этом модуле вы познакомитесь с механизмами повреждения клетки. В практической части вам предстоит освоить методики анализа сигнального каскада в клетке и усвоить значимость тератогенных влияний в эмбриональном периоде.'
		},
		image: 'src/assets/semester_one_card/module_3.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 4,
		shortTitle: {
			en: '4th Module',
			ru: '4 модуль'
		},
		title: {
			en: 'Module 4 - Arterial and venous hyperemias',
			ru: '4 модуль - Артериальная и венозная гиперемии'
		},
		description: {
			en: 'In this module, you will study on the mechanisms of cell damage. As the practical part, you will master the methods of analyzing the signaling cascade in the cell and learn the importance of teratogenic effects in the embryonic period.',
			ru: 'Данный модуль посвящен подробному рассмотрению нарушений микроциркуляции и механизмов, лежащих в основе артериальной и венозной гиперемии, а также научитесь моделировать эти процессы.'
		},
		image: 'src/assets/semester_one_card/module_4.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 5,
		shortTitle: {
			en: '5th Module',
			ru: '5 модуль'
		},
		title: {
			en: 'Module 5 - Peripheral circulatory disorder',
			ru: '5 модуль - Нарушение периферического кровообращения'
		},
		description: {
			en: 'This module is dedicated to a detailed analysis of peripheral circulation disorders: ischemia, stasis, embolism and thrombosis. You will learn the features of hemodynamics and the consequences of thrombosis, as well as the causes of thrombus formation.',
			ru: 'Данный модуль посвящен детальному разбору нарушений периферического кровообращения: ишемия, стаз, эмболия и тромбоз. Узнаете особенности гемодинамики и последствия тромбоза, а также причины тромбообразования.'
		},
		image: 'src/assets/semester_one_card/module_5.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 6,
		shortTitle: {
			en: '6th Module',
			ru: '6 модуль'
		},
		title: {
			en: 'Module 6 - Inflammation',
			ru: '6 модуль - Воспаление'
		},
		description: {
			en: 'In this module, you will study such typical pathological process  as inflammation and learn its biological role, understand the causes and mechanisms of inflammation development.',
			ru: 'В этом модуле вы познакомитесь с воспалением как типовым патологическим процессом и узнаете его биологическую роль, научитесь понимать причины и механизмы развития воспаления.'
		},
		image: 'src/assets/semester_one_card/module_6.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 7,
		shortTitle: {
			en: '7th Module',
			ru: '7 модуль'
		},
		title: {
			en: 'Module 7 - Thermal balance disorders',
			ru: '7 модуль - Нарушение теплового баланса'
		},
		description: {
			en: 'This module explains in detail the disturbances of the body`s thermal balance, including the concept of fever, its mechanisms of occurrence and biological role.',
			ru: 'Данный модуль подробно рассматривает нарушения теплового баланса организма, включая понятие лихорадки, её механизмы возникновения и биологическую роль.'
		},
		image: 'src/assets/semester_one_card/module_7.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 8,
		shortTitle: {
			en: '8th Module',
			ru: '8 модуль'
		},
		title: {
			en: 'Module 8 - Immunopathology',
			ru: '8 модуль - Иммунопатология'
		},
		description: {
			en: 'In this module, you will study such a key element of the body`s defense as immunity and study its main function - maintaining antigen homeostasis, and also understand of disturbances in the immune system occurrence and them effect to the health.',
			ru: 'В этом модуле вы познакомитесь с иммунитетомключевым элементом защиты организма и изучите как он поддерживает антигенный гомеостаз, а также поймете, как происходят нарушения в работе иммуннитета, и как они влияют на организм.'
		},
		image: 'src/assets/semester_one_card/module_8.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 9,
		shortTitle: {
			en: '9th Module',
			ru: '9 модуль'
		},
		title: {
			en: 'Module 9 - Allergy',
			ru: '9 модуль - Аллергия'
		},
		description: {
			en: 'In this module, you will learn hypersensitivity developing and it’s effect to the defenses, gain an understanding of the pathogenesis of type 1 allergic reactions (anaphylactic) and the importance of laboratory experiments in the study of allergies.',
			ru: 'В данном модуле вы узнаете, почему развивается гиперчувствительность и как она влияет на защитные реакции организма, получите представление о патогенезе аллергических реакций первого типа (анафилактического).'
		},
		image: 'src/assets/semester_one_card/module_9.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 10,
		shortTitle: {
			en: '10th Module',
			ru: '10 модуль'
		},
		title: {
			en: 'Module 10 - Tumor growth',
			ru: '10 модуль - Опухолевый рост'
		},
		description: {
			en: 'In this module, you will study the concept of tumor growth and the main characteristics of tumors, and gain an understanding of modern methods of experimental study of tumor growth.',
			ru: 'В данном модуле вы ознакомитесь с понятием опухолевого роста и основными характеристиками опухолей, получите представление о современных методах экспериментального изучения опухолевого роста.'
		},
		image: 'src/assets/semester_one_card/module_10.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 11,
		shortTitle: {
			en: '11th Module',
			ru: '11 модуль'
		},
		title: {
			en: 'Module 11 - Violation of the WEB',
			ru: '11 модуль - Нарушение ВСО'
		},
		description: {
			en: 'In this module you will study the concepts of water balance and dyshydria, the causes and mechanisms of hyperhydration and dehydration.',
			ru: 'В этом модуле вы познакомитесь с понятиями водного баланса и дисгидрии, причинами и механизмами развития гипергидратации и дегидратации. '
		},
		image: 'src/assets/semester_one_card/module_11.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 12,
		shortTitle: {
			en: '12th Module',
			ru: '12 модуль'
		},
		title: {
			en: 'Module 12 - Violation of the ABB',
			ru: '12 модуль - Нарушение КОС'
		},
		description: {
			en: 'This module is dedicated to the acid-base balance of the body and the mechanisms of its maintenance. You will study the classification of acidbase balance disorders, their causes and mechanisms of development, as well as the principles of correction.',
			ru: 'Данный модуль посвящен кислотноосновному состоянию организма и механизмам его поддержания, вы изучите классификацию нарушений КОС, их причины и механизмы развития, а также принципы коррекции. '
		},
		image: 'src/assets/semester_one_card/module_12.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 13,
		shortTitle: {
			en: '13th Module',
			ru: '13 модуль'
		},
		title: {
			en: 'Module 13 - Hypoxia',
			ru: '13 модуль - Гипоксия'
		},
		description: {
			en: 'In this module, you will learn hypoxia as a typical pathological process associated with a lack of oxidative metabolism in tissues, the classification of hypoxia, its causes and consequences for the body.',
			ru: 'В этом модуле вы узнаете о гипоксии как о типичном патологическом процессе, связанном с нарушением окислительного метаболизма в тканях, о классификации гипоксии, ее причинах и последствиях для организма.'
		},
		image: 'src/assets/semester_one_card/module_13.png',
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	}
]

export const modules_second_semester: Module[] = [
	{
		id: 1,
		shortTitle: {
			en: '1st Module',
			ru: '1 модуль'
		},
		title: {
			en: 'Module 1 - Pathophysiology of  respiratory system',
			ru: '1 модуль - Патофизиология системы внешнего дыхания'
		},
		description: {
			en: 'You will learn how hypoventilation develops and why gas exchange is disrupted.',
			ru: 'Узнаешь, как развивается гиповентиляция и почему нарушается газообмен.'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 2,
		shortTitle: {
			en: '2nd Module',
			ru: '2 модуль'
		},
		title: {
			en: 'Module 2 -  Pathophysiology of the cardiovascular system',
			ru: '2 модуль - Патофизиология сердечно-сосудистой системы'
		},
		description: {
			en: 'Heart failure\nYou will understand how a heart attack, overload and vascular disorders lead to the collapse of the heart',
			ru: 'Сердечная недостаточность\nРазберёшь, как инфаркт, перегрузка и сосудистые нарушения приводят к коллапсу сердца'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 3,
		shortTitle: {
			en: '3rd Module',
			ru: '3 модуль'
		},
		title: {
			en: 'Module 3 - Pathophysiology of the cardiovascular system',
			ru: '3 модуль - Патофизиология сердечно-сосудистой системы'
		},
		description: {
			en: 'Vascular tone disorders\nYou will see how kidney pathology causes a persistent increase in blood pressure',
			ru: 'Нарушения сосудистого тонуса\nУвидишь, как патология почек вызывает стойкое повышение давления'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 4,
		shortTitle: {
			en: '4th Module',
			ru: '4 модуль'
		},
		title: {
			en: 'Module 4 - Pathophysiology of red blood cells',
			ru: '4 модуль - Патофизиология красной крови'
		},
		description: {
			en: 'You can clearly see what happens in the body with massive blood loss.',
			ru: 'Наглядно проследишь, что происходит в организме при массивной кровопотере.'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 5,
		shortTitle: {
			en: '5th Module',
			ru: '5 модуль'
		},
		title: {
			en: 'Module 5 - Pathology of white blood cells',
			ru: '5 модуль - Патология белой крови'
		},
		description: {
			en: 'Under a microscope, you will see how immune cells cannot cope with the capture and destruction of foreign particles.',
			ru: 'Под микроскопом увидишь, как клетки иммунитета не справляются с захватом и уничтожением чужеродных частиц'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 6,
		shortTitle: {
			en: '6th Module',
			ru: '6 модуль'
		},
		title: {
			en: 'Module 6 - Pathophysiology of the hemostasis system',
			ru: '6 модуль - Патофизиология системы гемостаза'
		},
		description: {
			en: 'You will learn how uncontrolled blood clotting leads to serious complications.',
			ru: 'Узнаешь, как неконтролируемое свёртывание крови приводит к тяжёлым осложнениям.'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 7,
		shortTitle: {
			en: '7th Module',
			ru: '7 модуль'
		},
		title: {
			en: 'Module 7 - Pathophysiology of the gastrointestinal tract. Part I',
			ru: '7 модуль - Патофизиология желудочно-кишечного тракта I часть'
		},
		description: {
			en: 'You`ll see how stress and NSAIDs trigger the formation of ulcers.',
			ru: 'Увидишь, как стресс и НПВС запускают образование язв'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 8,
		shortTitle: {
			en: '8th Module',
			ru: '8 модуль'
		},
		title: {
			en: 'Module 8 - Pathophysiology of the gastrointestinal tract Part II',
			ru: '8 модуль - Патофизиология желудочно-кишечного тракта II часть'
		},
		description: {
			en: 'You will understand how disorders in the intestine interfere with the absorption of nutrients.',
			ru: 'Разберёшь, как нарушения в кишечнике мешают усвоению питательных веществ'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 9,
		shortTitle: {
			en: '9th Module',
			ru: '9 модуль'
		},
		title: {
			en: 'Module 9 - Pathophysiology of the liver and biliary tract',
			ru: '9 модуль - Патофизиология печени и желчных путей'
		},
		description: {
			en: 'You will see how the blockage of the bile ducts leads to jaundice and liver malfunction.',
			ru: 'Проследишь, как перекрытие желчных протоков приводит к желтухе и нарушению работы печени.'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 10,
		shortTitle: {
			en: '10th Module',
			ru: '10 модуль'
		},
		title: {
			en: 'Module 10 - Pathophysiology of the kidneys',
			ru: '10 модуль - Патофизиология почек'
		},
		description: {
			en: 'You will learn how toxic drugs damage the kidneys and reduce their function.',
			ru: 'Узнаешь, как токсические препараты повреждают почки и снижают их функцию'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 11,
		shortTitle: {
			en: '11th Module',
			ru: '11 модуль'
		},
		title: {
			en: 'Module 11 - Pathophysiology of the nervous system',
			ru: '11 модуль - Патофизиология нервной системы'
		},
		description: {
			en: 'You will see how seizures occur and how diazepam relieves convulsions.',
			ru: 'Увидишь, как возникают судорожные приступы и как диазепам снимает конвульсии.'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 12,
		shortTitle: {
			en: '12th Module',
			ru: '12 модуль'
		},
		title: {
			en: 'Module 12 - Pathophysiology of the endocrine system',
			ru: '12 модуль - Патофизиология эндокринной системы'
		},
		description: {
			en: 'You`ll see how a drop in blood sugar leads to seizures and coma, and how glucose saves the body.',
			ru: 'Проследишь, как падение сахара в крови приводит к судорогам и коме, и как глюкоза спасает организм'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	},
	{
		id: 13,
		shortTitle: {
			en: '13th Module',
			ru: '13 модуль'
		},
		title: {
			en: 'Module 13 - Modern concept of stress',
			ru: '13 модуль - Современная концепция стресса'
		},
		description: {
			en: 'You will learn what stages the body goes through under stress and how the adrenal glands affect endurance.',
			ru: 'Узнаешь, какие стадии проходит организм при стрессе и как надпочечники влияют на выносливость'
		},
		image: {
			en: 'src/assets/semester_two_card/module_en.png',
			ru: 'src/assets/semester_two_card/module_ru.png'
		},
		time: {
			en: 'Average time of implementation is 25 minutes',
			ru: 'Среднее время прохождения 25 мин.'
		}
	}
]
