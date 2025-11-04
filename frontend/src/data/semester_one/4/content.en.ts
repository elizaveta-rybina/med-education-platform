import { Course } from '@/data/types'

export const courseData: Course = {
	id: 'course-1',
	title: 'Arterial and Venous Hyperemia',
	description: 'Arterial and Venous Hyperemia',
	modules: [
		{
			id: 'module-4',
			title: 'Arterial and Venous Hyperemia',
			chapters: [
				{
					id: 'chapter-4-1',
					title: 'Concept of the Microcirculation System',
					hash: 'microcirculation',
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
												text: 'Microcirculation',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ' - is the movement of blood and lymph through the smallest vessels with a diameter of 2-200 µm (arterioles, precapillaries, postcapillaries, and venules). The arterial and venous parts of the microcirculation system are connected by arteriovenous anastomoses (shunts), which are activated only in emergency situations.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The microcirculatory unit of an organ (according to L.M. Chernukh) is an arteriole, precapillary sphincter, capillaries, postcapillary venules, and lymphatic microvessels, which are closely associated with cells and extracellular structures surrounding the microvessels. This association is not only structural but also functional, facilitated by neurohumoral mechanisms that support cell nutrition in accordance with functional demands.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Blood flow in microvessels is governed by the laws of rheology. The task of hemorheology is to study blood fluidity, cell deformability, and the interaction between blood and vascular walls. The diameter of microvessels can sometimes be smaller than that of erythrocytes. Blood flow in such vessels is enabled by the ability of blood cells to change their shape. Erythrocytes play a decisive role in this process. Blood fluidity largely depends on its viscosity. In turn, blood viscosity is determined by the protein composition of blood plasma and the concentration of erythrocytes. The ratio of blood cells to plasma is called hematocrit.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'During blood movement near the inner vessel wall, a parietal layer of plasma forms. This layer acts as a lubricating medium for the axial flow of blood. At the same time, erythrocytes move through the vessel faster than plasma.'
											}
										]
									}
								]
							}
						},
						{
							id: 'image-1',
							type: 'image',
							url: '/images/content/module-4-1-1.png',
							alt: 'Structure of the Microcirculatory Bed',
							caption:
								'Structure of the microcirculatory bed. When precapillary sphincters close, blood begins to flow through the arteriovenous anastomosis.'
						},
						{
							id: 'question-1',
							type: 'question',
							question:
								'What constitutes the microcirculatory unit of an organ?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Large arteries and veins',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) The entire cardiovascular system',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Arteriole, precapillary sphincter, capillaries, postcapillary venules, and lymphatic microvessels',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Systemic circulation',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question: 'What regulates blood movement in small vessels?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Tissue temperature',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Atmospheric pressure fluctuations',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Neurohumoral mechanisms',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Muscle contractions',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'What property of blood enables its movement in microvessels smaller than the diameter of erythrocytes?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Non-Newtonian fluid properties',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Blood clotting ability',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Elasticity of erythrocytes',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Blood viscosity',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'What forms the parietal layer near the vessel walls?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Lipoproteins',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Blood plasma',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Blood cells',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Aggregates of blood cells',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question: 'What affects blood viscosity?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Number of leukocytes',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Protein composition of plasma and concentration of erythrocytes',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Number of platelets',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Blood sugar level',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-4-2',
					title: 'General Causes of Microcirculation Disorders',
					hash: 'microcirculation-disorders',
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
												text: 'Numerous causes directly leading to various microcirculation disorders can be grouped into three categories:'
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
																text: 'Disorders of central and peripheral circulation. These include heart failure, pathological forms of arterial hyperemia, venous hyperemia, and ischemia.'
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
																text: 'Changes in blood and lymph viscosity and volume. The viscosity and volume of blood and lymph change due to the following reasons:'
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
																				text: 'Hemo(lympho)concentration. This can occur due to hypohydration, polycythemia, and hyperproteinemia (mainly hyperfibrinogenemia).'
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
																				text: 'Hemo(lympho)dilution, resulting from hyperhydration, pancytopenia, and hypoproteinemia.'
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
																				text: 'Aggregation and agglutination of blood cells, accompanied by an increase in blood viscosity.'
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
																				text: 'Disseminated intravascular coagulation, fibrinolysis, and thrombosis.'
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
																text: 'Damage to the walls of microcirculatory vessels, leading to impaired integrity and/or smoothness. This is observed in local pathological processes such as atherosclerosis, inflammation, cirrhosis, and tumors.'
															}
														]
													}
												]
											}
										]
									}
								]
							}
						}
					]
				},

				{
					id: 'chapter-4-3',
					title: 'Typical Forms of Microcirculation Disorders',
					hash: 'typical-microcirculation-disorders',
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
												text: 'Microcirculation disorders can be conditionally divided into three groups:'
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
																text: 'Intravascular'
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
																text: 'Extravascular'
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
																text: 'Disorders related to changes in the components of the vascular wall'
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
												text: 'Intravascular disorders',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ' can develop due to several reasons:'
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
																text: 'Microcirculation disorders can arise due to changes in the rheological properties of blood, resulting from the aggregation of blood cells (primarily erythrocytes) and erythrocyte agglutination.'
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
																text: 'The cause of intravascular microcirculation disorders can be increased blood coagulability. The reaction of platelets and blood clotting factors to tissue damage leads to the formation of blood clots (thrombi), which obstruct blood flow.'
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
																text: 'Microcirculation disorders may be associated with slowed blood flow. Blood flow velocity can decrease: a) due to changes in the rheological properties of blood; b) due to obstruction of venous outflow; c) due to reduced arterial inflow; d) due to impaired blood flow through arteriovenous anastomoses. Slowing of blood flow promotes thrombus formation.'
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
																text: 'Disorders of arteriovenous anastomoses lead to the development of local circulatory disturbances. For example, excessive opening of anastomoses causes blood to be shunted from arterioles to venules, resulting in venous hyperemia.'
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
												text: 'Extravascular microcirculation disorders',
												marks: [{ type: 'bold' }]
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
												text: 'These develop due to damage to the stroma and parenchyma of the tissue surrounding the microcirculatory unit. The following factors may affect the state of microcirculation:'
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
																text: 'disorders of perivascular structures;'
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
																text: 'the influence of mast cells containing biologically active substances in their granules;'
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
																text: 'impaired lymph circulation;'
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
																text: 'neurodystrophic tissue processes.'
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
												text: 'Vascular wall disorders',
												marks: [{ type: 'bold' }]
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
												text: 'These may be associated with:'
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
																text: 'pathology of the microvascular endothelium;'
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
																text: 'emigration and diapedesis of blood cells;'
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
																text: 'changes in vascular permeability;'
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
																text: 'microhemorrhages.'
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
												text: 'Microcirculation disorders lead to impaired transcapillary exchange, can cause tissue hypoxia, and acidosis. Tissues may develop atrophy and dystrophy, and micro-foci of necrosis may occur. All these changes lead to impaired functional conditions of organs and tissues.'
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
								'Which microcirculation disorders are classified as intravascular?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Aggregation of blood cells.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Increased blood coagulability.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Slowed blood flow.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) All of the above.',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Which of the following is not a cause of extravascular microcirculation disorders?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Microhemorrhages.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Disorders of perivascular structures.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Influence of mast cells.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Impaired lymph circulation.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'What causes slowed blood flow?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Decreased hematocrit.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Obstruction of venous outflow.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Increased arterial blood inflow.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) All of the above.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'What changes are observed in vascular wall disorders?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Pathology of the microvascular endothelium.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Emigration and diapedesis of blood cells.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Changes in vascular permeability.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) All of the above are correct.',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What consequences can arise from microcirculation disorders?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Impaired transcapillary exchange.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Tissue hypoxia.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Tissue atrophy and dystrophy.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) All of the listed consequences are possible.',
									isCorrect: true
								}
							]
						}
					]
				},

				{
					id: 'chapter-4-4',
					title: 'Arterial Hyperemia',
					hash: 'arterial-hyperemia',
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
												text: 'Arterial hyperemia is an increase in the blood supply to an organ and the volume of blood flowing through its vessels due to the dilation of supplying arteries and arterioles and an increase in the number of functioning capillaries.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'There are physiological and pathological types of arterial hyperemia. Physiological arterial hyperemia is appropriate to the stimulus and has adaptive significance. It can be working, for example, in athletes after physical exertion, or functional, such as after eating.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Pathological arterial hyperemia is not related to changes in organ or tissue function and plays a damaging role. Pathological hyperemia is accompanied by disturbances in blood supply, microcirculation, transcapillary exchange, and sometimes bleeding and hemorrhages.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The following types of pathological arterial hyperemia are distinguished:'
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
																text: 'neuroparalytic, caused by damage to sympathetic nerves;'
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
																text: 'neurotonic, triggered by irritation of parasympathetic fibers, i.e., associated with an axon reflex;'
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
																text: 'myogenic, resulting from the action of biologically active substances, such as histamine, bradykinin, adenosine, and others, on the smooth muscle cells of arterioles.'
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
												text: 'These mechanisms lead to the dilation of arteries and arterioles and an increase in blood inflow.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: "The causes of neuroparalytic arterial hyperemia include the following. In clinical practice, these are trauma to the sympathetic trunk, the effect of electric current, and cold paralysis of skin vessels at temperatures below 15°C. In experiments, neuroparalytic arterial hyperemia can be modeled by ligating sympathetic vasomotor fibers (as done in Claude Bernard's experiment)."
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The causes of myogenic arterial hyperemia are related to the action of metabolites such as CO2, lactate, adenosine, hydrogen ions, and potassium ions; vasoactive substances including histamine, prostacyclin, vasoactive intestinal peptide, and nitric oxide, as well as exogenous and endogenous toxic substances.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The main component of pathogenesis is the dilation of supplying arterioles, which leads to increased intracapillary pressure, increased linear and volumetric blood flow velocity, and a reduction in the arteriovenous oxygen difference. This occurs because not all oxygen can diffuse into the tissues due to the increased blood flow velocity. The dilation of arterioles and functioning capillaries leads to redness, increased transudation and lymph formation result in an increase in organ volume, and enhanced tissue metabolism is accompanied by a local temperature rise.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The consequences of arterial hyperemia can be positive and negative. Positive consequences of arterial hyperemia include the following:'
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
																text: 'activation of specific tissue or organ functions;'
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
																text: 'potentiation of nonspecific tissue or organ functions;'
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
																text: 'providing substrates and oxygen for hypertrophy and hyperplasia;'
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
																text: 'enhancement of local immunity.'
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
												text: 'These can be utilized in physiotherapeutic practice.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Negative consequences of arterial hyperemia include the following:'
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
																text: 'compression of cells and nerve endings due to edema, leading to pain;'
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
																text: 'increased pressure in small vessels, accompanied by rupture, bleeding, and hemorrhages in organs;'
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
																text: "redistribution of blood flow, leading to the phenomenon of 'steal' and others."
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
												text: "Clinical examples of arterial hyperemia include erythema, vessel rupture, organ hemorrhages, and the 'steal' phenomenon."
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What is arterial hyperemia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Increased blood supply to an organ due to increased arterial blood inflow.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Increased arterial pressure in vessels.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Insufficient blood supply to an organ.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Increased blood supply due to impaired venous outflow.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question: 'What types of arterial hyperemia are distinguished?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Physiological and pathological.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Cerebral and coronary.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Acute and chronic.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Central and peripheral.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'What is characteristic of pathological arterial hyperemia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) It is appropriate to changes in organ function.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) It plays an adaptive role.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) It results from physical exertion.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) It leads to disturbances in blood supply and bleeding.',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'What mechanisms underlie pathological arterial hyperemia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Neuroparalytic.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Myogenic.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Neurotonic.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) All of the above.',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What happens with increased blood flow velocity in the area of arterial hyperemia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Oxygen diffusion into tissues is impaired.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Blood stasis occurs.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Some oxygen does not have time to penetrate the tissues.',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Blood volume sharply decreases.',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-4-5',
					title: 'Venous Hyperemia',
					hash: 'venous-hyperemia',
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
												text: 'Venous hyperemia is an increase in blood supply to a tissue or organ with a simultaneous reduction in blood delivery due to impaired venous outflow. Depending on its extent, venous hyperemia is classified as local or systemic. Based on its course, it is divided into acute and chronic venous hyperemia.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Local venous',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ' hyperemia may be caused by partial or complete obstruction of venous vessels by a thrombus, leading to impaired blood outflow. This type of venous hyperemia is called obstructive. Compression of veins by a hypertrophied or enlarged organ, scar, or tumor, which narrows the vessel lumen and impedes blood flow, can be another cause of local, so-called compressive hyperemia.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Systemic venous',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ' hyperemia typically develops in heart failure due to reduced myocardial contractility. Left ventricular heart failure is associated with venous congestion in the pulmonary circulation, i.e., in the lungs, while right ventricular heart failure is associated with venous hyperemia in the systemic circulation, primarily in the gastrointestinal tract, especially the liver, and in the lower extremities. Systemic venous hyperemia can also develop due to impaired rheological properties of blood, such as increased blood viscosity, which is associated with slowed blood flow.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The main component of the pathogenesis of venous hyperemia is the obstruction of venous blood outflow. In venous hyperemia, pressure in capillaries and postcapillary venules increases, linear and volumetric blood flow velocity decreases, the arteriovenous oxygen difference and the concentration of reduced hemoglobin increase. Transudation processes intensify, and lymph flow is impaired. As a result, metabolism slows down, and edema develops.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The consequences of venous hyperemia depend on the nature of the pathological factor and the localization of the venous hyperemia. In acute cases, accompanied by a sharp increase in hydrostatic pressure in venules and slowed adsorption processes, cyanosis, edema, and a decrease in the temperature of superficial tissues are observed. Disruption of the microcirculatory bed leads not only to increased permeability of microvessels, plasmatic impregnation, and stasis in capillaries but also to diapedetic hemorrhages, dystrophy, and necrosis of parenchymal tissue elements. In chronic venous hyperemia, the complex of these changes can be complicated by pathological proliferation of stroma, development of fibrosis or sclerosis due to prolonged tissue hypoxia. Additionally, diapedetic hemorrhages followed by hemolysis of erythrocytes can lead to hemosiderosis. Examples include edema, fibrosis, and hemosiderosis of the lungs with an increase in organ volume and subsequent tissue consolidation. In the late stages of right ventricular heart failure, as previously noted, liver cirrhosis and varicose veins of the lower extremities develop. Depending on the duration of venous hyperemia, after eliminating the cause of the pathology, either complete restoration of blood flow and organ function or irreversible changes are possible.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What is venous hyperemia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Increased blood supply to an organ with impaired venous outflow.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Increased blood volume in arteries.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Obstruction of lymphatic vessels.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Increased capillary blood flow velocity.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'What types of venous hyperemia are distinguished by extent?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Local and systemic.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Limited and widespread.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Pulmonary and intestinal.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Lymphatic and hemodynamic.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'What is the cause of local venous hyperemia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Blood stasis in the lungs.',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Complete obstruction of veins by a thrombus.',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Hypertension.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Right ventricular heart failure.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'What is characteristic of chronic venous hyperemia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Increased iron content in tissues.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Reduced pain sensations.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Organ hypertrophy.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Increased skin sensitivity.',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What changes occur in tissues during venous hyperemia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Transudation, edema, slowed metabolism.',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Alkalosis.',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Hyperoxia.',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Tissue redness.',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-4-6',
					title: 'Experiment: Modeling Arterial Hyperemia',
					hash: 'arterial-hyperemia-experiment',
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
												text: 'Objective: To study the mechanisms of formation and local signs of arterial hyperemia using an experimental model.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Equipment: Frog, eye scissors – 1 pc., eye forceps – 1 pc., pins – 10 pcs., insulin syringe, 2 ligature threads, fixing board with two holes, 20% MgSO4 solution, turpentine, microscope.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Procedure'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Prepare the equipment.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Anesthetize the experimental animal. Inject 0.8 ml of 20% MgSO4 solution under the skin of the back using an insulin syringe.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Place the anesthetized frog on the dissection table dorsal side up and secure its limbs with pins, spreading the webbing of the right hind leg, and also secure and stretch the frog’s tongue in front of its head with pins. Observe blood flow in the webbing and tongue under low magnification using a microscope.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Model 1.',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' Using forceps and scissors, make a longitudinal incision in the skin and muscles on the posterior surface of the right thigh. Extract the neurovascular bundle and isolate the sciatic nerve. Apply a double ligature to the nerve and cut it with scissors. Begin observing changes in blood flow in the webbing under low magnification using a microscope. Record all obtained data in the table below.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Model 2.',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' Apply a drop of turpentine to the surface of the tongue. Begin observing changes in blood flow in the frog’s tongue under low magnification using a microscope. Record all obtained data in the table below and determine the mechanism of arterial hyperemia formation.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Explain the mechanism of arterial hyperemia formation in each model.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'What local signs of arterial hyperemia were identified?'
											}
										]
									}
								]
							}
						}
					]
				},

				{
					id: 'chapter-4-7',
					title: 'Interactive Experience',
					hash: 'game-case',
					isRead: false,
					blocks: [
						{
							id: 'game-1',
							type: 'game',
							title: 'Modeling Arterial Hyperemia',
							gameUrl: '/games/lab4_en/index.html',
							gameUrlEn: '/games/lab4/index.html',
							width: '100%',
							height: 'auto'
						}
					]
				},

				{
					id: 'chapter-4-8',
					title:
						'Clinical Case: Obliterating Atherosclerosis of the Lower Extremity Arteries',
					hash: 'obliterating-atherosclerosis-case',
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
												text: 'Patient: Male, 62 years old'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Complaints: ',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: "pain in the calves during walking ('intermittent claudication'), sensation of cold and numbness in the feet, nocturnal cramps, slowly healing wound on the right foot toe."
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Medical History: ',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: 'Smoker (40 years, ~1 pack per day), type 2 diabetes mellitus for 10 years, arterial hypertension. Glycemic control is unsatisfactory.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Physical Examination',
												marks: [{ type: 'bold' }]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Skin of the lower legs and feet is pale with a cyanotic tint, cold. Hair on the lower third of the legs is absent. Capillary refill time > 4 seconds. On the distal phalanx of the second toe of the right foot, there is an ulcer measuring 1.5×1.0 cm with a grayish-white coating on the base and sluggish edges. Pulse: femoral arteries – weakened, popliteal and distal pulses – not palpable. Ankle-brachial index (ABI): 0.45 (normal ≥0.9).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Laboratory Data',
												marks: [{ type: 'bold' }]
											}
										]
									},
									{
										type: 'table',
										content: [
											{
												type: 'tableHeader',
												content: [
													{
														type: 'tableRow',
														content: [
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Parameter'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Result'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Normal Range'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Interpretation'
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
												type: 'tableBody',
												content: [
													{
														type: 'tableRow',
														content: [
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Fasting Blood Glucose'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '10.8 mmol/L'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '3.3–5.5'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Hyperglycemia'
																			}
																		]
																	}
																]
															}
														]
													},
													{
														type: 'tableRow',
														content: [
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'HbA1c'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '8.7%'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '<6.0%'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Chronic hyperglycemia'
																			}
																		]
																	}
																]
															}
														]
													},
													{
														type: 'tableRow',
														content: [
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Total Cholesterol'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '6.8 mmol/L'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '<5.0'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Hypercholesterolemia'
																			}
																		]
																	}
																]
															}
														]
													},
													{
														type: 'tableRow',
														content: [
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'LDL Cholesterol'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '4.2 mmol/L'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '<3.0'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Atherogenic profile'
																			}
																		]
																	}
																]
															}
														]
													},
													{
														type: 'tableRow',
														content: [
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Triglycerides'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '2.5 mmol/L'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '<1.7'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Elevated'
																			}
																		]
																	}
																]
															}
														]
													},
													{
														type: 'tableRow',
														content: [
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Fibrinogen'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '5.0 g/L'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '2–4'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Elevated, increased blood viscosity'
																			}
																		]
																	}
																]
															}
														]
													},
													{
														type: 'tableRow',
														content: [
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'ESR'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '22 mm/h'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '<15'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Moderate inflammation'
																			}
																		]
																	}
																]
															}
														]
													},
													{
														type: 'tableRow',
														content: [
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Microalbuminuria'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '70 mg/L'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: '<30'
																			}
																		]
																	}
																]
															},
															{
																type: 'tableCell',
																content: [
																	{
																		type: 'paragraph',
																		content: [
																			{
																				type: 'text',
																				text: 'Diabetic angiopathy'
																			}
																		]
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
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Instrumental Studies',
												marks: [{ type: 'bold' }]
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
																text: 'Doppler ultrasound of lower extremity arteries: Stenosis of femoral arteries up to 70%, significant reduction in linear blood flow velocity in the popliteal artery. Distal vessels are not visualized. Collateral circulation is poorly developed.'
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
																text: 'Nailfold capillaroscopy: Capillaries are sparse, tortuous, with slowed blood flow. Areas of stasis and single microthrombi are observed. Pericapillary edema.'
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
																text: 'Thermography: Skin temperature of the feet reduced by 4°C compared to the lower leg (sign of ischemia).'
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
																text: 'Laser Doppler flowmetry: Microcirculatory index reduced by 2.3 times compared to normal.'
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
																text: 'Electrocardiogram: Signs of left ventricular hypertrophy (secondary effect of hypertension).'
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
												text: 'Diagnosis',
												marks: [{ type: 'bold' }]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Primary: ',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: 'Obliterating atherosclerosis of the lower extremity arteries, stage III (ischemic stage).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Concomitant: ',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: 'Type 2 diabetes mellitus, moderately severe, diabetic microangiopathy.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Complication: ',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: 'Trophic ulcer of the second toe of the right foot.'
											}
										]
									}
								]
							}
						},
						{
							id: 'clinical-case-4',
							type: 'free-input',
							title: 'Microcirculation Disorders and Thrombosis',
							questions: [
								{
									id: 'q1-patho',
									text: 'What pathological processes underlie the patient’s condition? Explain how the combination of diabetes mellitus, smoking, and hyperlipidemia contributes to their development.',
									maxLength: 1000
								},
								{
									id: 'q2-therapy',
									text: 'What is the sequence of pathogenetic events leading to the development of obliterating atherosclerosis and lower extremity ischemia?',
									maxLength: 1000
								},
								{
									id: 'q3-therapy',
									text: "Why does the patient experience symptoms of 'intermittent claudication' and a sensation of cold in the feet? What mechanisms underlie these manifestations?",
									maxLength: 1000
								},
								{
									id: 'q4-therapy',
									text: 'Why are the patient’s fibrinogen and ESR levels elevated? How does this reflect the acute phase response?',
									maxLength: 1000
								},
								{
									id: 'q5-therapy',
									text: 'What role do antiplatelet agents, lipid-lowering drugs, and glycemic control play?',
									maxLength: 1000
								},
								{
									id: 'q6-therapy',
									text: 'What complications may develop with disease progression without adequate therapy, and what pathophysiological mechanisms underlie them?',
									maxLength: 1000
								}
							],
							timeLimit: 1800,
							submissionText: 'Response submitted for instructor review'
						}
					]
				}
			]
		}
	]
}
