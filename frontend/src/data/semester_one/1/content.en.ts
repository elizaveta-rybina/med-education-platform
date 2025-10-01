import { Course } from '@/data/types'

export const courseData: Course = {
	id: 'course-1',
	title: 'General Nosology',
	description: 'General Nosology',
	modules: [
		{
			id: 'module-1',
			title: 'Subject, Goal, and Objectives of Pathophysiology',
			chapters: [
				{
					id: 'chapter-1-1',
					title: 'Subject, Goal, and Objectives of Pathophysiology',
					hash: 'what-is',
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
												text: 'Pathophysiology is an integrative fundamental biomedical science that studies the vital activity of a diseased human organism, exploring the causes, general patterns, and mechanisms of the onset, development, and outcomes of diseases, as well as the principles of their correction and mechanisms of recovery.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The subject of pathophysiology research is the study of the causes and general patterns of impaired functions of cells and organs in a diseased organism, as well as the mechanisms of recovery. Accordingly, pathophysiology addresses the following objectives: obtaining fundamental knowledge about the essence of disease, the laws of its development, and recovery mechanisms; understanding pathological processes common to many diseases.'
											},
											{
												type: 'text',
												text: 'Pathophysiology examines the general patterns of the onset, development, and resolution of diseases and pathological processes at various levels of organization: molecular, cellular, tissue, organ, systemic, and organismal.',
												marks: [{ type: 'italic' }]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Medical sciences (disciplines) study changes in the human body resulting from disease, focusing on specific aspects of the pathological process and its interaction with the organism. The object of study in clinical sciences is a specific patient with specific manifestations of a disease. The task of pathophysiology is to integrate a vast array of disparate facts and knowledge obtained from clinical observations and validated through animal experiments.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The task of pathophysiology includes not only analyzing the functional aspects of disease but also creating a unified system of concepts about the patterns and mechanisms of dysregulation of functions underlying the development of both typical pathological processes and specific disease forms. This system of concepts forms a logical model that clinicians subsequently use in their therapeutic practice.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Pathophysiological analysis of a disease encompasses a multitude of processes occurring in various organs and tissues at different structural and functional levels. This includes assessing the biological significance of pathogenic factors, their interrelationships, cause-and-effect relationships between internal and external factors, stages of observed phenomena, their qualitative and quantitative characteristics, and more.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Since some elements of pathological processes recur to varying degrees in different combinations across various diseases, pathophysiology studies typical pathological processes: edema, inflammation, impaired microcirculation, hypoxia, energy deficiency, degeneration, impaired membrane and receptor function, dystrophic changes, altered genome activity, and other processes.'
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
								'What is the primary object of study in pathophysiology?',
							options: [
								{
									id: 'opt-1',
									text: 'A) A specific patient with a specific disease',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Impaired functions at various structural and functional levels of the organism',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Clinical symptoms of individual diseases',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) The psychosomatic state of the patient',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Which levels of organism organization does pathophysiology consider?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Only the cellular level',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Molecular, cellular, tissue, organ, systemic, and organismal',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Only organ and systemic',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Only molecular and cellular',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'What is one of the key objectives of pathophysiology?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Diagnosis of specific diseases',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Prevention of infectious diseases',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Creating a general model of the laws of disease development and recovery mechanisms',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Prescribing medications to patients',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'Why is pathophysiology considered an integrative science?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Because it integrates knowledge from multiple medical fields',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Because it focuses exclusively on cell studies',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Because it focuses on mental health',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Because it ignores clinical observations',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'Which process is considered a typical pathological process studied by pathophysiology?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Antibody production by the immune system',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Muscle tissue growth after exercise',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Tissue inflammation',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Normal breathing of the organism',
									isCorrect: false
								}
							]
						}
					]
				},
				{
					id: 'chapter-1-2',
					title:
						'Main Methods of Pathophysiology. Requirements for Disease Models',
					hash: 'types-vosn',
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
												text: 'Experimental Modeling',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ' – modeling that typically reproduces, in a simplified form, pathological processes and key disease syndromes in animals, enabling the study of their etiology and pathogenesis, the development of scientifically grounded methods for prevention and therapy, and the evaluation of their effectiveness. The choice of animal species and age plays a crucial role in reproducing pathological processes and human diseases.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Experimental modeling consists of several stages:'
											}
										]
									},
									{
										type: 'orderedList',
										content: [
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Studying vital activity parameters within normal limits'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Modeling the disease (pathological process)'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Studying the disease (pathological process) dynamically'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Developing methods for pathogenetic therapy (or prevention) with subsequent transfer of the obtained data to clinical practice (clinical validation)'
															}
														]
													}
												]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Modeling pathological processes and syndromes in animals aims to reproduce the most important and characteristic features of human diseases. Fully replicating a human disease through an experimental model '
											},
											{
												type: 'text',
												text: 'is not possible',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ', as the human organism is significantly more complex than that of animals. Additionally, human vitality is influenced not only by natural but also by social factors, including those acting through the psyche.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Translational Medicine',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ' – an interdisciplinary field aimed at accelerating the implementation of scientific discoveries and technological advancements into clinical practice to improve patient health. It involves both transferring research results from the laboratory to the clinic (from science to patient) and feedback from practice to research for further improvement.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Experimental modeling is conducted at different levels of animal organism integration:'
											}
										]
									},
									{
										type: 'bulletList',
										content: [
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'The whole-organism level allows modeling conditions closest to human diseases, such as neurosis in dogs and monkeys, diabetes mellitus, renal arterial hypertension, and immunodeficiency states.'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'The organ level focuses on establishing functional, biochemical, and structural impairments in isolated organs maintained in a special environment to sustain viability. Using the "exclusion" method, specific structures are severed, destroyed, or removed in acute and chronic animal experiments. For example, removing parathyroid glands in rats leads to severe impairment of mineralization in continuously growing teeth (enamel hypoplasia).'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'The tissue level is used to isolate the "pure tissue component" of organ pathology and exclude local regulatory influences. For this purpose, a tissue section (or suspension, e.g., bone marrow) from an animal organ exposed to a pathogenic agent is placed in a culture medium that supports basic vital processes and undergoes comprehensive investigation.'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'At the cellular and intracellular levels, numerous indicators are studied, including membrane potential, excitability, endo- and exocytosis, and intracellular processes related to membrane and organelle activity.'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Molecular-level modeling involves isolating and studying changes in the activity and properties of enzymes, proteins, and other compounds, as well as the cellular receptor apparatus under the influence of pathogenic factors.'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Modeling at the cellular genome level aims to study the mechanisms by which pathogenic factors influence cell mutations, widely applied to investigate the etiology and pathogenesis of hereditary and congenital diseases, tumor growth, "storage diseases," and others. Molecular and genetic levels of modeling pathological processes are closely interconnected.'
															},
															{
																type: 'text',
																text: 'CRISPR/Cas9',
																marks: [{ type: 'italic' }]
															},
															{
																type: 'text',
																text: ' – a revolutionary genome-editing technology based on the bacterial immune defense system, enabling precise DNA modifications in the cells of living organisms, including plants, animals, and humans. This tool, often called "genetic scissors," opens vast opportunities for research and treatment of genetic diseases.'
															}
														]
													}
												]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Each modeling method has its limitations, advantages, and disadvantages. However, the overall task of experimental modeling of pathological processes at different levels of organism integration is to achieve the primary goal of pathophysiology – studying the etiology, pathogenesis, and outcomes of human diseases.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Natural Experiments Involving Humans.',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ' It should be emphasized that the human organism is far more complex than even the most highly organized animals, such as anthropoid apes. Therefore, fully modeling human diseases in animals is impossible.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The goal of natural experiments involving humans (non-invasive study of pathological process dynamics directly at the patient’s bedside) is to study the human organism’s condition under the influence of external potentially pathogenic factors when this goal cannot be achieved through animal experiments.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Based on bedside studies of diseases, new data on the fundamental mechanisms of oncological, allergic, hematological, and many other human diseases have been obtained.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Typically, natural experiments are conducted after preliminary animal studies and predictions to ensure the maximum safety of potential human reactions to the studied impact.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'All known scientific methodologies are used in model studies: physical, chemical, physiological, electrophysiological, hematological, biophysical, biochemical, morphological, electron-microscopic, isotopic, immunological, and others.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The Method of Comparative-Evolutionary Pathology Research.',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ' The founder of this method is I.I. Mechnikov (1845–1916), who first linked the comparative method with evolutionary theory. By applying the comparative pathology method to study inflammation, Mechnikov demonstrated its significance for understanding the structure and mechanisms of physiological and pathological reactions and processes in higher organisms and humans, formed through evolution.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Methods of Mathematical and Cybernetic Modeling, Creation of Artificial Biological Systems.',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ' Mathematical and cybernetic modeling methods allow the study of complex biological systems and organs, predicting their behavior under various conditions. These methods rely on information technologies, computational algorithms, and specialized computer programs.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The creation of electronic models of biological objects has become a vital tool for solving practical medical and biological tasks.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [{ type: 'text', text: 'Such models enable:' }]
									},
									{
										type: 'bulletList',
										content: [
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Modeling the operation of critical organs and systems (heart, vessels, liver, kidneys, etc.)'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Predicting changes in physiological parameters and their deviations in diseases'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Testing possible treatment options and evaluating their effectiveness before real-world application'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Using acquired experience to develop new prostheses, artificial organs, and innovative technologies'
															}
														]
													}
												]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'For example, electronic models of cardiac activity allow predicting the effects of drug administration, the body’s response to stress or physical exertion, thereby ensuring optimal treatment of cardiac diseases.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Electronic models are built based on a large volume of empirical data obtained from experimental studies at various levels of organism integration (molecular, cellular, tissue, organ, and systemic). These models account for real physiological parameter values and their changes depending on environmental conditions, age, sex, and other factors.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Thanks to supercomputers, specialists can analyze vast amounts of data and quickly obtain forecasts needed by doctors and biologists for decision-making.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Thus, mathematics and cybernetics open unique opportunities for deep understanding of the human organism and optimizing preventive and therapeutic efforts in healthcare.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Main Requirements for Disease Models',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ', when modeling with animals: identity of pathogenic factors, conditions of onset, and stages of pathology and disease development; similarity of functional and morphological changes at various levels of organism integration (systemic, organ, cellular, subcellular, and molecular); effectiveness of the same medications for treatment in both clinical and experimental settings. The choice of animals is particularly important. They must respond to the pathogenic factor in the same way as humans, depending on the animal’s immune reactivity, metabolic rate, basal metabolism, permeability of external and internal barriers, age, and lifespan.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Permissible differences between the experimental model and the original, i.e., the nosological form of human disease: varying durations of disease stages, intensity, and prevalence of pathological processes in experimental animals.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'It should be acknowledged that the primary method of modeling in pathophysiology is organismal, as it allows identifying the main patterns of the origin, course, and outcome of human diseases, while other modeling levels primarily treat the organism as a biological object.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Modeling requires a clear definition of the real goal and specific research objectives, justification of informative methodologies appropriate to the goal and objectives, and objective analysis and synthesis of obtained data. Every experimental modeling method has its boundaries and limitations, as fully replicating a human disease in animals is impossible. When conducting experiments, adherence to "Rules" of humane treatment of animals is essential.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What is experimental modeling in pathophysiology?',
							options: [
								{
									id: 'opt-1',
									text: 'A) A model fully replicating a human disease in animals.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Simplified reproduction of pathological processes and disease syndromes in animals to study their causes and mechanisms.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Modeling the effects of environmental factors on a population.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Conducting experiments on humans to study diseases.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Which stage is absent in the scheme of experimental modeling of pathological processes?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Studying vital activity parameters within normal limits.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Modeling the disease.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Treatment and restoration of the organism.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Developing methods for pathogenetic therapy and subsequent clinical validation.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'What is the pathogenesis of a disease?',
							options: [
								{
									id: 'opt-1',
									text: 'A) A set of factors leading to the onset of a disease.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) The sequence of stages in disease development.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Hereditary predisposition to a disease.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) The result of an erroneous lifestyle.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'What does the concept of a "holistic" model mean in experimental research?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Complete replication of a human disease in animals.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Recreating a disease in a single isolated organ.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Attempting to simulate a disease in its entirety using the whole animal organism.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Replacing affected tissues with synthetic materials.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What limitations are inherent in experimental modeling of diseases in animals?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Inability to conduct the modeling procedure.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Difficulties in selecting the appropriate animal type.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Lack of ethical constraints.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Inability to accurately reproduce the social component and full complexity of human disease.',
									isCorrect: true
								}
							]
						}
					]
				},
				{
					id: 'chapter-1-3',
					title: 'Modern Concepts of Disease',
					hash: 'endogenous-types',
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
												text: 'Nosology is the general study of disease, examining disease as a condition of a person that impairs their social functions due to a pathological process.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Nosology, as a general theoretical study of disease, does not address specific pathological processes, their forms, or progression. Its subject of study includes: the essence of disease as a particular human condition; the causes and conditions of its onset; stages of disease development; and the classification of diseases and their elements.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'A disease is a complex general reaction of the organism to the damaging effects of environmental factors; it is a qualitatively new life process accompanied by destructive and adaptive structural, metabolic, and functional changes in organs and tissues, leading to reduced adaptability to continuously changing environmental conditions and restricted work capacity.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Key criteria for a disease include:'
											}
										]
									},
									{
										type: 'bulletList',
										content: [
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Patient complaints (subjective criterion)'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Results of objective patient examination (objective criterion)'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Reduced adaptability and work capacity'
															}
														]
													}
												]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'A pathological reaction is a short-term unusual response of the organism to a specific impact. For example, a temporary increase in blood pressure due to negative emotions, allergic reactions, pathological reflexes involving the central nervous system (Babinski, Rossolimo symptoms, etc.), phagocytosis during inflammation, or centralization of blood circulation during shock.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Often, various pathological processes and individual pathological reactions of cells and tissues in humans and animals occur as constant combinations or patterns established through evolution. These are typical pathological processes.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'A typical (standard) pathological process is a genetically programmed pathological process formed through evolution, occurring as constant combinations or patterns (regardless of the animal species or the cause triggering it). These include inflammation, edema, tumors, fever, hypoxia, stasis, hyperemia, ischemia, dystrophy, and others.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'A pathological condition is a slow-progressing pathological process. It may result from a previously experienced disease or impaired intrauterine development. It is the outcome of a completed pathological process that has permanently altered an organ’s structure or caused atypical substitutions in specific tissues. A pathological condition is characterized by reduced organism resistance, which may contribute to the transition to a disease.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Disease classification is a system for categorizing diseases, symptom complexes, pathological conditions, and symptoms into classes and groups based on accepted medical and pathological criteria. Various classification approaches exist:'
											}
										]
									},
									{
										type: 'bulletList',
										content: [
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Etiological – by cause: infectious, traumatic, nutritional, etc.'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Pathogenetic – based on pathogenesis characteristics: inflammatory, allergic, oncological, etc.'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Organ-based – based on the predominantly affected organ: brain, heart, lung, stomach, liver, kidney, skin diseases, etc.'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Age-based – diseases of newborns, children, the elderly, etc.'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Gender-based – male and female diseases'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Social – substance abuse, drug addiction, alcoholism, tobacco use'
															}
														]
													}
												]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Forms and stages of disease development:'
											}
										]
									},
									{
										type: 'bulletList',
										content: [
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{ type: 'text', text: 'Acute – up to 4 days' }
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{ type: 'text', text: 'Acute – about 5–14 days' }
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{ type: 'text', text: 'Subacute – 15–40 days' }
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Chronic – lasting months or years'
															}
														]
													}
												]
											}
										]
									},
									{
										type: 'paragraph',
										content: [{ type: 'text', text: 'Stages of disease:' }]
									},
									{
										type: 'bulletList',
										content: [
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Latent (hidden) – the onset of the disease, a covert transition from normal to pathological'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Prodromal – initial non-specific signs of the disease followed by the development of clinical manifestations'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Actual disease – the stage of clinical manifestations with characteristic symptoms'
															}
														]
													}
												]
											}
										]
									},
									{
										type: 'paragraph',
										content: [{ type: 'text', text: 'Disease outcomes:' }]
									},
									{
										type: 'bulletList',
										content: [
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Recovery (complete, incomplete)'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Transition to a chronic form'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [{ type: 'text', text: 'Death' }]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Clinical death – absence of external signs of life, but metabolic processes in tissues persist at a low level'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Biological death – irreversible cessation of the organism’s vital activity'
															}
														]
													}
												]
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What does nosology study?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Specific diseases and their treatment.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Human social functions.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) General theoretical foundations of the concept of "disease": causes, stages, classification.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Biochemical processes in cells.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question: 'What criteria determine the presence of a disease?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Presence of patient complaints, objective examination abnormalities, reduced work capacity.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) External well-being of the patient.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Physical activity and positive attitude.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Prolonged elevated temperature.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'What is a typical pathological process?',
							options: [
								{
									id: 'opt-1',
									text: 'A) A process unique to each individual disease case.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Constant combinations and patterns of pathological reactions formed through evolution.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Localized painful changes in a single organ.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Processes occurring only in the elderly.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'What are diseases that develop slowly and persist for a long time called?',
							options: [
								{ id: 'opt-1', text: 'A) Acute.', isCorrect: false },
								{ id: 'opt-2', text: 'B) Chronic.', isCorrect: true },
								{ id: 'opt-3', text: 'C) Acute-onset.', isCorrect: false },
								{ id: 'opt-4', text: 'D) Latent.', isCorrect: false }
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question: 'Which of the following is a possible disease outcome?',
							options: [
								{ id: 'opt-1', text: 'A) Complete recovery.', isCorrect: true },
								{
									id: 'opt-2',
									text: 'B) Sharp improvement in well-being.',
									isCorrect: false
								},
								{ id: 'opt-3', text: 'C) Weight gain.', isCorrect: false },
								{
									id: 'opt-4',
									text: 'D) Temporary symptom relief.',
									isCorrect: false
								}
							]
						}
					]
				},
				{
					id: 'chapter-1-4',
					title: 'General Etiology',
					hash: 'biochemical-mechanisms',
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
												text: 'Etiology is a section of nosology concerning the causes and conditions of the onset and development of diseases.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The cause of a disease is the factor (primary etiological, triggering, specific) that induces the disease and imparts its specific characteristics.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'For example, the cause of radiation sickness is ionizing radiation, and the cause of an infectious disease is pathogenic microorganisms. Each disease has its own specific cause.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The cause of a disease is not an isolated factor but the interaction of an external (or internal) pathogenic (etiological) factor with the organism under specific external and internal environmental conditions, leading to cellular and tissue damage and eliciting pathological and protective-compensatory-adaptive reactions.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Causes of disease can include various environmental and internal factors. Each cause has its qualitative characteristics, determining the specificity of its impact on the organism. For instance, mechanical factors cause structural damage to the affected body parts, high temperatures cause protein coagulation, and ionizing radiation causes ionization of atoms and molecules. Thus, each cause leads to specific primary changes in the organism, laying the foundation for the quality of the organism’s response in the form of a specific nosological disease form.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'However, identifying the cause of a disease can sometimes be challenging (e.g., certain tumors, mental illnesses). For instance, it has been proven that gastric ulcers develop due to both poor diet and dysfunctions of the autonomic nervous system or endocrine disorders.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Studying and considering the role of pathogenic factors in the onset and development of a disease is essential, as the form and specific manifestations of the pathology depend on the pathogenic factor.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Conditions of disease onset and development'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Unlike causes, conditions are not mandatory for disease development. They determine the quantitative, not qualitative, characteristics of a disease.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Disease conditions are factors influencing the onset and development of diseases. In the presence of a cause, a disease may develop without certain conditions. For example, lobar pneumonia caused by highly virulent pneumococcus can develop without hypothermia or nutritional deficiencies. Conditions are divided into those predisposing to or facilitating disease development and those preventing disease onset and progression. Both types can be internal or external.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Conditions often act as a trigger, realizing the pathogenic effect of the etiological factor on the organism.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Identifying the primary, specific etiological factor, as well as conditions predisposing to or facilitating disease development and those preventing it, is absolutely necessary for developing effective disease prevention measures, reducing morbidity, and improving public health.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What is etiology in medicine?',
							options: [
								{
									id: 'opt-1',
									text: 'A) The study of disease diagnosis.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) The science of disease treatment.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) The study of the causes and conditions of disease onset.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) The theory of preventing relapses.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question: 'What is meant by the cause of a disease?',
							options: [
								{
									id: 'opt-1',
									text: 'A) The external environment of human habitation.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Any circumstances leading to health deterioration.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Factors causing the disease and defining its characteristic features.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Internal resources of the organism aimed at protection against infection.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'Provide an example of a cause of an infectious disease.',
							options: [
								{
									id: 'opt-1',
									text: 'A) Smoking cigarettes.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Bacteria or viruses.',
									isCorrect: true
								},
								{ id: 'opt-3', text: 'C) Poor nutrition.', isCorrect: false },
								{
									id: 'opt-4',
									text: 'D) Alcohol dependence.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'Is it true that conditions of a disease are factors necessarily present for its development?',
							options: [
								{ id: 'opt-1', text: 'A) Yes, true.', isCorrect: false },
								{
									id: 'opt-2',
									text: 'B) No, false. Conditions only facilitate disease development but are not mandatory.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Partially true. Some conditions are mandatory, others are secondary.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) There are no conditions for disease development.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'How does high temperature affect the organism according to etiological principles?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Leads to normalization of bodily functions.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Enhances resistance to viruses.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Causes protein denaturation (coagulation), leading to tissue damage.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Improves tissue blood supply.',
									isCorrect: false
								}
							]
						}
					]
				},
				{
					id: 'chapter-1-5',
					title: 'General Pathogenesis',
					hash: 'acute-adaptation',
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
												text: 'The general study of pathogenesis is a section of pathophysiology that examines the most general patterns (mechanisms of development) of the onset, progression, and outcomes of diseases, regardless of their etiology.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The study of pathogenesis involves analyzing so-called pathogenetic factors of diseases, i.e., the cause-and-effect relationships that arise in response to a cause and contribute to further disease development.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The pathogenesis of a disease, or the mechanism of disease development, is a set of interconnected and interdependent, continuously evolving functional (physiological), structural, biochemical, and biophysical changes.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Disease pathogenesis begins with some primary damage (R. Virchow) to cells in a specific part of the body (a first-order pathogenetic factor). In some cases, the initial damage may be gross and visible to the naked eye (trauma, injury, abrasions, wounds). In other cases, damage may be undetectable without special methods (molecular-level damage). The products of tissue damage become sources of new damage during disease progression, i.e., second-, third-, and fourth-order pathogenetic factors.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Determining the sequential chain of cause-and-effect relationships in a disease is crucial for conducting rational pathogenetic therapy.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'In the development of diseases and pathological processes, identifying the primary link of disruptions in the organism is extremely important — a change (one of the pathogenetic factors) that determines the development of subsequent disease stages. Eliminating the primary link of pathogenesis leads to organism recovery.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The primary link of pathogenesis is a change that is absolutely necessary for the unfolding of other pathogenetic links and precedes them.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Without identifying the primary link, pathogenetic therapy — a set of measures aimed at interrupting the cause-and-effect relationships between various structural, metabolic, and functional disruptions in the organism — is impossible. For example, bleeding and reduced blood volume (hypoxia) in acute blood loss determine the development of subsequent disruptions: impaired cardiovascular function (decreased blood pressure, weakened heart contractions), impaired respiration (respiratory insufficiency, hypoxia), and metabolic disorders (deepening hypoxia). Restoring circulating blood volume (CBV) through transfusion of blood or blood substitutes can eliminate all these disorders characteristic of blood loss. Reduced CBV and associated hypoxia (hypoxemia) are the primary link in blood loss.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'A vicious cycle is a closed chain of cause-and-effect relationships where a sequentially arising effect becomes the cause of new disruptions, exacerbating the initial pathological changes, thereby worsening the disease course.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'A disruption in organ or system function that arises during a pathological process often becomes a factor contributing to damage progression through the "vicious cycle" principle. For example, a sharp reduction in oxygen transport during blood loss leads to heart insufficiency, which further impairs oxygen transport.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Protective-compensatory processes are reactive changes in the organism under the influence of pathogenic factors, aimed at maintaining its homeostasis.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'In the early stages of a disease, protective-compensatory processes develop at molecular and cellular levels. With mild and short-term exposure to a cause (e.g., contact with low-virulence microorganisms, small doses of poisons, low-dose ionizing radiation, or minor injuries), a disease may not develop. Significant damage triggers stronger responses from organs and their regulating systems.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Sanogenesis is a dynamic complex of protective-adaptive physiological and pathophysiological mechanisms that develop under the influence of a pathogenic factor on the organism, aimed at restoring disrupted self-regulation.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Sanogenesis mechanisms function throughout the morbid process (from the pre-disease period to recovery) and are oriented toward restoring organism self-regulation.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'A key aspect of this process is the assertion that sanogenesis (recovery mechanisms) is a dialectical counterpoint to pathogenesis (disease mechanisms) and that sanogenesis mechanisms begin operating at the onset of a disease, not only during a clinically designated period of disease involution.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'While general disease mechanisms aim at organism disintegration as a biological unit, sanogenesis mechanisms are directed toward preserving homeostasis and organism integrity.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Primary and secondary sanogenesis mechanisms are distinguished.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Primary sanogenetic mechanisms include adaptive, protective, and compensatory reactions. These mechanisms activate before damage occurs and aim to support the organism under the influence of a pathogenic factor, thereby preventing disease onset and development.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Secondary sanogenetic mechanisms include protective, compensatory, and terminal mechanisms. These are the same processes observed in the premorbid period but now operate during an established pathological process to slow its progression.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What does general pathogenesis study?',
							options: [
								{
									id: 'opt-1',
									text: 'A) The medical history of a specific patient.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Specific causes of disease onset.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) The most general patterns of disease development, regardless of their cause.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Diagnostic procedures and disease treatment methods.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question: 'What is a vicious cycle in pathogenesis?',
							options: [
								{
									id: 'opt-1',
									text: 'A) A favorable disease resolution.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Activation of the organism’s self-recovery mechanism.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) A self-sustaining chain of disruptions exacerbating the disease course.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Positive dynamics in the patient’s condition.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'What is the primary link of pathogenesis?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Tissue damage in the organism.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Impairment of the organism’s protective forces.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Initial damage triggering subsequent disruptions in the organism.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Gradual disappearance of disease symptoms.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'What is meant by the term "sanogenesis"?',
							options: [
								{
									id: 'opt-1',
									text: 'A) A period of chronic disease exacerbation.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) A complex of protective and adaptive mechanisms aimed at recovery.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) A new phase of disease development.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Unsuccessful attempts by the organism to combat a disease.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'Which mechanisms participate in organism recovery during a disease?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Only primary sanogenesis mechanisms.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Exclusively medical interventions by a doctor.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Joint interaction of primary and secondary sanogenesis mechanisms.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) The sole mechanism is immune system activation.',
									isCorrect: false
								}
							]
						}
					]
				},
				{
					id: 'chapter-1-6',
					title: 'Assignment: "Disease Outcomes and Stages of Organism Dying"',
					hash: 'dnd-blocks',
					isRead: false,
					blocks: [
						{
							id: 'dnd-2',
							type: 'drag-drop-table',
							title: 'Disease Outcomes',
							tableTitle: 'Assignment: "List possible disease outcomes"',
							columns: [
								{ id: 'type', title: 'Disease Outcomes', width: '100%' }
							],
							rows: [
								{ id: 'row1', title: '1' }, // Статический заголовок строки (было column1: '1')
								{ id: 'row2', title: '2' },
								{ id: 'row3', title: '3' },
								{ id: 'row4', title: '4' },
								{ id: 'row5', title: '5' },
								{ id: 'row6', title: '6' }
							],
							answers: [
								{ id: 'ans2', content: 'Incomplete recovery' },
								{ id: 'ans1', content: 'Complete recovery' },
								{ id: 'ans4', content: 'Remission' },
								{ id: 'ans6', content: 'Death' },
								{ id: 'ans3', content: 'Relapse' },
								{ id: 'ans5', content: 'Transition to chronic form' },
							],
							correctAnswers: {
								row1_effects: ['ans1'], // Формат: rowId_columnId
								row2_effects: ['ans2'],
								row3_effects: ['ans3'],
								row4_effects: ['ans4'],
								row5_effects: ['ans5'],
								row6_effects: ['ans6']
							}
						},
						{
							id: 'dnd-3',
							type: 'drag-drop-table',
							title: 'Stages of Dying',
							tableTitle: 'Assignment: "List the stages of organism dying"',
							columns: [
								{ id: 'type', title: 'Stages of Dying', width: '100%' }
							],
							rows: [
								{ id: 'row1', title: '1' },
								{ id: 'row2', title: '2' },
								{ id: 'row3', title: '3' },
								{ id: 'row4', title: '4' }
							],
							answers: [
								{ id: 'ans1', content: 'Pre-agony' },
								{ id: 'ans3', content: 'Clinical death' },
								{ id: 'ans4', content: 'Biological death' },
								{ id: 'ans2', content: 'Agony' },
							],
							correctAnswers: {
								row1_effects: ['ans1'],
								row2_effects: ['ans2'],
								row3_effects: ['ans3'],
								row4_effects: ['ans4']
							}
						}
					]
				},
				{
					id: 'chapter-1-9',
					title: 'Interactive Experience',
					hash: 'game-case',
					isRead: false,
					blocks: [
						{
							id: 'game-1',
							type: 'game',
							title:
								'Pathogenic Effects of Reduced Oxygen in Inhaled Air Under Hypothermic Conditions',
							gameUrl:
								'https://gd.games/instant-builds/eae6daea-127e-4393-9d1d-fc262f8defec',
							width: '100%',
							height: 'auto'
						}
					]
				},
				{
					id: 'chapter-1-8',
					title: 'Clinical Case: Altitude Sickness',
					hash: 'altitude-case',
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
										content: [{ type: 'text', text: 'Clinical Case:' }]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'A 46-year-old woman was admitted to the emergency department with an acute altered mental state that developed during a mountain hike. The patient had traveled from a coastal region (~20 m above sea level) with a group of wilderness enthusiasts. After ascending to a base camp station (~3500 m above sea level), the patient began complaining of worsening malaise, nausea, chest tightness, and headache. Her symptoms worsened during a short hike to a campsite (~4000 m). Shortly after arriving, the patient experienced vomiting, shortness of breath, acrocyanosis, and facial pallor, prompting the team leader to call emergency services. During descent, the patient’s consciousness became more confused, and she required assistance to move. In the emergency department: blood pressure 132/86 mmHg, heart rate 84 beats per minute, respiratory rate 21 breaths per minute, oxygen saturation 93%, carbon dioxide 18 mmol/L (20–32 mmol/L). Physical examination noted tachypnea, incoherent muttering, eye-opening only in response to voice, and withdrawal from pain. She did not respond to questions or follow commands, was periodically aggressive, and attempted to get out of bed. A chest X-ray showed diffuse pulmonary vascular congestion without signs of pneumothorax, cardiomegaly, or consolidation.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Instructions for Completing the Assignment:'
											}
										]
									},
									{
										type: 'orderedList',
										content: [
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Carefully analyze all provided data'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Answer the questions using medical terminology'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'For each question, provide:'
															}
														]
													},
													{
														type: 'bulletList',
														content: [
															{
																type: 'listItem',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Clear diagnosis/answer'
																			}
																		]
																	}
																]
															},
															{
																type: 'listItem',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Pathophysiological justification'
																			}
																		]
																	}
																]
															},
															{
																type: 'listItem',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Supporting data from the case'
																			}
																		]
																	}
																]
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{
																type: 'text',
																text: 'Response length: 200–300 words per question'
															}
														]
													}
												]
											},
											{
												type: 'listItem',
												content: [
													{
														type: 'paragraph',
														content: [
															{ type: 'text', text: 'Time limit: 30 minutes' }
														]
													}
												]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Questions will be available after reviewing the theoretical material.'
											}
										]
									}
								]
							}
						},
						{
							id: 'clinical-case-1',
							type: 'free-input',
							title: 'Clinical Case: Altitude Sickness',
							questions: [
								{
									id: 'q1-patho',
									text: 'What pathological processes developed in the patient at an altitude of 4000 m? Justify your answer with data from the case.',
									maxLength: 1000,
									placeholder: 'Specify key pathophysiological processes'
								},
								{
									id: 'q2-therapy',
									text: 'Can it be assumed that the patient developed hypoxia? If so, what type(s)? Justify your answers.',
									maxLength: 800
								},
								{
									id: 'q3-therapy',
									text: 'Which mechanisms of adaptation to hypoxia (short-term and/or long-term) were insufficient in the patient? Justify your answer.',
									maxLength: 800
								}
							],
							timeLimit: 1800, // 45 minutes
							submissionText: 'Response sent for instructor review'
						}
					]
				}
			]
		}
	]
}
