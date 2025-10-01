import { Course } from '@/data/types'

export const courseData: Course = {
	id: 'course-2',
	title: 'Патогенное действие болезнетворных факторов',
	description: 'Патогенное действие болезнетворных факторов',
	modules: [
		{
			id: 'module-2',
			title: 'Действие болезнетворных факторов на организм',
			chapters: [
				{
					id: 'chapter-2-1',
					title: 'Psychosocial Harmful Factors',
					hash: 'psychosocial-agents',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Social pathogenic factors',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' – social phenomena that lead to the emergence and development of new types of diseases or worsen the course of existing ones. They can be conditionally divided into macro- and microsocial.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Macrosocial pathogenic factors',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' are in most cases caused by inefficient functioning of government structures. The most significant factor is insufficient funding of the healthcare system. This leads to reduced access to medical care and limits the implementation of sanitary, hygienic, and preventive measures. Another factor is the reduced role of the state in the development of mass physical culture and sports.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Microsocial pathogenic factors',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' are caused by interactions among people within social groups (family, work team, school class, university group, interest-based communities, etc.). Personal attitudes, cultural background, upbringing, and relation to one’s own health play an important role in this process. Irregular working hours, unfavorable work conditions (night shifts), insufficient rest, frequent need to learn new professional skills, and conflicts with colleagues are constant sources of psychological stress, which reduce overall resilience and create conditions for various illnesses.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Psychogenic factors',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: '. Family troubles often become sources of stress, contributing to the development of neuroses and related illnesses. Conflicts within the family are among the leading causes of suicide, especially among women and adolescents. Most first encounters with alcohol and psychoactive substances occur due to inability or unwillingness to foresee potential dangers, which ultimately leads to chronic alcoholism, drug addiction, or substance abuse.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What are macrosocial pathogenic factors?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Social conditions within family and team',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Financial problems of the population',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Insufficient functioning of government institutions and healthcare system',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Individual dietary habits',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Which measures contribute to improving public health according to the text?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Increasing the number of medical workers',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Improving doctors’ qualifications',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Strengthening state support for physical culture and sports',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Expanding the network of pharmacies',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'What are the consequences of irregular work schedules and workplace conflicts?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Improved employee productivity',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Increased life satisfaction',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Psychological stress and worsened overall well-being',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Motivation for career advancement',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'Why are family conflicts dangerous?',
							options: [
								{
									id: 'opt-1',
									text: 'A) They lead to higher income levels',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) They strengthen family bonds',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) They can cause psychosomatic disorders and suicidal thoughts',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) They stimulate physical activity of family members',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'Which factor contributes to the formation of addictive behavior (alcoholism, drug addiction)?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Regular physical exercise',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Rational work and rest schedule',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Lack of understanding of the risks of alcohol and drug use',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) High standard of living and well-being',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-2-2',
					title: 'Chemical Harmful Factors',
					hash: 'chemical-agents',
					isRead: false,
					blocks: [
						{
							id: 'text-3',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Chemical harmful factors',
												marks: [{ type: 'bold' }, { type: 'italic' }]
											},
											{
												type: 'text',
												text: ' – are inorganic and organic substances, as well as agents of biological origin (bacterial toxins, plant and animal toxins), capable of causing poisoning when entering the body. The pathogenic effect of chemical factors involves chemical burns, inflammatory and allergic reactions, carcinogenic, embryotoxic, teratogenic, and general toxic effects on the body. Initially, local alterations in cellular and tissue structures occur, followed by systemic disorders.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Intoxication',
												marks: [{ type: 'bold' }, { type: 'italic' }]
											},
											{
												type: 'text',
												text: ' – a pathological condition, process, or disease resulting from the action of toxic substances of endogenous or exogenous origin, characterized by severe disruption of metabolism and functions of organs and systems. The term “poisoning” refers only to intoxications caused by exogenous toxins.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The development of intoxication is determined by three groups of factors: the state of the organism (reactivity, age); chemical characteristics of the poison (physicochemical properties, toxic dose); and conditions of interaction between the poison and the organism (route of entry, environmental conditions). Poisons can enter the body orally, by inhalation, transdermally, through mucous membranes (rectum, vagina), sclera and cornea of the eye, or directly into the bloodstream (injections, puncture wounds, bites).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The outcome of poisoning depends on the dose of the poison and the condition of the systems capable of metabolizing (neutralizing) the toxic substance.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Considering the organotropism of the most common poisons, they are classified as:'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Neurotropic poisons',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' cause disturbances in mental activity, seizures, and paralysis (overdose of narcotics, alcohol and its surrogates, sleeping pills, isoniazid, effects of methanol, organophosphates like chlorophos, carbophos, and warfare nerve agents like sarin).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Cardiotropic poisons',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' lead to impaired heart contractility and rhythm, toxic myocardial dystrophy (overdose of cardiac glycosides, excessive intake of barium and potassium salts, exposure to plant poisons like aconite, etc.).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Pulmonotoxic poisons',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' cause toxic pulmonary edema accompanied by respiratory failure (chlorine vapors, warfare agents like phosgene).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Hepatotropic poisons',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' cause toxic hepatitis with liver failure (dichloroethane and other chlorinated hydrocarbons, phenols, aldehydes, death cap mushroom toxin, etc.).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Nephrotoxic poisons',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' – a cause of toxic nephropathy and renal failure (heavy metal salts, ethylene glycol, oxalic acid, etc.).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Hemoglobinotropic poisons',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' disrupt oxygen transport due to hemolysis of erythrocytes, formation of methemoglobin (aniline and its derivatives, arsine, nitrites and other strong oxidizers), or carboxyhemoglobin (carbon monoxide).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Tissue poisons',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' block oxygen utilization in tissues, causing tissue hypoxia (cyanide compounds such as potassium cyanide, warfare agents like chlorcyan).'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What does the term "intoxication" mean?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Impaired organ function due to injury.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Tissue inflammation caused by bacterial infection.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Infectious disease.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) A pathological condition of the body caused by toxins.',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Which groups of factors determine the development of intoxication?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Age, chronic diseases, physical exertion.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Chemical characteristics of the poison, route of entry, immune system status.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Physicochemical properties of the poison, state of the organism, environmental conditions.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Level of emotional stress, diet, heredity.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'Which route of poison entry most often causes acute poisoning?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Oral (through the mouth)',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Transdermal (through the skin)',
									isCorrect: false
								},
								{ id: 'opt-3', text: 'C) Injection', isCorrect: false },
								{
									id: 'opt-4',
									text: 'D) Inhalation (through breathing)',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'Which group includes chemical substances affecting the nervous system?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Cardiotropic poisons.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Neurotropic poisons.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Nephrotoxic poisons.',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) Tissue poisons.', isCorrect: false }
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What is the pathological process called when oxygen delivery by erythrocytes is disrupted due to a toxic substance?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Hemoglobin metabolism.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Allergic reaction.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Methemoglobin formation.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Ventricular fibrillation.',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-2-3',
					title: 'Biological Harmful Factors',
					hash: 'biological-agents',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Biological pathogenic factors',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' include microorganisms (bacteria, viruses, rickettsia, chlamydia, mycoplasma, fungi); helminths and protozoa; arthropods and insects (spiders, scorpions, ticks); biological products (antitoxic sera, vaccines, blood for transfusion and its components). The interaction of a microorganism with a macroorganism under adverse external and/or internal conditions results in an evolutionarily developed typical pathological process – '
											},
											{
												type: 'text',
												text: 'Infectious process',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: '.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Infectious process',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' (IP) – a complex of pathological and protective-compensatory-adaptive reactions at various organizational levels, interrelated morphological, metabolic, functional, and regulatory (especially immune) physiological systems underlying infectious diseases. The main types of infectious processes include:'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Sepsis',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' — a severe generalized form of IP caused by rapid multiplication of microorganisms in the blood and other biological tissues of the body.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Septicopyemia',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' — IP characterized by secondary development of purulent foci in various tissues and organs in patients with sepsis.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Bacteremia, viremia',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' — a type of IP characterized by the presence of bacteria or viruses in the blood without signs of rapid multiplication. It represents one stage in the development of several IPs.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Mixed infection',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' — IP caused simultaneously by two or more infectious agents.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Reinfection',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' — recurrence of IP caused by the same microorganism after recovery.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Superinfection',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' — reinfection by the same pathogen before recovery.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Secondary infection',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' — IP developing against the background of an existing (primary) infectious disease caused by another microorganism.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'All pathogenic microorganisms are parasites that use the human body as a habitat and damage it through their metabolic products and competition for nutrients. The site of entry of pathogens into the body is called the "infection portal," which varies depending on the type of agent. For example, Vibrio cholerae enters through the gastrointestinal tract and cannot penetrate the skin. Main transmission routes include contaminated water, food, and unclean hands.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The likelihood of developing an infectious disease after exposure, the duration of the incubation period, the severity of clinical manifestations, and the outcome (full recovery, progression to chronic form, disability, or death) depend on the type of pathogen, route of infection, and the host’s resistance, determined by immune system status, metabolic characteristics, and comorbidities.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question:
								'The result of interaction between a microorganism and a human is:',
							options: [
								{ id: 'opt-1', text: 'A) Infectious process', isCorrect: true },
								{ id: 'opt-2', text: 'B) Allergic reaction', isCorrect: false },
								{ id: 'opt-3', text: 'C) Trauma', isCorrect: false },
								{ id: 'opt-4', text: 'D) Acute inflammation', isCorrect: false }
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Name the term that describes entry of microorganisms again before full recovery:',
							options: [
								{ id: 'opt-1', text: 'A) Reinfection', isCorrect: false },
								{ id: 'opt-2', text: 'B) Superinfection', isCorrect: true },
								{ id: 'opt-3', text: 'C) Mixed infection', isCorrect: false },
								{
									id: 'opt-4',
									text: 'D) Secondary infection',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'The site of entry of pathogenic microorganisms into the body is called:',
							options: [
								{ id: 'opt-1', text: 'A) Infection portal', isCorrect: true },
								{
									id: 'opt-2',
									text: 'B) Source of infection',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Antibiotic resistance',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) Immunity', isCorrect: false }
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'Define the concept of "bacteremia":',
							options: [
								{
									id: 'opt-1',
									text: 'A) Presence of bacteria in the blood without massive multiplication',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Reinfection with the same pathogen before recovery',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Virus penetration into nerve tissue cells',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Generalization of the inflammatory process',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'Factors influencing the development of an infectious disease after the pathogen enters the body:',
							options: [
								{
									id: 'opt-1',
									text: 'A) Type of pathogen, infection mechanism, human immunity',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Level of physical development',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Nutritional characteristics',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Environmental conditions of the living region',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-2-4',
					title: 'Effects of Physical Mechanical Factors',
					hash: 'physical-agents',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Mechanical trauma',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' – damage to tissues caused by solid objects or the propagation of an explosive wave.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Local manifestations of mechanical injuries',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: '. The nature of the injury can vary and locally presents as tears, bruises, fractures, crushing, or combinations thereof. The severity depends on the force and duration of the mechanical factor, the area of contact with the injuring agent, and the strength of biological tissues. The effect of mechanical energy is aggravated by inflammation and pronounced calcification, which reduce tissue strength and elasticity and increase the risk of rupture even under minimal stress. Local outcomes also depend on the combination of trauma with blood loss, skin rupture, and nerve trunk damage.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'General manifestations of mechanical injuries',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{ type: 'text', text: '.' }
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Traumatic disease',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' – a disruption of vital activity from the time of injury until recovery or death, accompanied by dynamic disturbances in organ and system functions (general and regional circulation, respiration, excretion, metabolic processes). Traumatic disease is initiated by the development of pain (traumatic) shock. Significant blood loss can lead to hypovolemic shock. Extensive mechanical injuries are accompanied by toxemia due to tissue breakdown and inflammation, as well as accumulation of microbial waste in case of wound infection (septic toxemia). Prolonged intoxication causes '
											},
											{
												type: 'text',
												text: 'wound exhaustion',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' of the body, characterized by systemic dystrophic processes. Immune, liver, and gastrointestinal functions are impaired, massive protein loss occurs with purulent exudate – all of which worsen infections and exacerbate exhaustion, potentially leading to death in severe cases.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{ type: 'text', text: 'Late complications of ' },
											{
												type: 'text',
												text: 'traumatic disease',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' include persistent dysfunctions of regulatory and executive systems (asthenization, neurosis, vascular dystonia).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Crush syndrome, or prolonged compression syndrome (PCS)',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ', develops as a result of reperfusion of soft tissues of the lower and/or upper limbs subjected to compression and acute ischemia. The pathogenesis involves the simultaneous entry of large amounts of breakdown products of striated muscle cells (rhabdomyolysis), primarily myoglobin, proteolytic enzymes, and potassium, into systemic circulation. These substances are excreted by the kidneys, making acute renal failure one of the most frequent manifestations of PCS.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{ type: 'text', text: 'Main manifestations of ' },
											{
												type: 'text',
												text: 'crush syndrome',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ': shock, toxemia, generalized microcirculatory disorders, anemia, acute renal failure, cardiovascular insufficiency, infectious and septic complications, traumatic neuritis.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{ type: 'text', text: 'Shock in ' },
											{
												type: 'text',
												text: 'crush syndrome',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' is characterized by a prolonged period of excitation, absence of acute blood loss signs, and preserved adequate blood supply to the brain and heart.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'Mechanical trauma occurs as a result of...',
							options: [
								{
									id: 'opt-1',
									text: 'A) Damage to soft tissues by bacteria.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Action of solid objects or explosion.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Intoxication by chemical substances.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Radiation exposure.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Which signs are characteristic of local mechanical injury?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Dizziness and nausea.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Vomiting and diarrhea.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Bruises, tears, fractures.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Body temperature changes and chills.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'What is traumatic disease?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Disease transmitted by airborne droplets.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Body changes after severe injury, including disruption of major systems.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Disease exclusively related to cranial injuries.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Impaired coordination of movements.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'Why is crush syndrome dangerous?',
							options: [
								{ id: 'opt-1', text: 'A) Mild headaches.', isCorrect: false },
								{
									id: 'opt-2',
									text: 'B) Rapid wound healing.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Coagulation disorders.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Toxemia, acute renal failure, and shock.',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What contributes to the development of late complications of traumatic disease?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Taking antibiotics.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Excessive physical activity immediately after injury.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Improper nutrition.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Reduced functionality of regulatory and executive systems of the body.',
									isCorrect: true
								}
							]
						}
					]
				},

				{
					id: 'chapter-2-5',
					title: 'Effects of Physical Thermal Factors',
					hash: 'thermal-agents',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Effect of low temperature',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' on the body can lead to a decrease in body temperature and the development of a pathological process – hypothermia. Hypothermia develops in two stages. Initially, despite low ambient temperature, body temperature does not decrease and is maintained at baseline due to compensatory responses that adjust thermoregulation. This cooling period is called the compensation stage. First, physical thermoregulation mechanisms limit heat loss, and with prolonged or intense cold exposure, chemical thermoregulation mechanisms increase heat production. During prolonged or severe cold exposure, thermoregulation mechanisms become exhausted, body temperature drops, and the second stage of cooling – decompensation, or actual hypothermia – occurs.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{ type: 'text', text: 'As a result of ' },
											{
												type: 'text',
												text: 'local tissue damage',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' caused by exposure to low ambient temperatures, frostbite develops.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Effect of high temperature',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: '. In conditions of high temperature and humidity, heat dissipation from the body to the environment is hindered and occurs only through intense physical thermoregulation (peripheral vessel dilation, increased sweating). When air temperature reaches 33°C (skin temperature), heat dissipation by conduction and radiation becomes ineffective and occurs only through evaporation, which is further hindered by high humidity. This imbalance between heat production and dissipation leads to heat retention and overheating. The period of overheating with maintained normal body temperature is called the compensation stage. Overstrain of thermoregulation leads to exhaustion, and subsequent rise in body temperature indicates the second period of overheating – decompensation. Rapid body temperature rise is called heat stroke.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Local exposure',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' to high temperature manifests as '
											},
											{
												type: 'text',
												text: 'burn',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ', presenting as local destructive and reactive changes, severity classified into four degrees:'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'I – skin redness (erythema), mild inflammatory reaction without loss of skin integrity;'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'II – acute exudative inflammation of the skin, formation of blisters with epidermal detachment;'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'III – necrosis of all skin layers with formation of a firm scab, later forming a scar;'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'IV – charring of tissues, necrosis extending beyond the skin to muscles, tendons, bones.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What happens in the first stage of hypothermia?',
							options: [
								{
									id: 'opt-1',
									text: 'a) Body temperature drops sharply.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'b) Compensatory mechanisms activate, maintaining normal body temperature.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'c) Symptoms of severe hypothermia appear.',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'd) Coma occurs.', isCorrect: false }
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Under what condition do the first signs of body overheating appear?',
							options: [
								{
									id: 'opt-1',
									text: 'a) When air humidity is low.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'b) If air temperature is below body temperature.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'c) If ambient air temperature equals skin temperature (around 33°C).',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'd) When the air is completely dry.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'What is the main cause of heat stroke?',
							options: [
								{
									id: 'opt-1',
									text: 'a) Rapid body cooling.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'b) Overwork and fatigue.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'c) Lack of water intake.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'd) Sudden rise in body temperature due to inability to dissipate heat.',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'What characterizes the second stage of hypothermia?',
							options: [
								{
									id: 'opt-1',
									text: 'a) Ability to maintain normal body temperature persists.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'b) Active restoration of thermoregulation begins.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'c) Significant drop in body temperature and weakening of protective mechanisms occurs.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'd) Heat exchange with the environment increases.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'Which degree of burn is accompanied by vesicle formation (fluid-filled blisters)?',
							options: [
								{ id: 'opt-1', text: 'a) I degree.', isCorrect: false },
								{ id: 'opt-2', text: 'b) II degree.', isCorrect: true },
								{ id: 'opt-3', text: 'c) III degree.', isCorrect: false },
								{ id: 'opt-4', text: 'd) IV degree.', isCorrect: false }
							]
						}
					]
				},

				{
					id: 'chapter-2-6',
					title: 'Physical Factors. Harmful Effects of Atmospheric Pressure',
					hash: 'physical-factors',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'paragraph',
										content: [
											{ type: 'text', text: 'Effect on the body of ' },
											{
												type: 'text',
												text: 'low barometric pressure',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' occurs during mountain climbing, living at high altitudes, in pressure chambers, or during depressurization of aircraft. The pathological changes that occur are caused by two main factors – decreased partial oxygen pressure in the inhaled air and reduced atmospheric pressure (decompression). Oxygen deficiency in the inhaled air leads to exogenous hypobaric hypoxia and the development of compensatory reactions in the body:'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: '1) Respiratory (lung hyperventilation, increased ventilation-perfusion ratio in the lungs);'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: '2) Hemodynamic (tachycardia, increased stroke volume, increased blood flow, centralization of circulation);'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: '3) Hematogenic (erythrocytosis, increased Hb affinity for O₂);'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: '4) Tissue (activation of glycolysis, increased activity of oxidative phosphorylation);'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: '5) Increased number of functioning capillaries, increased number of mitochondria, activation of erythropoiesis.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Pathological changes: cerebral edema, pulmonary edema, vascular thrombosis.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{ type: 'text', text: 'Effect of ' },
											{
												type: 'text',
												text: 'high barometric pressure',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' occurs during deep-water diving. The most important consequence of hyperbaria is increased gas solubility (nitrogen and oxygen) and their toxic effects in blood and tissues. If a diver who has been underwater for a long time ascends quickly, gas solubility in body tissues drops sharply, leading to gas bubble formation in the blood (desaturation) and resulting in gas embolism and decompression sickness.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question:
								'What is the main cause of pathological changes under low barometric pressure?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Vitamin D hypervitaminosis',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Oxygen deficiency in the atmosphere',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Increased carbon dioxide in the blood',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Increased gastric acidity',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Which of the following is a compensatory reaction to low atmospheric pressure?',
							options: [
								{ id: 'opt-1', text: 'A) Decreased pulse', isCorrect: false },
								{
									id: 'opt-2',
									text: 'B) Slowed circulation',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Erythrocytosis (increase in red blood cells)',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Dilation of blood vessels',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'What dangerous consequences occur when a diver ascends rapidly from great depth?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Arterial hypertension and myocardial infarction',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Gas embolism and decompression sickness',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Impaired vision and hearing',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Impaired bowel and kidney function',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'Which compensatory changes occur in the body under low barometric pressure?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Lung hyperventilation, tachycardia',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Slowed heartbeat, erythrocytosis',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Low hemoglobin, decreased mitochondria',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Normalization of blood pressure, improved cerebral circulation',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What is a consequence of rapid ascent to high altitude?',
							options: [
								{ id: 'opt-1', text: 'A) Weight loss', isCorrect: false },
								{
									id: 'opt-2',
									text: 'B) Hearing impairment',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Increased salivation',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Pulmonary and cerebral edema',
									isCorrect: true
								}
							]
						}
					]
				},

				{
					id: 'chapter-2-7',
					title: 'Effects of Extreme Factors of Space Flight',
					hash: 'extreme-factors',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'During launch and landing of a spacecraft, humans are exposed to overloads, vibration, noise, and high temperature. In orbital flight, unusual conditions include weightlessness and hypokinesia. In emergencies, decompression, oxygen supply failure, and radiation exposure are possible.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Motion sickness',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' – a pathological condition that arises from accelerations acting on the body (linear, centripetal, angular, Coriolis). Accelerations are detected by vestibular, proprioceptive, skin mechanoreceptors, visual receptors, and abdominal organ receptors. Accelerations generate inertia forces opposite to the acceleration vector, referred to as "overloads." These include:'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{ type: 'text', text: '– ' },
											{
												type: 'text',
												text: 'positive longitudinal overloads',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' (acceleration vector from head to feet, overload vector from feet to head);'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{ type: 'text', text: '– ' },
											{
												type: 'text',
												text: 'negative longitudinal overloads',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' (acceleration vector from feet to head);'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{ type: 'text', text: '– ' },
											{
												type: 'text',
												text: 'transverse overloads',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' (acceleration vector from back to chest or chest to back);'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{ type: 'text', text: '– ' },
											{
												type: 'text',
												text: 'lateral overloads',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' (acceleration vector from side to side).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Positive overloads cause blood to move to the vessels of the lower extremities and abdomen, reducing venous return to the heart, lowering stroke volume and cardiac output. Less blood reaches the brain. Negative longitudinal overloads shift blood to the upper body vessels, increasing arterial pressure, which may cause vessel rupture, hemorrhage, and cerebral edema.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{ type: 'text', text: 'Changes in the body under ' },
											{
												type: 'text',
												text: 'weightlessness',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' (absence of gravity) include uniform blood distribution in all vessels, causing congestion in the upper body and atria, dilation of afferent arterioles in the kidneys, increased hydrostatic pressure in glomeruli, and increased glomerular filtration rate; hypothalamic antidiuretic hormone production decreases; atrial natriuretic factor production increases. This leads to increased excretion of water, sodium, and calcium.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What is motion sickness?',
							options: [
								{
									id: 'opt-1',
									text: 'A) A pathological condition from disturbed eating behavior.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) A special type of allergy related to physical contact.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Impaired perception of sounds.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) A pathological condition caused by accelerations of various kinds.',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question: 'Which overloads are called positive longitudinal?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Directed from head to feet.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Directed from feet to head.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Directed from abdomen to back.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Directed from one side to the other.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'What happens during negative longitudinal overloads?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Blood moves to the lower body.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Venous return to the heart increases.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Less blood reaches the brain.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Hemorrhage and cerebral edema may occur.',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'How does weightlessness affect blood distribution in the body?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Blood is unevenly distributed, mostly accumulating in the legs.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Blood is evenly distributed, placing load on the upper body.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Blood almost completely leaves the brain.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Blood vessels constrict, impeding circulation.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What changes occur in an astronaut during prolonged weightlessness?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Loss of muscle mass and bone density.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Increased cortisol production.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Heart muscle growth.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Increased adrenaline secretion.',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-2-8',
					title: 'Damaging Effects of Ionizing Radiation',
					hash: 'ionizing-radiation',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Ionizing radiation (IR)',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' is a flow of particles or electromagnetic field quanta, whose interaction with matter leads to ionization of atoms and molecules. Sources of IR can be natural (cosmic radiation, radionuclides in the earth’s crust, water, and atmosphere) or artificial (man-made).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The severity of damage, biological and clinical effects, types of radiation reactions, their significance for the body, and time of manifestation (immediately, shortly after, or long-term) are determined by the type of radiation, its physical characteristics, especially penetrating and damaging ability; the dose of exposure and its intensity; the mode of exposure (external or internal, general or local, single or fractionated); overall body reactivity; and radiosensitivity of tissues, organs, and systems essential for survival.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Radiobiological effects at the cellular level involve the following stages: 1) absorption of radiation energy; 2) formation of free radicals (radiolysis of water) and radiotoxins; 3) radiation-induced disruption of biochemical processes; 4) ultrastructural and visible damage.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Radiosensitivity',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' (susceptibility to IR) of tissues is directly proportional to their proliferative activity and inversely proportional to the differentiation of their cells. By radiosensitivity (from high to low), tissues are arranged as follows: lymphoid tissue, hematopoietic tissue, epithelial tissue (gonads, gastrointestinal tract, skin epithelium, vascular endothelium, cartilage, bone, nervous tissue). Cells are most radiosensitive during mitosis.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Organs or systems with high radiosensitivity are called critical, including red bone marrow, gonads, lens of the eye, epithelium of mucous membranes, and skin.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The more complex the organism, the more sensitive it is to radiation. The effect of ionizing radiation at the whole-body level manifests as '
											},
											{
												type: 'text',
												text: 'radiation sickness',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: '. Acute and chronic radiation sickness are distinguished, along with its delayed effects.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Acute radiation sickness occurs after a total single external uniform exposure exceeding 1 Gy. It is characterized by three main clinical syndromes:'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: '– bone marrow (hematologic) syndrome, caused by primary damage to bone marrow stem cells, manifesting as bleeding at the peak of the disease;'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: '– gastrointestinal (epithelial-cell) syndrome, characterized by cellular depletion of intestinal villi and crypts, infections, damage to blood vessels, disruption of fluid and electrolyte balance, and impaired secretory, motor, and barrier functions of the gut;'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: '– cerebral syndrome, characterized by CNS damage, circulatory and cerebrospinal fluid disturbances, leading to brain edema.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question:
								'What is the main factor determining the severity of damage caused by ionizing radiation?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Dose of radiation and its intensity',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Hair and eye color of a person',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Time of day when exposure occurred',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Gender and age of a person',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Name the three clinical syndromes characteristic of acute radiation sickness.',
							options: [
								{
									id: 'opt-1',
									text: 'A) Bone marrow, gastronomic, cardiac',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Epileptic, dermatologic, ophthalmologic',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Gastrointestinal, hepatic, renal',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Bone marrow, gastrointestinal, cerebral',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'What types of damage occur with local exposure to ionizing radiation?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Hair loss, cataracts, radiation burns',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Arthritis, migraine, insomnia',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Diabetes, obesity, atherosclerosis',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Insomnia, depression, anxiety',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'Which tissue has the highest radiosensitivity?',
							options: [
								{ id: 'opt-1', text: 'A) Nervous tissue', isCorrect: false },
								{ id: 'opt-2', text: 'B) Lymphoid tissue', isCorrect: true },
								{ id: 'opt-3', text: 'C) Cartilage', isCorrect: false },
								{ id: 'opt-4', text: 'D) Skin', isCorrect: false }
							]
						}
					]
				},
				{
					id: 'chapter-2-9',
					title: 'Damaging Effects of Electric Current',
					hash: 'electric-current',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Electric current',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' is the ordered movement of charged particles. Electrical energy can easily convert into other forms: thermal, mechanical, and chemical.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Thermal effect of current',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' manifests when tissue temperature rises above 60°C, causing denaturation of proteins and disruption of their physicochemical properties. As current passes through the skin, electrical energy converts to heat, causing coagulation necrosis at entry and exit points, as well as in skeletal muscles and blood vessels conducting the current. Associated vessel damage can lead to thrombosis, often at sites distant from the body surface, and bone damage with destruction of the calcium-phosphate matrix.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Mechanical damage',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' arises due to contracture of limbs and fascial compression of muscles and nerves. This effect is pronounced in high-voltage electrical injuries: tissue separation, tendon rupture, and fractures of long bones.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Electrochemical effect of current',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' is related to electrolysis, leading to polarization of cell membranes and formation of coagulative necrosis near the anode and liquefactive necrosis near the cathode. Electrolysis in the heart’s syncytium may shorten the absolute refractory period of the action potential, promoting circularly increasing cardiac rhythm (re-entry).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Biological effect of current',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' involves irritation of external and internal receptors. Intense pain experienced by a person under electrical exposure causes prolonged hyperactivation of the sympathoadrenal system, increases catabolic metabolism, oxygen consumption, and energy expenditure.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Electrical injury',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' is trauma caused by electric current, characterized by structural and functional disturbances in tissues and organs, manifesting as local (burns) and systemic (loss of consciousness, cardiac and respiratory arrest) effects. Death is usually caused by sudden cardiac arrest due to ventricular fibrillation, less often by asystole, and very rarely by cardiac rupture. Respiratory death occurs due to primary cessation of breathing (central or peripheral).'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What is electric current?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Random oscillation of charged particles.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Ordered movement of charged particles.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Thermal effect when current passes through conductors.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Electromagnetic oscillations in space.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'What are the main types of tissue damage caused by electrochemical effect of current?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Coagulative and liquefactive necrosis.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Thermal burns and bone fractures.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Muscle contracture and bleeding.',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) Coma and stroke.', isCorrect: false }
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'What happens when electric current thermally affects tissues?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Relaxation of muscle fibers.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Formation of ice crystals in cells.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Denaturation of proteins and cell destruction.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Increased cellular resistance to radiation.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'What is the main symptom of an electric shock causing cardiac arrest?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Ventricular fibrillation.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Spontaneous stomach contraction.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Decreased pulse rate.',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) Skin redness.', isCorrect: false }
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question: "What does the term 'electrical injury' mean?",
							options: [
								{
									id: 'opt-1',
									text: 'A) Wound from a sharp object.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Burn from open flame.',
									isCorrect: false
								},
								{ id: 'opt-3', text: 'C) Cut by glass.', isCorrect: false },
								{
									id: 'opt-4',
									text: 'D) Trauma caused by electric current.',
									isCorrect: true
								}
							]
						}
					]
				},

				{
					id: 'chapter-2-10',
					title: 'Factors Determining the Severity of Electric Injury',
					hash: 'factors-electric-injury',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The severity of electric injury depends on voltage, current strength, type of current (direct or alternating), resistance, the path of current flow, duration of contact, and the condition of the human body. All other factors being equal, the higher the '
											},
											{
												type: 'text',
												text: 'voltage',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ', the more dangerous the current. High-voltage current (>500–1000 V) usually causes deep burns, while low-voltage current (110–220 V) generally induces muscle spasm during exposure – tetany. In some cases, high-voltage currents (thousands of volts or more) do not lead to death if an arc discharge occurs at the contact point, causing tissue charring, which sharply increases resistance and reduces current strength.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Alternating current',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' with a voltage up to 500 V is more dangerous than'
											},
											{
												type: 'text',
												text: ' direct current.',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' This difference is due to nerve tissue excitation: direct current excites nerves only at the moment of circuit closure and opening, while alternating current excites nerves throughout the current flow.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: "A decisive factor in assessing the pathological effect of alternating current is its strength and duration of contact. At AC values above 8–10 mA, involuntary contraction of the hand muscles prevents the victim from releasing the electrodes ('let-go' current). With current of 26–50 mA passing through the torso, tetanic contraction of respiratory muscles occurs, making breathing difficult or stopping it entirely. If the circuit is not interrupted, death by asphyxia may occur within minutes. AC over 50–100 mA passing through the chest poses a real risk of ventricular fibrillation."
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'In industry and daily life, people mostly encounter alternating current'
											},
											{
												type: 'text',
												text: ' of frequency',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' 40–60 Hz. As AC frequency through the human body increases, total body resistance decreases, and current strength rises. Resistance reduction is possible only in the 0–60 Hz range. At higher frequencies, the risk of electric shock decreases and disappears at 450–500 kHz, though burns remain possible.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The severity of electric shock also depends on'
											},
											{
												type: 'text',
												text: ' skin resistance',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: '. Skin resistance greatly exceeds that of other tissues, but varies widely. High resistance leads to burns at contact points, while low resistance increases the likelihood of internal organ damage. As cell membranes have high resistance, low-frequency current mainly conducts through the ionic content of intercellular fluid. The lowest resistance is in cerebrospinal fluid, blood serum, lymph, and muscle tissue.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The current path'
											},
											{
												type: 'text',
												text: ' through the human body is determined by entry and exit points and is called a loop. The most dangerous for sudden heart or respiratory arrest is a current path through the head and/or chest (hand-hand, hand-foot, head-hand, head-foot loops). During'
											},
											{
												type: 'text',
												text: ' prolonged',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' exposure, current intensity increases along with irradiation. This can cause ventricular fibrillation even through the least dangerous lower loop. If extensive tissue damage occurs, death may result regardless of the current path.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question:
								'Which type of current is less dangerous at voltages of 200–220 V?',
							options: [
								{ id: 'opt-1', text: 'A) Direct current', isCorrect: false },
								{
									id: 'opt-2',
									text: 'B) Alternating current',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Both are equally dangerous',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Danger does not depend on current type',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'What happens when exposed to high voltage (over 1000 V)?',
							options: [
								{ id: 'opt-1', text: 'A) Deep burns', isCorrect: true },
								{
									id: 'opt-2',
									text: 'B) Superficial scratches',
									isCorrect: false
								},
								{ id: 'opt-3', text: 'C) Mild itching', isCorrect: false },
								{
									id: 'opt-4',
									text: 'D) Temporary loss of consciousness',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'Which factor makes alternating current more dangerous at low voltages?',
							options: [
								{ id: 'opt-1', text: 'A) Frequency', isCorrect: true },
								{ id: 'opt-2', text: 'B) Wind speed', isCorrect: false },
								{ id: 'opt-3', text: 'C) Food composition', isCorrect: false },
								{ id: 'opt-4', text: 'D) Clothing color', isCorrect: false }
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								"What effect does a 'let-go' current have on the victim?",
							options: [
								{
									id: 'opt-1',
									text: 'A) Ability to release the wires independently',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Skill to instantly switch off electricity',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Hand spasms preventing release from the source',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Painless tingling sensation',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'Why does high skin resistance reduce the risk of deep electric injury?',
							options: [
								{
									id: 'opt-1',
									text: 'A) High skin conductivity prevents deep burns',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) High resistance causes surface burns, preventing deep injury',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Skin fully protects internal organs',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Electric current instantly converts into light energy',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-2-11',
					title: 'Task: Disease Outcomes and Stages of Organism Dying',
					hash: 'dnd-blocks',
					isRead: false,
					blocks: [
						{
							id: 'dnd-2-1',
							type: 'drag-drop-table',
							title: 'Factors Determining the Severity of Electric Injury',
							tableTitle:
								"Students are asked to complete a flowchart: 'Factors Determining the Severity of Electric Injury', and classify clinical signs of electric injury depending on current characteristics. Correct answers are selected from the general list.",
							columns: [
								{ id: 'factor', title: 'Factor', width: '30%' },
								{ id: 'characteristic', title: 'Characteristic', width: '40%' },
								{ id: 'effects', title: 'Effects', width: '30%' }
							],
							rows: [
								{
									id: 'row1',
									title: 'Current frequency',
									characteristic: 'Low frequency (40–60 Hz)'
								},
								{
									id: 'row2',
									title: 'Current frequency',
									characteristic: 'High frequency (from 1 MHz and above)'
								},
								{
									id: 'row3',
									title: 'Type of current',
									characteristic: 'Direct'
								},
								{
									id: 'row4',
									title: 'Type of current',
									characteristic: 'Alternating'
								},
								{
									id: 'row5',
									title: 'Voltage',
									characteristic: 'Low voltage (110–220 V)'
								},
								{
									id: 'row6',
									title: 'Voltage',
									characteristic: 'High voltage (>500 V)'
								},
								{
									id: 'row7',
									title: 'Current strength',
									characteristic:
										"Low (up to 15 mA AC; up to 50 mA DC) ('let-go' current)"
								},
								{
									id: 'row8',
									title: 'Current strength',
									characteristic:
										"Medium (20–80 mA AC; over 50 mA DC) ('non-let-go' current)"
								},
								{
									id: 'row9',
									title: 'Current strength',
									characteristic:
										'Fibrillating (over 100 mA AC, over 300 mA DC)'
								},
								{
									id: 'row10',
									title: 'Duration of exposure',
									characteristic: 'Short-term'
								},
								{
									id: 'row11',
									title: 'Duration of exposure',
									characteristic: 'Long-term'
								},
								{
									id: 'row12',
									title: 'Current path',
									characteristic: 'Depending on direction'
								},
								{
									id: 'row13',
									title: 'Current path',
									characteristic: "Source to 'ground'"
								},
								{
									id: 'row14',
									title: 'Degree of alcohol intoxication',
									characteristic: 'Mild'
								},
								{
									id: 'row15',
									title: 'Degree of alcohol intoxication',
									characteristic: 'Severe'
								},
								{
									id: 'row16',
									title: 'Tissue resistance at contact point',
									characteristic:
										'Cut at entry point, wet skin = low resistance'
								},
								{
									id: 'row17',
									title: 'Tissue resistance at contact point',
									characteristic: 'Thick dry skin = high resistance'
								}
							],
							answers: [
								{ id: 'ans1', content: 'Fibrillation, fatal outcome' },
								{
									id: 'ans2',
									content:
										'Severity of electric injury is less (high dielectric concentration)'
								},
								{
									id: 'ans3',
									content: 'More severe burns, less internal organ damage'
								},
								{ id: 'ans4', content: 'Muscle spasms' },
								{ id: 'ans5', content: 'Dangerous' },
								{ id: 'ans6', content: 'Less dangerous' },
								{
									id: 'ans7',
									content:
										'Acute electric asphyxia due to paralysis of respiratory muscles'
								},
								{
									id: 'ans8',
									content:
										'Tonic muscle spasm of the upper limb causes the victim to grip the current source for a long time'
								},
								{ id: 'ans9', content: 'Deep tissue burns' },
								{ id: 'ans10', content: 'Foot-to-foot' },
								{ id: 'ans11', content: 'More dangerous' },
								{ id: 'ans12', content: 'Hand-to-hand' },
								{
									id: 'ans13',
									content:
										'Severity of electric injury is greater (lower dielectric concentration)'
								},
								{
									id: 'ans14',
									content:
										'Burns are less extensive/absent, internal organs less affected'
								},
								{
									id: 'ans15',
									content: 'Not dangerous, used for therapeutic purposes'
								},
								{
									id: 'ans16',
									content:
										'Single muscle spasm throws the victim off the current source'
								},
								{ id: 'ans17', content: 'Ascending' },
								{ id: 'ans18', content: 'Descending' },
								{
									id: 'ans19',
									content: 'Muscle tetany with risk of prolonged exposure'
								},
								{ id: 'ans20', content: 'Hand-to-foot' },
								{ id: 'ans21', content: 'Foot-to-head' },
								{ id: 'ans22', content: 'Foot-hand-hand-foot' }
							],
							correctAnswers: {
								row1_effects: ['ans5'],
								row2_effects: ['ans15'],
								row3_effects: ['ans16'],
								row4_effects: ['ans8'],
								row5_effects: ['ans19'],
								row6_effects: ['ans9'],
								row7_effects: ['ans4'],
								row8_effects: ['ans7'],
								row9_effects: ['ans1'],
								row10_effects: ['ans6'],
								row11_effects: ['ans11'],
								row12_effects: ['ans17', 'ans18'],
								row13_effects: ['ans10', 'ans12', 'ans20', 'ans21', 'ans22'],
								row14_effects: ['ans6'],
								row15_effects: ['ans11'],
								row16_effects: ['ans13', 'ans14'],
								row17_effects: ['ans2', 'ans3']
							}
						}
					]
				},

				{
					id: 'chapter-2-12',
					title: 'Interactive Experiment',
					hash: 'game-case',
					isRead: false,
					blocks: [
						{
							id: 'game-1',
							type: 'game',
							title:
								'Pathogenic Effect on the Body of Reduced Oxygen in Inhaled Air under Hypothermia Conditions',
							gameUrl: '/games/lab2/index.html',
							width: '100%',
							height: 'auto'
						}
					]
				},

				{
					id: 'chapter-2-13',
					title: 'Clinical Case: Pathogenic Factors',
					hash: 'clinical-case-pathogenic-factors',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Clinical Case:'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: "A 31-year-old man with no prior health issues was taking a shower near a washing machine connected to the power supply. The washing machine's casing was in contact with a metal bathtub. The bathtub, shower hose, and shower head became conductors of electricity. The washing machine was plugged into an ungrounded outlet, and no residual-current device (RCD) was installed on the circuit powering it. The man suffered an electric injury, resulting in respiratory and cardiac arrest. A witness immediately performed basic cardiopulmonary resuscitation (CPR) for about 10 minutes until the arrival of the first ambulance team. Advanced CPR continued for another 20 minutes, with an initial shockable rhythm (ventricular fibrillation). After 30 minutes of CPR, spontaneous circulation was restored (ROSC)."
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The patient remained unconscious and was transported to the hospital under sedation and connected to mechanical ventilation. Upon arrival, blood pressure was 89/60 mmHg, heart rate 80 bpm, and ear canal temperature 35 °C. Glasgow Coma Scale (GCS) score was 3/15, pupils were symmetrical. Blood glucose level was 4.4 mmol/L. No entry or exit wounds were observed. Additional tests revealed acute kidney injury (creatinine 141.44 μmol/L, urea 6.64 mmol/L), hyperphosphatemia (3.68 mmol/L), rhabdomyolysis (creatine kinase (CK) 406 U/L, myoglobin 6241 mg/L), hepatocellular cytolysis (aspartate aminotransferase (AST) 102 U/L, alanine aminotransferase (ALT) 101 U/L); elevated troponin level (750 ng/L, normal <34.5 ng/L), and negative drug abuse screening. Thyroid function and other serum electrolytes were normal; transthoracic echocardiography and electrocardiogram (ECG) showed no significant changes, CT angiography revealed no pulmonary embolism but showed focal opacities in both lungs, mainly in the upper lobes, and focal consolidation in the right lower lobe.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Brain CT at admission revealed a left-sided intracerebral hemorrhage. The patient’s condition gradually improved, with a Glasgow Coma Scale score of 11/15. No focal motor deficits were observed. Electroencephalogram (EEG) excluded paroxysmal activity, and additional MRI showed hyperintense areas in the brain, indicating cytotoxic edema.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Mean arterial pressure (MAP) was >75 mmHg with temporary need for vasopressor support and fluid resuscitation. No arrhythmias were recorded. Troponin monitoring showed a peak of 33,000 ng/L (12 hours after admission) with subsequent normalization; ECG showed some nonspecific changes but normalized within a few days.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The patient remained on mechanical ventilation for five days with minimal respiratory insufficiency. On the first day, antibiotics (amoxicillin-clavulanate) were initiated due to suspected aspiration following elevated body temperature (39ºC after cessation of targeted temperature management), productive sputum, and CT evidence of consolidation in the lower chest. Notably, ground-glass opacities were also present in both lungs upon admission. Successful extubation was achieved on day five in the ICU.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Acute kidney injury resolved within 5 days. Diuresis was maintained at >200 ml/kg. Rhabdomyolysis resolved within 72 hours. No burns or skin damage indicating entry or exit wounds were observed. Transient elevations of AST and ALT (up to 3 times normal at admission) normalized subsequently.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The patient was discharged and sent to a rehabilitation center, where motor and cognitive functions improved over three months. Follow-up assessment showed the ability to perform basic daily activities such as eating, dressing, and bathing, although the capacity for complex cognitive tasks remained impaired.'
											}
										]
									}
								]
							}
						},
						{
							id: 'clinical-case-2-13-1',
							type: 'free-input',
							title: 'Clinical Case: Pathogenic Factors',
							questions: [
								{
									id: 'q1-patho',
									text: 'What are the main pathological processes that developed in the patient due to electric shock? Justify your answer using data from the case description.',
									maxLength: 1000
								},
								{
									id: 'q2-therapy',
									text: 'Which factors determine the severity of electric injury, and which of them were present in this case?',
									maxLength: 800
								},
								{
									id: 'q3-therapy',
									text: 'How can the sharp increase in troponin level to 33,000 ng/L be explained in the absence of significant structural changes in the heart on ECG and echocardiography?',
									maxLength: 800
								}
							],
							timeLimit: 1800,
							submissionText: 'Answer submitted for instructor review'
						}
					]
				}
			]
		}
	]
}
