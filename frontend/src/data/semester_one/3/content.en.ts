import { Course } from '@/data/types'

export const courseData: Course = {
	id: 'course-1',
	title: 'Cell damage',
	description: 'Cell damage',
	modules: [
		{
			id: 'module-3',
			title: 'Cell damage',
			chapters: [
				{
					id: 'chapter-3-1',
					title: 'Mechanisms of Cell Energy Supply Damage',
					hash: 'mechanisms-of-cell-damage',
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
												text: 'Mechanisms of Cell Damage.',
												marks: [{ type: 'bold' }]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Despite the variety of causes leading to cell damage, the most common mechanisms of damage can be identified:'
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
																text: "Mechanisms of damage to the cell's energy supply;"
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
																text: 'Mechanisms of damage to cell membranes and intracellular structures;'
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
																text: 'Imbalance of ions and fluids;'
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
																text: "Mechanisms of damage to the cell's receptor apparatus and intracellular regulatory mechanisms;"
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
																text: "Mechanisms of damage to processes controlling the cell's plastic supply and nuclear activity."
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
												text: "Mechanisms of Damage to the Cell's Energy Supply",
												marks: [{ type: 'bold' }]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: "The cell's energy supply is provided by ATP, which is primarily produced through oxidative phosphorylation in mitochondria and, to a lesser extent, through glycolysis in the cytosol."
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: "The cell's energy supply can be disrupted at any stage: ATP resynthesis, transport, or utilization. Disruptions in ATP resynthesis may result from a deficiency of oxygen and/or metabolic substrates, reduced activity of tissue respiration and glycolysis enzymes, or damage and destruction of mitochondria, where the Krebs cycle reactions and electron transfer to molecular oxygen, coupled with ADP phosphorylation, occur. Energy supply issues may also stem from impaired energy transport. The energy stored in ATP's high-energy phosphate bonds is normally delivered from synthesis sites—mitochondria and cytosol—to effector structures (myofibrils, membrane ion pumps, etc.) via ADP-ATP translocase (adenine nucleotide translocase) and creatine kinase (CK). Adenine nucleotide translocase facilitates the transport of ATP's high-energy phosphate bond from the mitochondrial matrix through the inner membrane, while CK transfers it further to creatine, forming creatine phosphate, which enters the cytosol. CK in effector cellular structures transfers the phosphate group from creatine phosphate to ADP, forming ATP, which is used in the cell's vital processes. Energy transport systems can be damaged by various pathogenic agents, leading to an ATP deficit in energy-consuming structures even when overall ATP levels in the cell are high. Impaired energy utilization may occur due to damage to energy utilization mechanisms, primarily through reduced activity of ATPases [myosin ATPase, Na+,K+-ATPase of the plasma membrane, proton and potassium ATPase, Ca2+-ATPase (Ca2+ pump), etc.]. Consequently, cell dysfunction can develop even with normal or elevated ATP levels in the cell. Disruption of the energy supply, in turn, can contribute to disorders in the cell's membrane apparatus, enzyme systems, ion and water transport processes, and regulatory mechanisms."
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: "Disruption of the energy supply, in turn, can contribute to disorders in the cell's membrane apparatus, enzyme systems, ion and water transport processes, and regulatory mechanisms."
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'The main reserve of ATP in the cell is located:',
							options: [
								{
									id: 'opt-1',
									text: 'A) Primarily in mitochondria',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Primarily in the cytosol',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Evenly distributed between mitochondria and cytosol',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Produced outside the cell',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'The transport of ATP energy from the site of synthesis to the site of consumption is facilitated by:',
							options: [
								{
									id: 'opt-1',
									text: 'A) Only the intramitochondrial system',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Glycolysis enzymes',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Adenine nucleotide translocase and creatine kinase',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Independently via diffusion',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'Causes of ATP resynthesis disruption may include:',
							options: [
								{
									id: 'opt-1',
									text: 'A) Increased oxygen levels',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Deficiency of oxygen and metabolic substrates',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Increased activity of glycolysis enzymes',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) All of the above are correct',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'The function of adenine nucleotide translocase is to:',
							options: [
								{
									id: 'opt-1',
									text: 'A) Transfer ATP from mitochondria to the cytosol',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Catalyze glucose synthesis',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Participate in the Krebs cycle',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Participate in the transport of ATP energy through the inner mitochondrial membrane',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'Possible consequences of disrupted cell energy supply include:',
							options: [
								{
									id: 'opt-1',
									text: 'A) Disruption of membrane functions and transport processes',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Increased ATP production',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Activation of growth signaling pathways',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Enhanced antioxidant defense',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-3-2',
					title:
						'Mechanisms of Damage to Cell Membranes and Intracellular Structures',
					hash: 'cell-membrane-damage',
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
												text: 'Damage to cell membranes and enzymes plays a significant role in disrupting cellular function and, most importantly, in the transition from reversible to irreversible cellular changes. The primary mechanisms of cell membrane damage directly or indirectly lead to damage, conformational changes, and/or alterations in the kinetic properties of enzymes, many of which are membrane-associated.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Free Radical Reactions. ',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: 'Free radical (FR) reactions are essential for vital processes such as electron transport in the respiratory enzyme chain, synthesis of prostaglandins and leukotrienes, cell proliferation and differentiation, phagocytosis, catecholamine metabolism, and more. FR reactions may involve proteins, nucleic acids, and lipids, particularly phospholipids. Lipid peroxidation is crucial for regulating the lipid composition of biomembranes and enzyme activity. The latter results from both the direct effects of lipid peroxidation products on enzymes and indirect effects through changes in the state of the membranes with which many enzyme molecules are associated.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Intensity of FR Reactions',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' is regulated by the balance between factors that activate (pro-oxidants) and suppress (antioxidants) this process. Among the most active pro-oxidants are easily oxidized compounds that induce the formation of free radicals, such as naphthoquinones, vitamins A and D, reducing agents like NADPH2, NADH2, lipoic acid, and products of prostaglandin and catecholamine metabolism.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The lipid peroxidation process can be conditionally divided into three stages:'
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
																text: "Oxygen initiation (the 'oxygen' stage — formation of reactive oxygen species)"
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
																text: 'Generation of free radicals of organic and inorganic substances (free radical stage)'
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
																text: 'Production of lipid peroxides and hydroperoxides (peroxide stage)'
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
												text: 'Reactive Oxygen Species. ',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: 'The initial step in lipid peroxidation during cell damage is typically the formation of so-called reactive oxygen species: singlet oxygen (O2), superoxide radical (O2–), hydrogen peroxide (H2O2), and hydroxyl radical (OH–).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Superoxide Radical O2–',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' is generated by leukocytes (especially intensely during phagocytosis), mitochondria during oxidative reactions, and various tissues during the metabolic transformation of catecholamines, prostaglandin synthesis, and other compounds.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Hydrogen Peroxide H2O2',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' is formed during the interaction (dismutation) of O2– radicals in the cytosol of cells and the mitochondrial matrix. The O2– radical and H2O2 exert direct damaging effects. Additionally, under the influence of iron ions present in both the cytosol and biological fluids, O2– and H2O2 can transform (with the participation of catalase) into the highly aggressive and pathogenic hydroxyl radical OH–.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Hydroxyl Radicals OH–',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' actively react with organic compounds, primarily lipids, as well as nucleic acids and proteins. This results in the formation of other active radicals and peroxides. The reaction can acquire a chain-like, avalanche character. However, this does not always occur, as excessive activation of free radical and peroxide reactions is prevented by cellular antioxidant defense mechanisms.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Cellular Antioxidant Defense (CAD).',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: " Cells have processes and factors that limit or even terminate free radical and peroxide reactions, providing an antioxidant effect. One such process is the interaction of radicals and lipid hydroperoxides with each other, leading to the formation of 'non-radical' compounds. The primary role in the CAD system is played by enzymatic and non-enzymatic mechanisms."
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Activation of Hydrolases.',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' The composition and state of membranes can be modified not only by free radical and lipid peroxidation processes but also by membrane-bound, free, and lysosomal lipases, phospholipases, and proteases.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Under the influence of pathogenic factors, the activity and/or content of these enzymes in the cell can significantly increase (e.g., during acidosis, which promotes the release of enzymes from lysosomes and their subsequent activation).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'As a result, phospholipids and proteins in membranes, as well as enzymes, undergo hydrolysis. This is accompanied by a significant increase in membrane permeability and a reduction in the kinetic properties of enzymes.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Detergent Effects of Amphiphiles.',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' As a result of the activation of lipid peroxidation reactions and hydrolases (mainly lipases and phospholipases), lipid hydroperoxides, free fatty acids, and phospholipids (e.g., glycerophospholipids, phosphatidylcholines, phosphatidylethanolamines, phosphatidylserines) accumulate in the cell. These compounds are termed amphiphilic due to their ability to penetrate and anchor in both hydrophobic and hydrophilic membrane zones. The accumulation of large amounts of amphiphiles in the cell leads to their massive incorporation into membranes, causing the formation of extensive clusters and micro-tears.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Disruption of Membrane Repair Processes',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' is associated with the suppression of reparative resynthesis of altered or lost lipid, protein, lipoprotein, glycoprotein, and other membrane molecules, as well as their de novo synthesis, under the influence of damaging factors. The efficiency of membrane restoration becomes insufficient, which exacerbates the extent and scale of damage to the cellular membrane apparatus.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Disruption of Molecular Conformation',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' (spatial structure, shape) of macromolecules such as proteins, lipoproteins, glycoproteins, and other compounds leads to significant changes in the physicochemical state of cell membranes and their receptors. Causes include disruptions in cellular energy supply and deviations in the physicochemical parameters of the cell from the norm (e.g., acidosis, hyper- or hypo-osmolarity). This alters the tertiary and quaternary structures of macromolecules, impairing their conformation and function, including reducing the activity of biologically active substances (enzymes, hormones, cytokines, etc.).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Overstretching and Rupture of Membranes',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' in swollen cells due to hyperhydration is a critical mechanism of damage and death of both organelles and the cell as a whole. Hyperhydration results from a significant increase in osmotic and oncotic pressure within cells. This is caused by an excess of hydrophilic organic molecules (e.g., lactic and pyruvic acids, albumins, glucose) and ions accumulated due to metabolic disruptions.'
											}
										]
									}
								]
							}
						},
						{
							id: 'image-1',
							type: 'image',
							url: '/images/content/module-2-3-2.png',
							alt: 'Membrane Damage'
						},
						{
							id: 'question-1',
							type: 'question',
							question:
								'What is the initial step in free radical reactions during cell damage?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Formation of lipid peroxides',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Formation of reactive oxygen species',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Generation of free radicals of organic substances',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Production of lipid hydroperoxides',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Which of the following statements is true regarding cellular antioxidant defense?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Cellular antioxidant defense plays no role in regulating free radical reactions',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Cellular antioxidant defense promotes excessive activation of free radical reactions',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Cellular antioxidant defense limits or terminates free radical and peroxide reactions',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Cellular antioxidant defense does not affect the state of cell membranes',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'Why does increased membrane permeability lead to cell swelling, overstretching, and membrane rupture?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Due to an increase in osmotic and oncotic pressure in cells',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Due to a decrease in osmotic and oncotic pressure in cells',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Due to a reduction in the number of hydrophilic molecules in cells',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Due to an increase in ion concentration in cells without changes in osmotic pressure',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'What happens when amphiphiles accumulate in the cell?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Membrane permeability decreases',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Enzyme activity increases',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Extensive clusters and micro-tears form in membranes',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) The level of free fatty acids decreases',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question: 'Which compounds are considered active pro-oxidants?',
							options: [
								{ id: 'opt-1', text: 'A) Vitamins A and D', isCorrect: true },
								{ id: 'opt-2', text: 'B) Vitamins C and E', isCorrect: false },
								{ id: 'opt-3', text: 'C) Vitamins B and K', isCorrect: false },
								{ id: 'opt-4', text: 'D) Vitamins F and G', isCorrect: false }
							]
						}
					]
				},

				{
					id: 'chapter-3-3',
					title: 'Ion and Fluid Imbalance',
					hash: 'ion-fluid-imbalance',
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
												text: 'Ion and Fluid Imbalance',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: 'Ion and water imbalance in cells typically develops following or concurrently with disruptions in energy supply and damage to membranes and enzymes. As a result, transmembrane transport of many ions is significantly altered. This primarily affects K+, Na+, Ca2+, Mg2+, and Cl–, ions that participate in critical processes such as excitation, action potential conduction, electromechanical coupling, and others. Ion imbalance is characterized by changes in the ratios of specific ions in the cytosol and disruptions in the transmembrane distribution of ions across both the plasma membrane and intracellular membranes. The manifestations of ion imbalance are diverse. The most significant changes for cell function and survival are alterations in ion composition, driven by various membrane ATPases and membrane defects. Due to impaired function of the Na+,K+-ATPase in the plasma membrane, excess Na+ accumulates in the cytosol, while K+ levels decrease. Disruption of the Na+-Ca2+ ion exchange mechanism (exchange of two Na+ entering the cell for one Ca2+ exiting) and Ca2+-ATPase leads to a significant increase in cytosolic Ca2+. Alterations in transmembrane cation distribution are accompanied by changes in cellular anion content, including Cl–, OH–, HCO3–, and others.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Cellular Hyperhydration',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: '. The primary cause of hyperhydration is an increase in Na+ and Ca2+ levels, as well as organic substances, in damaged cells. This leads to elevated osmotic pressure and water accumulation in the cells. As a result, cells swell, their volume increases, which is often accompanied by stretching and sometimes micro-tears in the plasma membrane and organelle membranes.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Cellular Hypohydration',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: '. Cellular hypohydration is observed, for example, during fever, hyperthermia, polyuria, and infectious diseases (cholera, typhoid fever, dysentery). These conditions lead to water loss from the body, accompanied by the loss of fluid from cells, along with dissolved proteins (including enzymes) and other organic and inorganic water-soluble compounds.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Electrogenesis Disorders',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' in the form of changes in membrane potential (MP) and action potential (AP) characteristics are significant, as they are often key indicators of the presence and nature of cellular damage. Examples include changes in ECG due to damage to myocardial cells, electroencephalogram changes due to disruptions in the structure and function of brain neurons, and electromyogram changes due to alterations in muscle cells.'
											}
										]
									}
								]
							}
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What is the primary cause of cellular hyperhydration?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Increased levels of Na+ and Ca2+',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Decreased levels of Na+ and Ca2+',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Increased levels of K+',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Decreased levels of K+',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Which ions are most affected by changes in transmembrane transport?',
							options: [
								{
									id: 'opt-1',
									text: 'A) K+, Na+, Ca2+, Mg2+, Cl–',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Fe2+, Cu2+, Zn2+, Mn2+',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) H+, OH–, HCO3–',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Li+, Rb+, Cs+',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'What happens in the cytosol of a cell when the Na+-K+-ATPase in the plasma membrane is impaired?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Accumulation of excess Na+ and reduction of K+',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Accumulation of excess K+ and reduction of Na+',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Increased levels of Ca2+',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Increased levels of Mg2+',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'Which electrogenesis disorders may be observed in cellular damage?',
							options: [
								{
									id: 'opt-1',
									text: 'A) ECG changes due to myocardial cell damage',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Electroencephalogram changes due to disruptions in brain neuron structure and function',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Electromyogram changes due to alterations in muscle cells',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) All of the above',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'The consequence of excess Ca2+ accumulation in the cytosol is:',
							options: [
								{
									id: 'opt-1',
									text: 'A) Normalization of membrane function',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Increased ATP production',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Disruption of the Na+-Ca2+ ion exchange mechanism',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Activation of nucleic acid synthesis',
									isCorrect: true
								}
							]
						}
					]
				},

				{
					id: 'chapter-3-4',
					title:
						'Mechanisms of Damage to the Cellular Receptor Apparatus and Intracellular Regulatory Mechanisms',
					hash: 'cell-receptor-damage',
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
												text: 'Disruptions in cellular function may result from impairments at one or more levels of regulatory mechanisms. Intercellular signals, mediated by biologically active substances (BAS) of an informational nature (hormones, neurotransmitters, cytokines, chemokines, etc.), exert regulatory effects after the BAS interact with cellular receptors.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The causes of distortion in regulatory signals are diverse.',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' The most significant changes include: 1) receptor sensitivity; 2) receptor quantity; 3) conformation of receptor macromolecules; 4) lipid environment of membrane receptors.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'These deviations can significantly alter the nature of the cellular response to a regulatory stimulus. For instance, the accumulation of toxic free radical oxidation products during myocardial ischemia alters the physicochemical properties of membranes. This leads to impaired cardiac responses to norepinephrine and acetylcholine, which are perceived by corresponding receptors on the plasma membrane of cardiomyocytes.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Disruptions at the level of secondary messengers inside cells',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' (messengers) — cyclic nucleotides such as adenosine monophosphate (cAMP) and guanosine monophosphate (cGMP), and others formed in response to primary messengers like hormones and neurotransmitters — can lead to numerous disorders. An example is the impaired formation of membrane potential in cardiomyocytes due to an excess of cAMP, which is one possible cause of cardiac arrhythmias.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Disruption of the response to a signal.',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: ' At the level of metabolic processes regulated by secondary messengers or other intracellular factors, numerous disorders are also possible. For example, impaired activation of cellular enzymes due to a deficiency in cAMP or cGMP can significantly alter the intensity of metabolic reactions, consequently leading to disruptions in cellular function.'
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
								'Which biologically active substances (BAS) of an informational nature exert regulatory effects after interacting with cellular receptors?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Hormones, neurotransmitters, cytokines, chemokines',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Vitamins, minerals, amino acids',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Enzymes, hormones, cytokines',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Hormones, neurotransmitters, vitamins',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Which changes can significantly modify the nature of the cellular response to a regulatory stimulus?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Changes in receptor sensitivity',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Changes in receptor quantity',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Changes in the conformation of receptor macromolecules',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) All of the above',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'What can occur due to the accumulation of toxic free radical oxidation products during myocardial ischemia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Impaired myocardial responses to norepinephrine and acetylcholine',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Increased concentration of active protein kinase C',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Reduced gene expression',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Changes in the conformation of receptor macromolecules',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'Which secondary messengers inside cells may be involved in transduction disorders?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Adenosine monophosphate (cAMP) and guanosine monophosphate (cGMP)',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Glucose and glycogen',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Vitamins and minerals',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Enzymes and hormones',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What can occur due to impaired activation of cellular enzymes caused by a deficiency in cAMP or cGMP?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Altered intensity of metabolic reactions',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Increased receptor sensitivity',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Reduced receptor quantity',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Improved conformation of receptor macromolecules',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-3-5',
					title:
						'Mechanisms of Damage to Processes Controlling Cellular Plasticity and Nuclear Activity',
					hash: 'genome-damage-mechanisms',
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
												text: 'Damage to the genome and/or mechanisms of gene expression, DNA replication, and repair, as well as the cell cycle, are significant mechanisms of cellular alteration with fatal consequences. These damages play a crucial role in cell malignization and oncogenesis processes. The causes of cell genome damage and cell death can include direct or indirect effects of pathogenic agents of various natures on the genetic apparatus. Disruptions in DNA structure and/or its degradation often serve as the trigger for cell death. The most significant causes of DNA damage include:'
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
																text: 'fragmentation of DNA due to exposure to highly potent pathogenic agents, most often of a chemical or physical nature (e.g., high doses of ionizing radiation, alkylating agents, free radicals, lipid hydroperoxides);'
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
																text: 'cleavage of DNA due to significant activation of nucleases (pre-existing or synthesized '
															},
															{
																type: 'text',
																text: 'de novo',
																marks: [{ type: 'italic' }]
															},
															{
																type: 'text',
																text: ');'
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
																text: 'DNA degradation by activated transferases, accompanied by breaks in internucleotide bonds.'
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
												text: 'These and other factors trigger various mechanisms of genetic information disruption, its implementation, or activation of the cell death program.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The most significant ',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: 'mechanisms of disruption of cellular genetic information',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' include:'
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
																text: 'mutations;'
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
																text: 'uncontrolled derepression of genes (e.g., oncogenes or apoptosis genes);'
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
																text: 'suppression of vital gene activity (e.g., genes programming enzyme synthesis);'
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
																text: 'transfection (introduction of foreign DNA into the genome, e.g., herpes virus or tumor DNA);'
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
																text: 'disruptions in DNA repair.'
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
												text: 'The most significant in human pathology are ',
												marks: [{ type: 'italic' }]
											},
											{
												type: 'text',
												text: 'specific consequences of genome damage',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ':'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Enzymopathies',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' (disruptions in enzyme structure and function and enzymatic catalysis. This has a fatal impact on all aspects of cellular activity (e.g., many of the thousands of monogenic diseases result from defects in genes encoding enzyme structures).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Cell cycle disruptions',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' (defects in even one of the hundreds of factors regulating the cell cycle inevitably lead to impaired cell proliferation, including uncontrolled proliferation of damaged cells and the formation of malignant clones; a process associated with the suppression of cell cycle genes is cellular senescence, where senescent cells remain regulatorily active, altering the microenvironment for other cells and changing their functions).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Oncogene activation',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' — a key component of carcinogenesis.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Uncontrolled apoptosis activation',
												marks: [{ type: 'italic' }, { type: 'bold' }]
											},
											{
												type: 'text',
												text: ' (leading, for example, to immunodeficient states or tissue and organ hypotrophy).'
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
								'What is a consequence of suppressing the activity of vital genes?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Enhancement of cellular regenerative abilities',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Cellular senescence and formation of malignant clones',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Activation of body detoxification',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Stimulation of the immune system',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question: 'What causes can lead to cell genome damage?',
							options: [
								{
									id: 'opt-1',
									text: 'A) High doses of ionizing radiation',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Alkylating agents',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Free radicals and lipid hydroperoxides',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) All of the above',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'Which mechanisms of disruption of cellular genetic information are the most significant?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Mutations',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Uncontrolled derepression of apoptosis genes',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Suppression of oncogene suppressor activity',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) All of the above',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'Which consequences of genome damage are most significant in human pathology?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Enzymopathies',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Cell cycle disruptions',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Oncogene activation',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) All of the above',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What can occur due to uncontrolled apoptosis activation?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Immunodeficient states',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Tissue and organ hypertrophy',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Increased cell proliferation',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Improved metabolism',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-3-6',
					title: 'Effects of Teratogens on DNA Synthesis and Repair',
					hash: 'teratogen-effects',
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
												text: 'Teratogenic action refers to the disruption of embryonic development due to teratogenic factors, leading to morphological abnormalities and developmental defects. The most significant teratogenic factors for humans include maternal endocrine disorders (e.g., diabetes mellitus), physical factors (e.g., temperature, ionizing radiation), chemical substances, including certain medications (e.g., retinoids, thalidomide) and alcohol, and biological factors (e.g., toxoplasmosis, rubella).'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: "Specific periods during pregnancy are identified when the fetus is particularly sensitive to damaging factors. These periods are called 'critical periods of embryogenesis.' The likelihood of developmental abnormalities is highest during these critical periods."
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The following critical periods of embryogenesis are distinguished:'
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
																text: 'Development of germ cells: oogenesis, spermatogenesis;'
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
																text: 'Fertilization;'
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
																text: 'Implantation (7th-8th day of embryogenesis);'
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
																text: 'Development of axial organ primordia and placenta formation (3rd-8th weeks of development);'
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
																text: 'Stage of rapid brain growth (15th-20th week);'
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
																text: 'Formation of major functional systems and differentiation of the reproductive system (20th-24th weeks);'
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
																text: 'Birth.'
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
												text: 'In human development, the most vulnerable periods are the first and second critical periods of ontogenesis—the end of the first week and the beginning of the second week after fertilization, as well as weeks 3 to 6 of pregnancy. Exposure to harmful factors during the second period results in the highest number of developmental defects.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'In addition to critical periods, termination periods of teratogen action must be considered—the latest stage of pregnancy during which an adverse factor can induce developmental anomalies. This period depends on the completion of organ formation and varies for different organs and tissues.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: "Congenital and hereditary diseases of the embryonic period are distinguished. It is important to differentiate these concepts. Congenital diseases are those identified at birth and may be hereditary or embryotoxic. Embryotoxic congenital diseases develop due to the influence of teratogens on the pregnant woman's body. Hereditary diseases are caused by mutations in genetic material and may manifest at birth (e.g., Down syndrome) or later in life (e.g., storage diseases)."
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Hereditary diseases should be distinguished from phenocopies. Phenocopies are diseases that phenotypically resemble hereditary diseases but are not associated with genotype changes. Phenocopies develop under the influence of harmful environmental factors during pregnancy. For example, alcohol consumption during pregnancy can lead to a complex of disorders that may partially mimic Down syndrome symptoms.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The development of embryotoxic congenital diseases is driven by teratogens such as medications, chemical substances, ionizing radiation, infections, metabolic disorders, and harmful habits in pregnant women.'
											}
										]
									}
								]
							}
						},
						{
							id: 'image-2',
							type: 'image',
							url: '/images/content/module-3-3-6_1.png',
							alt: 'Fetal Alcohol Syndrome',
							caption: 'Fetal Alcohol Syndrome'
						},
						{
							id: 'image-3',
							type: 'image',
							url: '/images/content/module-3-3-6_2.png',
							alt: 'Fetal Alcohol Syndrome',
							caption: 'Fetal Alcohol Syndrome'
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What is teratogenic action?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Beneficial effect on the fetus',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Deviations in adult tooth formation',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Formation of benign tumors',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Disruption of embryonic development due to external factors',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'Which factors are considered the most significant teratogens for humans?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Ultraviolet radiation',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Ionizing radiation, medications',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Diet high in vitamins',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Physical exercise by pregnant women',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'Which pregnancy periods are critical for embryogenesis?',
							options: [
								{
									id: 'opt-1',
									text: 'A) The entire pregnancy',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) First trimester of pregnancy',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Last month of pregnancy',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) After birth',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'How do congenital and hereditary diseases differ?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Congenital are detected at birth, hereditary manifest later',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Congenital are related to childbirth, hereditary to embryogenesis',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Congenital are caused by external factors, hereditary by genetic disorders',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) No difference, both terms mean the same',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question: 'What are phenocopies?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Genetic copies of parents',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Inherited physical traits',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Diseases resembling hereditary ones but caused by environmental factors',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Diseases transmitted from animals to humans',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-3-7',
					title:
						'The Role of Folic Acid in Preventing Congenital Neural Tube Defects',
					hash: 'folic-acid-role',
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
												text: 'Folic acid (vitamin B9) is involved in metabolism, DNA production, plays a key role in the production of immune blood cells, and normalizes digestive tract function. Once in the body, vitamin B9 is converted into tetrahydrofolate, which is a component of many enzymes and participates in various biochemical reactions, such as protein metabolism. Vitamin B9 is actively involved in DNA replication. Additionally, it plays a significant role in RNA synthesis, amino acid production, and improves iron absorption. Therefore, a deficiency of folic acid is particularly dangerous for rapidly dividing cells.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Maintaining adequate levels of folic acid daily for several months before pregnancy helps reduce the risk of congenital fetal malformations. The daily requirement for pregnant women is 0.4 mg per day. During breastfeeding, the need increases to 0.6 mg per day. It is especially important to maintain the necessary level of folic acid in the first trimester, when the fetal nervous system is developing.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The most critical role of vitamin B9 is the development of the fetal neural tube. During the formation and differentiation of the neural primordium (days 18–21 of human embryo development), the neural plate folds, transforming first into a neural groove (with raised edges—neural folds), which then (on day 22) closes to form the neural tube and separates from the ectoderm.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Derivatives of the neural tube include neurons and glial cells of the central nervous system organs—the brain and spinal cord—as well as several structures of the peripheral nervous system.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The conversion of folic acid into tetrahydrofolic acid is catalyzed by the enzyme dihydrofolate reductase. Tetrahydrofolic acid performs numerous functions in the body. It acts as a coenzyme for many enzymes, a carrier of various groups (including single-carbon fragments), and is involved in the synthesis of amino acids and nucleotides.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The drug methotrexate inhibits the enzyme dihydrofolate reductase, thereby blocking the formation of tetrahydrofolic acid.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'A deficiency of folic acid in the body of a pregnant woman can lead to a range of disorders:'
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
																text: 'Fetal loss;'
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
																text: 'Placental abruption;'
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
																text: 'Spontaneous pregnancy termination;'
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
																text: 'Congenital malformations;'
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
																text: 'Intellectual disability;'
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
																text: 'Neural tube defects;'
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
																text: 'Hydrocephalus;'
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
																text: 'Anencephaly;'
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
																text: 'Meningocele;'
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
																text: 'Spina bifida;'
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
																text: 'Cardiovascular system defects;'
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
																text: 'Cleft lip, cleft palate;'
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
																text: 'Anemia, etc.'
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
					id: 'chapter-3-8',
					title: 'Compensatory and Protective Mechanisms in Cell Damage',
					hash: 'compensatory-protective-mechanisms',
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
												text: 'At any given moment, cells are exposed to a wide range of external and internal environmental factors (microenvironment), including pathogenic ones. To maintain optimal functioning in a constantly changing environment, cells continuously monitor these influences, responding by activating various compensatory and protective processes that promote adaptation. Some of the most common cellular responses include changes in the activity of energy and synthetic processes within the cell, alterations in functional activity, and hypertrophy of the cell or its individual organelles.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'To implement these changes and protect the cell from pathogenic influences and ultrastructural damage, the following protective and compensatory mechanisms exist within the cell:'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Genome Protection Mechanisms',
												marks: [{ type: 'bold' }]
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
																text: 'Tumor suppression (activity of antiproliferative genes and apoptosis genes);'
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
																text: 'RNA interference (a biological process in which short RNA molecules can suppress the expression of viral genes);'
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
																text: 'DNA repair (restoration of the native structure of one strand using the complementary strand as a template).'
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
												text: 'Metabolism Maintenance Mechanisms',
												marks: [{ type: 'bold' }]
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
																text: 'Activation of glycolysis and cellular respiration;'
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
																text: 'Increased activity of membrane ATPases (Ca2+, Na+, K+, Mg2+, etc.).'
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
												text: 'Intracellular Detoxification Systems',
												marks: [{ type: 'bold' }]
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
																text: 'Increased activity of cytochrome P450 system enzymes in the endoplasmic reticulum;'
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
																text: 'Enhanced activity of antioxidant systems.'
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
												text: 'Mechanisms for Compensating Regulatory Disruptions',
												marks: [{ type: 'bold' }]
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
																text: 'Alteration of receptor sensitivity;'
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
																text: 'Changes in the activity of secondary messenger proteins;'
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
																text: 'Production of heat shock proteins (chaperones) – proteins that regulate the formation of the spatial structure of various cellular proteins, including enzymes.'
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
							question: 'What is included in genome protection mechanisms?',
							options: [
								{
									id: 'opt-1',
									text: 'A) DNA repair',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Lipid synthesis',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Mitochondrial activity',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Ion channel function',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question: 'Which mechanisms support cellular metabolism?',
							options: [
								{
									id: 'opt-1',
									text: 'A) RNA interference',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Adaptation to iron deficiency',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Activation of glycolysis and cellular respiration',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Change in nuclear shape',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'What is involved in maintaining cellular ionic metabolism?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Cytochrome P450 system function',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Chaperone function',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Membrane ATPase activity',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Lysosome activity',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'Which systems are responsible for intracellular detoxification?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Cytochrome P450 system in the endoplasmic reticulum',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Amino acid active transport system',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Mitochondria',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Ribosomes',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question: 'What are heat shock proteins?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Proteins that protect cells during fever',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Proteins involved in protecting and restoring the structure of cellular proteins',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Antibodies',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Proteins that promote tumor growth',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-3-9',
					title:
						'Signal Transduction System Mediated by Membrane Receptors: Acetylcholine Muscarinic Receptor Pathway',
					hash: 'acetylcholine-muscarinic-pathway',
					isRead: false,
					blocks: [
						{
							id: 'image-1',
							type: 'image',
							url: '/images/content/module-3-3-9.png',
							alt: 'Acetylcholine Muscarinic Receptor Signal Transduction',
							caption: 'Acetylcholine Muscarinic Receptor Signal Transduction'
						},
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
												text: 'Study the diagram of signal transduction by membrane receptors shown above.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'The signal transduction pathway of acetylcholine interaction with the muscarinic receptor proceeds as follows:'
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
																text: 'Binding of acetylcholine to the muscarinic receptor: Acetylcholine, acting as a signaling molecule (primary messenger), binds to the muscarinic receptor located on the postsynaptic cell membrane.'
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
																text: 'Activation of G-protein: The binding of acetylcholine induces a conformational change in the muscarinic receptor, leading to the activation of the associated G-protein. The G-protein consists of three subunits: α, β, and γ.'
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
																text: 'Dissociation of G-protein: The activated G-protein dissociates into two parts: the α-subunit and the βγ-complex.'
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
																text: 'Activation of effector molecules: The α-subunit of the G-protein activates effector molecules such as adenylate cyclase, phospholipase C, or phosphodiesterase. In this case, activation of adenylate cyclase leads to the formation of the secondary messenger, cyclic adenosine monophosphate (cAMP).'
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
																text: 'Activation of protein kinase A: cAMP binds to protein kinase A, causing its activation.'
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
																text: 'Phosphorylation of target proteins: Activated protein kinase A phosphorylates various target proteins, including those involved in the activation of calcium channels.'
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
																text: 'Increase in calcium concentration: Phosphorylation of proteins leads to the opening of calcium channels, increasing the concentration of calcium ions (Ca2+) in the cell cytoplasm.'
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
																text: 'Activation of calmodulin: Calcium ions bind to calmodulin, activating it.'
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
																text: 'Activation of calmodulin-dependent enzymes: Activated calmodulin binds to calmodulin-dependent enzymes, causing their activation.'
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
																text: 'Activation of myosin light chains: Calmodulin-dependent enzymes phosphorylate myosin light chains, leading to their activation.'
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
																text: 'Muscle cell contraction: Activated myosin light chains interact with actin filaments, leading to sarcomere shortening and muscle cell contraction.'
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
					id: 'chapter-3-10',
					title:
						'Task: Signal Transduction System Mediated by Membrane Receptors',
					hash: 'dnd-blocks',
					isRead: false,
					blocks: [
						{
							id: 'dnd-2',
							type: 'drag-drop-table',
							title:
								'Signal Transduction System Mediated by Membrane Receptors',
							tableTitle:
								"Complete the task described earlier. Fill in one flowchart chain for the 'Acetylcholine Signal Transduction System.' The correct sequence is the main goal of the task. Fill the table from bottom to top, assuming the first row is the start of the chain and the last row is the end. In each row, select one or more answer options from those provided.",
							columns: [
								{
									id: 'type',
									title:
										'Signal Transduction System Mediated by Membrane Receptors',
									width: '100%'
								}
							],
							rows: [
								{ id: 'row1' },
								{ id: 'row2' },
								{ id: 'row3' },
								{ id: 'row4' },
								{ id: 'row5' },
								{ id: 'row6' },
								{ id: 'row7' },
								{ id: 'row8' },
								{ id: 'row9' },
								{ id: 'row10' },
								{ id: 'row11' }
							],
							answers: [
								{ id: 'ans8', content: 'Activation of calcium channels' },
								{
									id: 'ans1',
									content: 'Binding of acetylcholine to the receptor'
								},
								{
									id: 'ans3',
									content:
										'Inactivation of G-protein (dissociation into subunits)'
								},
								{ id: 'ans4', content: 'Activation of effector molecules' },
								{ id: 'ans2', content: 'Activation of G-protein' },
								{ id: 'ans6', content: 'Activation of protein kinase A' },
								{ id: 'ans7', content: 'Phosphorylation of proteins' },
								{ id: 'ans9', content: 'Activation of calmodulin' },
								{
									id: 'ans5',
									content: 'Intracellular effects (cAMP synthesis)'
								},
								{ id: 'ans10', content: 'Activation of myosin light chains' },
								{ id: 'ans11', content: 'Muscle cell contraction' }
							],
							correctAnswers: {
								row1_effects: ['ans1'],
								row2_effects: ['ans2'],
								row3_effects: ['ans3'],
								row4_effects: ['ans4'],
								row5_effects: ['ans5'],
								row6_effects: ['ans6'],
								row7_effects: ['ans7'],
								row8_effects: ['ans8'],
								row9_effects: ['ans9'],
								row10_effects: ['ans10'],
								row11_effects: ['ans11']
							}
						}
					]
				},

				{
					id: 'chapter-3-11',
					title:
						'Experiment: Damaging Effects of Electric Current on the Organism',
					hash: 'electric-current-damage',
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
												text: 'Objective:',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ' To study the damaging effects of electric current on the organism using an experimental model.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Equipment:',
												marks: [{ type: 'bold' }]
											},
											{
												type: 'text',
												text: ' 3 white rats of the same sex and weight, anesthetic mixture for injection (Sol. Ketamini hydrochloridi 5% + Sol. Xylazini 2% + Sol. Droperidoli 0.25% + Sol. Atropini sulfatis 0.1%), 2 ml syringe, 3 dissection tables, scalpel, scissors, 2 tweezers, electrical circuit with a 220-volt AC power source, push-button switch, and needle electrodes, electrocardiograph with needle electrodes.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Experimental Procedure',
												marks: [{ type: 'bold' }]
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'Prepare the equipment. Anesthetize three rats of the same sex and weight with the anesthetic mixture via intramuscular injection. Then, secure them separately on dissection tables using ligatures. Assess their general condition and measure respiratory rate by observing abdominal movements. Attach electrodes as follows:'
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
																text: 'For the 1st rat – to the hind limbs;'
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
																text: 'For the 2nd rat – to the ear pinnae;'
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
																text: 'For the 3rd rat – to the left front and right hind limbs. Additionally, connect needle electrodes for ECG to this rat (recall the standard lead placement scheme).'
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
												text: 'Sequentially pass an electric current of 220 volts through the organism of each experimental animal for 1-2 seconds (strictly controlling the duration using the push-button switch). For the 3rd rat, immediately after the electric current exposure, connect the ECG and record the heart rhythm. Assess the general condition of the animals, changes in respiratory rate (based on abdominal movements), and ECG data. Record all obtained data in the table below.'
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
								'Why are vegetative symptoms minimal when electric current passes through the hind limbs?',
							options: [
								{
									id: 'opt-1',
									text: 'Answer not provided',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								"Why might the following disorders be observed when electric current passes through the brain: temporary cessation of breathing, subsequent tachypnea, generalized tonic then clonic seizures, 'running in place,' followed by lethargy?",
							options: [
								{
									id: 'opt-1',
									text: 'Answer not provided',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'Indicate the cause of animal death when electric current passes through the heart.',
							options: [
								{
									id: 'opt-1',
									text: 'Answer not provided',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'Which path of electric current through the organism is most dangerous and why?',
							options: [
								{
									id: 'opt-1',
									text: 'Answer not provided',
									isCorrect: false
								}
							]
						}
					]
				},

				{
					id: 'chapter-3-12',
					title: 'Interactive Experience',
					hash: 'game-case',
					isRead: false,
					blocks: [
						{
							id: 'game-1',
							type: 'game',
							title:
								'Pathogenic Effects on the Body of Reduced Oxygen in Inhaled Air Under Hypothermia Conditions',
							gameUrl: '/games/lab3/index.html',
							gameUrlEn: '/games/lab3_en/index.html',
							width: '100%',
							height: 'auto'
						}
					]
				},

				{
					id: 'chapter-3-13',
					title: 'Cell Pathology: Cyanide Poisoning',
					hash: 'clinical-death',
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
												text: 'A 36-year-old woman with a history of three suicide attempts and no reported drug use presented to the emergency department of a regional hospital with a primary complaint of vomiting. She had consumed approximately 40 bitter almonds in a suicide attempt one hour prior to admission. Within 20 minutes, she experienced repeated vomiting without blood.'
											}
										]
									},
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'On admission: The patient was confused, with a Glasgow Coma Scale (GCS) score of 9 out of 15. Vital signs included heart rate and respiratory rate. Physical examination revealed pink skin and mucous membranes. The cardiovascular and respiratory systems were normal. Bilateral pupil dilation was noted. Two hours after admission, the patient developed hypotension, as shown in Table 1. Four hours after admission, the patient lost consciousness. Concurrently, blood pressure and pulse rate decreased, as indicated in Table 1. Due to this, intubation was performed. Norepinephrine was administered due to low blood pressure, leading to a subsequent increase in blood pressure and pulse rate within 30 minutes. Venous blood gas analysis revealed severe metabolic acidosis (pH = 6.92, pO2 = 43 mmHg, HCO3 = 8.6 mmol/L, pCO2 = 42.7 mmHg, BE = −25.9 mmol/L). Due to the lack of necessary reagents, cyanide levels in the blood could not be measured. Nevertheless, based on clinical and laboratory findings, as well as the confirmed consumption of bitter almonds, a diagnosis of acute cyanide poisoning due to oral ingestion of amygdalin-containing products was established. An electrocardiogram (ECG) showed sinus tachycardia. Gastric lavage was performed, and a single dose of 60 g of activated charcoal (1 g/kg body weight) was administered. Additionally, to address the metabolic acidosis, an infusion of three vials of sodium bicarbonate (150 mEq) was initiated. Unfortunately, the regional hospital lacked the specific antidote for cyanide poisoning, so the patient was transferred to a poison control center for further treatment.'
											}
										]
									}
								]
							}
						},
						{
							id: 'text-1',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'heading',
										attrs: { level: 2 },
										content: [
											{
												type: 'text',
												text: 'Table 1. Key Patient Condition Indicators Over Time (Part 1)',
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
																				text: 'Time After Bitter Almond Consumption',
																				marks: [{ type: 'bold' }]
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
																				text: 'Level of Consciousness, GCS',
																				marks: [{ type: 'bold' }]
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
																				text: 'Intubation',
																				marks: [{ type: 'bold' }]
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
																				text: 'Respiratory Rate',
																				marks: [{ type: 'bold' }]
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
																				text: 'SpO2',
																				marks: [{ type: 'bold' }]
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
																				text: 'Pulse Rate (beats/min)',
																				marks: [{ type: 'bold' }]
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
																				text: 'Blood Pressure (mmHg)',
																				marks: [{ type: 'bold' }]
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
																				text: '1 hour'
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
																				text: 'Confused, 9/15'
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
																				text: '–'
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
																				text: '16'
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
																				text: '95%'
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
																				text: '117'
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
																				text: '160/85'
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
																				text: '3 hours'
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
																				text: 'Confused, 9/15'
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
																				text: '–'
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
																				text: '22'
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
																				text: '95%'
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
																				text: '110'
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
																				text: '99/60'
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
																				text: '5 hours'
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
																				text: 'Unconscious, 6/15'
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
																				text: 'Intubated'
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
																				text: '–'
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
																				text: '95%'
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
																				text: '104'
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
																				text: '60/30'
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
																				text: '5 hours 30 minutes'
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
																				text: 'Unconscious, 6/15'
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
																				text: 'Intubated'
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
																				text: '–'
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
																				text: '95%'
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
																				text: '105'
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
																				text: '80/60'
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
																				text: '8 hours'
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
																				text: 'Unconscious, 6/15'
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
																				text: 'Intubated'
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
																				text: '–'
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
																				text: '97%'
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
																				text: '80'
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
																				text: '90/60'
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
																				text: '12 hours'
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
																				text: 'Unconscious, 6/15'
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
																				text: 'Intubated'
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
																				text: '–'
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
																				text: '95%'
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
																				text: '73'
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
																				text: '97/59'
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
																				text: '25 hours'
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
																				text: 'Conscious, 12/15'
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
																				text: 'Extubated'
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
																				text: '22'
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
																				text: '100% with mask'
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
																				text: '86'
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
																				text: '102/62'
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
									}
								]
							}
						},
						{
							id: 'text-2',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'heading',
										attrs: { level: 2 },
										content: [
											{
												type: 'text',
												text: 'Table 1. Key Patient Condition Indicators Over Time (Part 2)',
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
																				text: 'Time After Bitter Almond Consumption',
																				marks: [{ type: 'bold' }]
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
																				text: 'pH (7.31–7.41)',
																				marks: [{ type: 'bold' }]
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
																				text: 'pCO2 mmHg (41–51)',
																				marks: [{ type: 'bold' }]
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
																				text: 'pO2 mmHg (30–40)',
																				marks: [{ type: 'bold' }]
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
																				text: 'HCO3 mmol/L (23–29)',
																				marks: [{ type: 'bold' }]
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
																				text: 'BE mmol/L (−3 to +3)',
																				marks: [{ type: 'bold' }]
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
																				text: '1 hour'
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
																				text: '6.92'
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
																				text: '42.7'
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
																				text: '43'
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
																				text: '8.3'
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
																				text: '−25.9'
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
																				text: '3 hours'
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
																				text: '–'
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
																				text: '–'
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
																				text: '–'
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
																				text: '–'
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
																				text: '–'
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
																				text: '5 hours'
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
																				text: '–'
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
																				text: '–'
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
																				text: '–'
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
																				text: '–'
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
																				text: '–'
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
																				text: '5 hours 30 minutes'
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
																				text: '–'
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
																				text: '–'
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
																				text: '–'
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
																				text: '–'
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
																				text: '–'
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
																				text: '8 hours'
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
																				text: '7.20'
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
																				text: '33'
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
																				text: '36'
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
																				text: '45'
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
																				text: '−5.1'
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
																				text: '12 hours'
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
																				text: '7.39'
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
																				text: '43.7'
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
																				text: '75.2'
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
																				text: '26.4'
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
																				text: '1.3'
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
																				text: '25 hours'
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
																				text: '7.46'
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
																				text: '23.9'
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
																				text: '38'
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
																				text: '27.9'
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
																				text: '3.9'
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
									}
								]
							}
						},
						{
							id: 'text-3',
							type: 'text',
							content: {
								type: 'doc',
								content: [
									{
										type: 'heading',
										attrs: { level: 2 },
										content: [
											{
												type: 'text',
												text: 'Table 2. Laboratory Tests',
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
																				text: 'Parameter',
																				marks: [{ type: 'bold' }]
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
																				text: 'Results',
																				marks: [{ type: 'bold' }]
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
																				text: 'Leukocytes'
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
																				text: '7×10⁹/L'
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
																				text: 'Erythrocytes'
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
																				text: '4.3×10⁹/L'
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
																				text: 'Hb'
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
																				text: '142 g/L'
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
																				text: 'pH'
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
																				text: '6.92 (7.31–7.41)'
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
																				text: 'pCO2'
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
																				text: '42.7 mmHg (41–51)'
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
																				text: 'LDH (Lactate Dehydrogenase)'
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
																				text: '574 IU/L (100–480)'
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
																				text: 'Hematocrit'
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
																				text: '49% (35–45)'
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
																				text: 'HCO3⁻'
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
																				text: '8.3 mmol/L (23–29)'
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
																				text: 'BE'
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
																				text: '−25.9 mmol/L (N −3 to +3)'
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
																				text: 'Anion Gap'
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
																				text: '30.7 mmol/L (N 4–12)'
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
									}
								]
							}
						},
						{
							id: 'clinical-case-3',
							type: 'free-input',
							title: 'Cell Pathology: Cyanide Poisoning',
							questions: [
								{
									id: 'q1-patho',
									text: 'What is the primary pathological process that developed in the patient after consuming bitter almonds? Justify your answer with clinical and laboratory data.',
									maxLength: 1000
								},
								{
									id: 'q2-therapy',
									text: "What is the mechanism of cyanide's toxic action at the cellular level, and why does it lead to the development of severe metabolic acidosis?",
									maxLength: 1000
								},
								{
									id: 'q3-therapy',
									text: 'Why can the skin and mucous membranes remain pink in cyanide poisoning despite severe tissue hypoxia?',
									maxLength: 1000
								},
								{
									id: 'q3-therapy',
									text: 'Explain why the patient experienced a gradual restoration of consciousness and vital signs with the normalization of blood pH.',
									maxLength: 1000
								}
							],
							timeLimit: 1800,
							submissionText: 'Response sent for instructor review'
						}
					]
				}
			]
		}
	]
}
