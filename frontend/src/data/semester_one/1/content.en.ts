import { Course, DragDropTableBlock } from '../../types'

export const courseData: Course = {
	id: 'course-1',
	title: 'Hypoxia',
	description: 'Comprehensive course on Hypoxia',
	modules: [
		{
			id: 'module-1',
			title: 'Definition and Classification of Hypoxia',
			chapters: [
				{
					id: 'chapter-1-1',
					title: 'Definition and Classification of Hypoxia',
					hash: 'what-is',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: `
              Hypoxia — (hypo — Greek, below, oxy — from Latin oxygenium, oxygen) or oxygen deprivation — is a typical pathological process that occurs due to insufficient oxygen supply to the body's tissues or impaired utilization in biological oxidation processes.
              \n Regardless of the etiology of hypoxic states, the degree of tissue oxygen saturation and its role in metabolic processes play a decisive role in their development and outcome.
              \n Hypoxia is not only considered a pathological phenomenon. In daily activities, humans experience the effects of oxygen deficiency or physiological hypoxia. This type of hypoxia can develop in skeletal muscles during intense physical exertion, in brain tissues during excessive mental strain, or in gastrointestinal organs during inappropriate enhancement of their physiological activity. Unlike pathological hypoxia, physiological hypoxia causes short-term and reversible changes in organs and tissues.
              \n Based on fundamental research in physiology, substantial data on the mechanisms of hypoxic damage have been accumulated, enabling the development of prognostic criteria for hypoxia, establishment of the sequence of disorders, and creation of a classification of hypoxic states.
              \n The classification of hypoxia accounts for differences in its origin, pathogenesis, rate of development, severity, and prevalence. Based on origin, hypoxia is divided into exogenous and endogenous.
              \n By prevalence, hypoxia can be local or generalized.
              \n Based on the severity of disruptions to vital functions, the following types of hypoxia are distinguished:
              \n - Mild;
              \n - Moderate;
              \n - Severe;
              \n - Critical (life-threatening, lethal).
              \n The primary criteria for determining hypoxia severity include: the degree of impairment in neuropsychiatric activity; the severity of cardiovascular and respiratory system dysfunctions.`
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'What is hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Excess oxygen in the body',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Insufficient oxygen supply to tissues',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Increased respiratory activity',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Impaired tissue oxidation processes',
									isCorrect: true
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question: 'What types of hypoxia exist based on origin?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Exogenous and endogenous',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Physiological and pathological',
									isCorrect: false
								},
								{ id: 'opt-3', text: 'C) Mild and severe', isCorrect: false },
								{
									id: 'opt-4',
									text: 'D) Local and generalized',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'How is hypoxia classified by prevalence?',
							options: [
								{ id: 'opt-1', text: 'A) Mild and moderate', isCorrect: false },
								{
									id: 'opt-2',
									text: 'B) Exogenous and endogenous',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Local and generalized',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Severe and critical',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'What criteria are used to assess the severity of hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Degree of neuropsychiatric impairment',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Severity of cardiovascular dysfunction',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Severity of respiratory dysfunction',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) All of the above', isCorrect: true }
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'Which type of hypoxia is characterized by short-term and reversible changes in organs and tissues?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Pathological hypoxia',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Endogenous hypoxia',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Physiological hypoxia',
									isCorrect: true
								},
								{ id: 'opt-4', text: 'D) Critical hypoxia', isCorrect: false }
							]
						}
					]
				},
				{
					id: 'chapter-1-2',
					title: 'Types of Hypoxia by Cause of Occurrence',
					hash: 'types-vosn',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: `
              By etiopathogenesis, hypoxia is classified as follows:
              (Diagram)
              `
						},
						{
							id: 'image-1',
							type: 'image',
							url: '/images/courses/hypoxia-types-of-occurrence.png',
							alt: 'Etiopathogenesis of Hypoxia',
							caption: 'Diagram of Hypoxia Etiopathogenesis'
						},
						{
							id: 'text-2',
							type: 'text',
							content: `
              Exogenous Types of Hypoxia.\n
              Normobaric exogenous hypoxia is associated with a decrease in the percentage of oxygen and an increase in carbon dioxide in the air entering the body at normal barometric pressure. It occurs when individuals are in small and/or poorly ventilated spaces (mines, wells, elevators) or due to improper artificial lung ventilation techniques. Key pathogenesis components include arterial hypoxemia, hypercapnia, and gas acidosis.\n
              Hypobaric exogenous hypoxia develops due to a decrease in the partial pressure of oxygen (pO₂) in the air entering the body at reduced barometric pressure. It is observed in cases of mountain sickness, altitude sickness, or decompression sickness (when ascending above 3000-3500 m, where air pO₂ is reduced to approximately 100 mmHg). Key pathogenesis components include arterial hypoxemia, hypocapnia, and gas alkalosis.
              `
						},
						{
							id: 'question-1',
							type: 'question',
							question:
								'What is associated with the development of normobaric exogenous hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Decreased oxygen percentage in air at normal barometric pressure',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Increased carbon dioxide concentration at low atmospheric pressure',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Ascent to high altitude',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Exposure to low atmospheric pressure',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'What are the key pathogenesis components of normobaric exogenous hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Arterial hypoxemia, hypercapnia, and gas acidosis',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Arterial hypoxemia, hypocapnia, and gas alkalosis',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Hypertension, hyperkalemia, and metabolic acidosis',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Hypoxemia, hyponatremia, and respiratory alkalosis',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'In what situations can normobaric exogenous hypoxia develop?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Ascent above 3000 meters',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Being in mines, wells, or elevators',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Diving to depths greater than 50 meters',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Prolonged stay in mountains',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'What is the key factor in the development of hypobaric exogenous hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Decreased partial pressure of oxygen in the air',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Increased partial pressure of carbon dioxide in blood',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Increased hemoglobin levels in blood',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Decreased environmental temperature',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What are the key pathogenesis components of hypobaric exogenous hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Arterial hypoxemia, hypercapnia, and gas acidosis',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Arterial hypoxemia, hypocapnia, and gas alkalosis',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Hypertension, hyperkalemia, and metabolic acidosis',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Hypoxemia, hyponatremia, and respiratory alkalosis',
									isCorrect: false
								}
							]
						}
					]
				},
				{
					id: 'chapter-1-3',
					title: 'Endogenous Types of Hypoxia',
					hash: 'endogenous-types',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: `
              Endogenous Types of Hypoxia\n
              Respiratory hypoxia arises from insufficient gas exchange in the lungs. The initial pathogenic factor is arterial hypoxemia, combined with hypercapnia and acidosis.\n
              Circulatory hypoxia develops due to inadequate blood supply to tissues and organs. Systemic circulatory hypoxia is associated with hypovolemia, heart failure, or generalized reduction in vascular tone. Local circulatory hypoxia occurs with local blood flow disorders (venous hyperemia, ischemia, stasis) or regional impairments in oxygen diffusion from blood to cells and mitochondria. The initial pathogenic factors include increased arteriovenous oxygen difference and metabolic acidosis.\n
              Hemic hypoxia is characterized by a reduction in the effective oxygen-carrying capacity of blood, i.e., the ability of hemoglobin in erythrocytes to bind oxygen in lung capillaries, transport it, and deliver an optimal amount to tissues. Key pathogenesis components include reduced hemoglobin content per unit of blood volume (anemia) and impaired hemoglobin transport properties (hereditary or acquired hemoglobinopathies).\n
              Tissue hypoxia is related to factors reducing the efficiency of oxygen utilization by tissue cells. Key pathogenesis components include reduced efficiency of oxygen use (suppression of biological oxidation enzyme activity, inhibition of enzyme synthesis, or enzyme deficiency) or decreased coupling of oxidation and phosphorylation in mitochondria (due to substances like higher fatty acids, thyroid hormones, excess calcium ions, or hydrogen protons).\n
              Substrate hypoxia develops due to a deficiency of biological oxidation substrates in cells, such as glucose. The main pathogenesis component is a progressive reduction in the efficiency of biological oxidation.\n
              Overload hypoxia results from cellular hyperfunction. Activation of additional functional reserves typically involves increased ATP consumption, leading to heightened cellular oxygen demand. If the body cannot increase oxygen delivery, hypoxia progression may lead to cell damage.
              `
						},
						{
							id: 'question-1',
							type: 'question',
							question:
								'What is the initial pathogenic factor of respiratory hypoxia?',
							options: [
								{ id: 'opt-1', text: 'A) Arterial hypoxemia', isCorrect: true },
								{ id: 'opt-2', text: 'B) Hypocapnia', isCorrect: false },
								{
									id: 'opt-3',
									text: 'C) Metabolic acidosis',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) Hyperglycemia', isCorrect: false }
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question: 'What factors cause local circulatory hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Venous hyperemia, ischemia, stasis',
									isCorrect: true
								},
								{ id: 'opt-2', text: 'B) Heart failure', isCorrect: false },
								{
									id: 'opt-3',
									text: 'C) Generalized reduction in vascular tone',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Deficiency of biological oxidation substrates',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'What is the key pathogenesis component of hemic hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Reduced hemoglobin content in blood',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Impaired oxygen transport by blood',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Hyperventilation of lungs',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Metabolic alkalosis',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question: 'Why does tissue hypoxia develop?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Due to suppression of biological oxidation enzyme activity',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Due to increased carbon dioxide concentration in blood',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Due to increased arterial pressure',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Due to enhanced blood flow to organs',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question: 'What factor causes overload hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Cellular hyperfunction',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Oxygen deficiency in the atmosphere',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Reduced vascular tone',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Low blood glucose levels',
									isCorrect: false
								}
							]
						}
					]
				},
				{
					id: 'chapter-1-4',
					title: 'Biochemical Mechanisms of Hypoxia',
					hash: 'biochemical-mechanisms',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: `
              Biochemical Mechanisms of Hypoxia\n

              Disruption of the oxygen regime in organs and tissues primarily causes metabolic changes. In the human body, over 90% of consumed oxygen is used in the reduction reaction involving mitochondrial cytochrome oxidase, with only 10% metabolized in tissues via oxygenases.\n
              
              The damaging effects of hypoxia on cells can be conditionally divided into two stages. The first is associated with a rapidly developing energy deficit, as oxygen serves as a substrate for the terminal enzyme of the mitochondrial respiratory chain—cytochrome oxidase—in aerobic energy production reactions. Oxygen deficiency can alter the activity of respiratory chain enzyme complexes and reduce the synthesis of macroergic compounds (ATP and creatine phosphate).\n
              
              Hypoxia impairs energy-dependent reactions, such as membrane potential formation, ion transport, electrogenic cell functions, muscle contraction, and receptor functions. From the perspective of biochemical mechanisms, this phenomenon is known as "bioenergetic hypoxia" (essentially synonymous with tissue hypoxia), which accompanies nearly all forms of hypoxia and is one of its stages.\n
              
              With a deficit of macroergic compounds and impaired energy-dependent processes, the first stage results in increased intracellular glycogen consumption and enhanced anaerobic glycolysis, leading to excessive lactic acid production and acidosis formation.\n
              
              Disruption of ion pump function leads to altered ion homeostasis, with sodium accumulation (Na⁺) in the cell causing hyperhydration and cell swelling, and calcium accumulation (increased free Ca²⁺ in the cytosol) activating biochemical mechanisms related to cellular element destruction. Calcium release from intracellular pools and its accumulation in the cytosol trigger the arachidonic acid cycle, accumulation of inflammatory mediators, vasoactive substances (prostaglandins, leukotrienes, thromboxanes, prostacyclins), and activation of free radical processes. The activity of Ca²⁺-dependent mitochondrial enzymes (pyruvate dehydrogenase, isocitrate dehydrogenase, α-ketoglutarate dehydrogenase) decreases, further inhibiting cellular respiration and energy synthesis.\n
              
              The resulting energy deficit and associated disruptions in carbohydrate, lipid, and protein metabolism become membranotoxic factors, capable of impairing membrane-bound protein functions, protein-lipid interactions, and physicochemical membrane properties. This creates conditions for initiating lipid peroxidation, which has a significant membrane-damaging effect, completing the vicious cycle of hypoxic cell damage.
              `
						},
						{
							id: 'image-1',
							type: 'image',
							url: '/images/courses/biochemical-types-of-hypoxia.png',
							alt: 'Biochemical Mechanisms of Hypoxia',
							caption: 'Diagram of Biochemical Mechanisms of Hypoxia'
						},
						{
							id: 'question-1',
							type: 'question',
							question:
								'What are the consequences of a macroergic compound deficit?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Increased intracellular glycogen consumption',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Enhanced protein synthesis',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Formation of new mitochondria',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Reduced calcium levels in the cytoplasm',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'What effect does calcium release from intracellular pools cause?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Induction of inflammatory response',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Stimulation of anabolic processes',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Increased lactate levels',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Accelerated cell division',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'What is the mechanism for compensating energy deficit?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Lipid peroxidation',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Reduced glucose levels',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Activation of anaerobic glycolysis',
									isCorrect: true
								},
								{
									id: 'opt-4',
									text: 'D) Accumulation of potassium ions in the cytoplasm',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'What do changes in ion pump function during hypoxia lead to?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Hyperhydration and cell swelling',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Increased oxygen consumption',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Reduced enzyme activity',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Slowed anaerobic glycolysis',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What primary disturbance causes hypoxic conditions in cells?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Ion balance disruption',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Reduced enzyme activity',
									isCorrect: false
								},
								{ id: 'opt-3', text: 'C) Energy deficit', isCorrect: true },
								{ id: 'opt-4', text: 'D) DNA damage', isCorrect: false }
							]
						}
					]
				},
				{
					id: 'chapter-1-5',
					title: 'Mechanisms of Adaptation to Hypoxia (Acute)',
					hash: 'acute-adaptation',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: `
              Mechanisms of Adaptation to Hypoxia (Acute)\n
              Acute reactions occur reflexively due to stimulation of vascular system receptors and the brainstem reticular formation by altered blood gas composition. In exogenous hypoxia, compensatory mechanisms aim to improve oxygen delivery to capillaries and hemoglobin oxygenation in the lungs.\n
              
              In the respiratory system, there is an increase in alveolar ventilation and minute volume through deeper breathing, increased respiratory excursions, and mobilization of reserve alveoli (compensatory dyspnea). In exogenous hypobaric hypoxia, due to reduced partial oxygen pressure in inhaled air and hypocapnia, pulmonary vasoconstriction occurs via the Euler-Liljestrand reflex, supporting adequate lung perfusion.\n
              
              In the cardiovascular system, compensatory mechanisms include increased heart rate, circulating blood volume (via blood release from depots), venous return, stroke and minute heart volume, blood flow velocity, blood supply to the brain, heart, and other vital organs, and reduced blood supply to muscles, skin, etc. (centralization of circulation occurs only in severe hypoxia).\n
              
              Hemic mechanisms are activated, increasing circulating blood volume (CBV). Enhanced oxygen-carrying capacity of blood occurs through increased erythrocyte release from bone marrow and improved hemoglobin oxygen-binding properties. Oxyhemoglobin gains the ability to deliver more oxygen to tissues even with moderate reductions in tissue fluid pO₂, facilitated by tissue acidosis; hemoglobin dissociation in tissues increases, and the activity of organs and tissues not directly involved in oxygen transport is limited.\n
              
              Tissue intracellular adaptation mechanisms establish a new functional-metabolic status, enabling adaptation to oxygen deficiency. During hypoxia, mitochondria play critical regulatory roles in intercellular and intracellular signaling. In the initial stage of bioenergetic hypoxia, compensatory energy metabolism mechanisms manifest through activation of the electron transport function of the respiratory chain via enhanced oxidative processes at the substrate level: NADH-oxidase and succinate-oxidase pathways, potentially leading to a slight increase in intracellular ATP content. With increasing severity or duration of hypoxic exposure, activation of substrate-level enzymes shifts to inhibition of the NADH-dependent oxidation pathway, disrupting electron transfer at the NADH-CoQ segment. However, compensatory activation of the succinate-oxidase pathway supplies electrons to the cytochrome segment of the respiratory chain. Additionally, anaerobic ATP synthesis via glycolysis increases; nitric oxide production rises, promoting precapillary vasodilation, reducing platelet adhesion and aggregation, and stress protein synthesis is activated to protect cells from damage.\n
              
              Increased functioning of oxygen and metabolic substrate transport systems to cells involves intensive energy and metabolite expenditure. Thus, these mechanisms have a high "energy and substrate cost," which can limit the level and duration of hyperfunction.
              `
						},
						{
							id: 'question-1',
							type: 'question',
							question:
								'What acute reactions occur due to changes in blood gas composition?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Vascular system reflexes',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Euler-Liljestrand reflex',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Increased alveolar ventilation',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) All of the above', isCorrect: true }
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'What compensatory mechanisms are activated in the cardiovascular system during hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Increased heart rate',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Increased minute heart volume',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Centralization of circulation',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) All of the above', isCorrect: true }
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question:
								'How does the oxygen-carrying capacity of blood change during hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Increases due to enhanced erythrocyte release from bone marrow',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Decreases due to reduced tissue pO₂',
									isCorrect: false
								},
								{ id: 'opt-3', text: 'C) Remains unchanged', isCorrect: false },
								{
									id: 'opt-4',
									text: 'D) Sharply increases due to new hemoglobin synthesis',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'What is the role of mitochondria in adaptation processes during hypoxia?',
							options: [
								{ id: 'opt-1', text: 'A) Energy supply', isCorrect: false },
								{
									id: 'opt-2',
									text: 'B) Signaling function',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Regulation of intercellular and intracellular signaling',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) All of the above', isCorrect: true }
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question:
								'What energy mechanisms are activated in the initial stage of hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Activation of oxidative processes at the NADH-oxidase level',
									isCorrect: true
								},
								{
									id: 'opt-2',
									text: 'B) Alternative activation of the succinate-oxidase pathway',
									isCorrect: false
								},
								{
									id: 'opt-3',
									text: 'C) Enhanced anaerobic ATP synthesis',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) All of the above', isCorrect: false }
							]
						}
					]
				},
				{
					id: 'chapter-1-6',
					title: 'Mechanisms of Adaptation to Hypoxia (Long-term)',
					hash: 'chronic-adaptation',
					isRead: false,
					blocks: [
						{
							id: 'text-1',
							type: 'text',
							content: `
              Mechanisms of Adaptation to Hypoxia (Long-term)\n
              During prolonged adaptation to hypoxia, long-term adaptation mechanisms ("systemic structural trace") are formed, enabling adequate oxygen supply to the body despite its deficiency in the external environment, delivery challenges, or tissue oxygenation issues. These mechanisms are based on the activation of a genomic response in hypoxic cells.\n
              
              Cardiovascular mechanisms include myocardial hypertrophy and hyperfunction, increased myoglobin content in cardiomyocytes, increased capillary density in the myocardium, development of collateral circulation, and enhanced peripheral tissue vascularization during chronic hypoxia.\n
              
              The primary regulator of gene transcription responsible for hypoxia adaptation is the hypoxia-inducible factor (HIF-1). Its alpha subunit (HIF-1α) serves as an oxygen sensor for cells. In normoxic conditions, it undergoes hydroxylation and degradation, but in hypoxic conditions, it binds to the HIF-1β subunit and translocates to the cell nucleus, where it binds to DNA promoter regions and activates transcription of over 60 genes regulating glucose metabolism, vascular tone, angiogenesis, structural protein synthesis, cell proliferation and hypertrophy, carotid body receptor sensitivity, and erythropoiesis. These processes enhance the efficiency of oxygen transport and metabolic processes.\n
              
              Respiratory mechanisms include hypertrophy and hyperplasia of respiratory center neurons and lung hyperfunction.\n
              
              Cardiac mechanisms include myocardial hypertrophy, increased capillary density in the heart muscle, increased mitochondrial count in cardiomyocytes, enhanced actin-myosin interaction speed and area, increased contractile protein synthesis, and changes in cardiomyocyte receptor apparatus.\n
              
              Hemic mechanisms involve erythrocytosis, activation of erythropoiesis with increased erythropoietin and hemoglobin content, and enhanced blood oxygen-carrying capacity.\n
              
              Tissue mechanisms involve energy production economization through:\n
              • Activation of mitochondrial biogenesis, increasing their number per cell unit mass, active surface area, and chemical affinity for oxygen;\n
              • Activation of nucleic acid and mitochondrial protein synthesis;\n
              • Increased activity and substrate affinity of respiratory chain enzymes despite reduced electron transport function;\n
              • Activation of antioxidant and detoxification systems.\n
              
              During prolonged hypoxia adaptation, a population of mitochondria with new properties emerges: reduced respiratory carrier content and oxidative capacity at the terminal respiratory chain segment but operating in a more efficient mode due to increased oxidative phosphorylation efficiency. These properties ensure energy production economization.\n
              
              Thus, in long-term hypoxia adaptation, molecular-level reactions are most significant, including accelerated translation and transcription of genes for erythropoietin, myo- and hemoglobin, mitochondrial respiratory enzyme proteins, and muscle proteins.\n
              
              In cases of prolonged or intensifying hypoxia, adaptive capacity may gradually deplete, leading to adaptation failure (maladaptation) or even decompensation, accompanied by increasing destructive changes in organs and tissues and functional impairments.
              `
						},
						{
							id: 'question-1',
							type: 'question',
							question: 'Hypoxia-inducible factor (HIF-1):',
							options: [
								{
									id: 'opt-1',
									text: 'A) Enhances myoglobin degradation',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Primary regulator of gene transcription during hypoxia',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Reduces antioxidant system activity',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Inhibits erythropoiesis',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-2',
							type: 'question',
							question:
								'What changes occur in the cardiovascular system during hypoxia?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Myocardial atrophy',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Increased capillary density in the myocardium',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Reduced myoglobin content',
									isCorrect: false
								},
								{
									id: 'opt-4',
									text: 'D) Decreased peripheral tissue vascularization',
									isCorrect: false
								}
							]
						},
						{
							id: 'question-3',
							type: 'question',
							question: 'What is collateral circulation?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Increased artery diameter',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Bypass blood supply routes through small vessels',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Increased heart rate',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) Vein narrowing', isCorrect: false }
							]
						},
						{
							id: 'question-4',
							type: 'question',
							question:
								'Which protein enhances erythrocyte production during hypoxia?',
							options: [
								{ id: 'opt-1', text: 'A) Hemoglobin', isCorrect: false },
								{ id: 'opt-2', text: 'B) Myoglobin', isCorrect: false },
								{ id: 'opt-3', text: 'C) Erythropoietin', isCorrect: true },
								{ id: 'opt-4', text: 'D) Insulin', isCorrect: false }
							]
						},
						{
							id: 'question-5',
							type: 'question',
							question: 'Why can prolonged hypoxia lead to maladaptation?',
							options: [
								{
									id: 'opt-1',
									text: 'A) Nutrient deficiency',
									isCorrect: false
								},
								{
									id: 'opt-2',
									text: 'B) Depletion of adaptive resources',
									isCorrect: true
								},
								{
									id: 'opt-3',
									text: 'C) Excessive erythrocyte production',
									isCorrect: false
								},
								{ id: 'opt-4', text: 'D) Slowed hair growth', isCorrect: false }
							]
						}
					]
				},
				{
					id: 'chapter-1-7',
					title: 'Assignment: Mechanisms of Adaptation to Hypoxia',
					hash: 'dnd-blocks',
					isRead: false,
					blocks: [
						{
							id: 'dnd-1',
							type: 'drag-drop-table',
							title: 'Acute Adaptation to Hypoxia',
							tableTitle: `Assignment: Mechanisms of Adaptation to Hypoxia\n
              Hypoxia serves as the initial system-forming factor aimed at creating a dynamic functional system in the body to achieve and maintain optimal biological oxidation levels in cells. This system achieves its effects through the activation of mechanisms for oxygen and metabolic substrate delivery to tissues and their incorporation into biological oxidation reactions. The structure of this functional system includes the following physiological systems:
              \n
              - Respiratory system;\n
              - Cardiovascular system;\n
              - Blood system;\n
              - Biological oxidation system;\n
              - Regulatory system.\n
              \n
              Complete the diagrams for "Acute Adaptation to Hypoxia" and "Long-term Adaptation to Hypoxia" using the blocks provided below.
              `,
							columns: [
								{ id: 'type', title: 'Organs and Systems', width: '20%' },
								{ id: 'characteristics', title: 'Effects', width: '30%' },
								{ id: 'examples', title: 'Mechanisms of Effects', width: '50%' }
							],
							rows: [
								{
									id: 'row1',
									column1: 'Respiratory System',
									column2: 'Increased alveolar ventilation volume'
								},
								{
									id: 'row2',
									column1: 'Cardiovascular System',
									column2: 'Increased cardiac output'
								},
								{
									id: 'row3',
									column1: 'Cardiovascular System',
									column2: 'Redistribution of blood flow — centralization'
								},
								{
									id: 'row4',
									column1: 'Blood System',
									column2: 'Increased blood oxygen-carrying capacity'
								},
								{
									id: 'row5',
									column1: 'Biological Oxidation System',
									column2: 'Enhanced biological oxidation efficiency'
								}
							],
							answers: [
								{ id: 'ans1', content: 'Increased breathing frequency' },
								{ id: 'ans2', content: 'Increased breathing depth' },
								{
									id: 'ans3',
									content: 'Increased number of functioning alveoli'
								},
								{ id: 'ans4', content: 'Increased ventilation volume' },
								{
									id: 'ans5',
									content: 'Increased strength of heart contractions'
								},
								{ id: 'ans6', content: 'Increased contraction frequency' },
								{ id: 'ans7', content: 'Increased systolic and minute volume' },
								{ id: 'ans8', content: 'Regional changes in vessel diameter' },
								{ id: 'ans9', content: 'Increased arterial pressure' },
								{ id: 'ans10', content: 'Accelerated blood flow' },
								{ id: 'ans11', content: 'Blood release from depots' },
								{
									id: 'ans12',
									content: 'Erythrocyte release from bone marrow'
								},
								{
									id: 'ans13',
									content: 'Increased Hb affinity for oxygen in lungs'
								},
								{
									id: 'ans14',
									content: 'Increased oxyhemoglobin dissociation in tissues'
								},
								{ id: 'ans15', content: 'Activation of tissue respiration' },
								{ id: 'ans16', content: 'Activation of glycolysis' },
								{
									id: 'ans17',
									content: 'Enhanced coupling of oxidation and phosphorylation'
								}
							],
							correctAnswers: {
								row1: ['ans1', 'ans2', 'ans3', 'ans4'],
								row2: ['ans5', 'ans6', 'ans7'],
								row3: ['ans8', 'ans9', 'ans10'],
								row4: ['ans11', 'ans12', 'ans13', 'ans14'],
								row5: ['ans15', 'ans16', 'ans17']
							}
						},
						{
							id: 'dnd-2',
							type: 'drag-drop-table',
							title: 'Long-term Adaptation to Hypoxia',
							tableTitle: `Assignment: Mechanisms of Long-term Adaptation to Hypoxia\n
              Long-term adaptation develops under prolonged hypoxic conditions and involves structural changes in various physiological systems of the body. These changes aim to enhance the efficiency of tissue oxygen supply and optimize metabolic processes.\n
              The structure of the adaptation system includes:\n
              - Respiratory system;\n
              - Cardiovascular system;\n
              - Blood system;\n
              - Biological oxidation system;\n
              - Regulatory systems.\n
              \n
              Complete the table by dragging the appropriate mechanisms into the correct cells.
              `,
							columns: [
								{ id: 'type', title: 'Organs and Systems', width: '20%' },
								{ id: 'characteristics', title: 'Effects', width: '30%' },
								{ id: 'examples', title: 'Mechanisms of Effects', width: '50%' }
							],
							rows: [
								{
									id: 'row1',
									column1: 'Respiratory System',
									column2: 'Increased blood oxygenation in lungs'
								},
								{
									id: 'row2',
									column1: 'Cardiovascular System',
									column2: 'Increased cardiac output'
								},
								{
									id: 'row3',
									column1: 'Cardiovascular System',
									column2: 'Increased tissue perfusion by blood'
								},
								{
									id: 'row4',
									column1: 'Blood System',
									column2: 'Increased blood oxygen-carrying capacity'
								},
								{
									id: 'row5',
									column1: 'Biological Oxidation System',
									column2: 'Enhanced biological oxidation efficiency'
								},
								{
									id: 'row6',
									column1: 'Regulatory Systems',
									column2:
										'Increased efficiency and reliability of regulatory mechanisms'
								}
							],
							answers: [
								{ id: 'ans1', content: 'Alveolar hyperplasia and hypertrophy' },
								{ id: 'ans2', content: 'Stimulation of angiogenesis' },
								{ id: 'ans3', content: 'Respiratory muscle hypertrophy' },
								{ id: 'ans4', content: 'Myocardial hypertrophy' },
								{
									id: 'ans5',
									content:
										'Increased capillary and mitochondrial count in cardiomyocytes'
								},
								{
									id: 'ans6',
									content: 'Increased actin-myosin interaction speed'
								},
								{
									id: 'ans7',
									content: 'Enhanced efficiency of heart regulation systems'
								},
								{
									id: 'ans8',
									content: 'Increased number of functioning capillaries'
								},
								{ id: 'ans9', content: 'Development of arterial hyperemia' },
								{ id: 'ans10', content: 'Activation of erythropoiesis' },
								{
									id: 'ans11',
									content: 'Increased erythrocyte release from bone marrow'
								},
								{ id: 'ans12', content: 'Development of erythrocytosis' },
								{
									id: 'ans13',
									content: 'Increased Hb affinity for oxygen in lungs'
								},
								{
									id: 'ans14',
									content: 'Accelerated oxyhemoglobin dissociation in tissues'
								},
								{
									id: 'ans15',
									content: 'Increased mitochondrial count, cristae, and enzymes'
								},
								{
									id: 'ans16',
									content: 'Mitochondrial hyperplasia and hypertrophy'
								},
								{
									id: 'ans17',
									content: 'Enhanced coupling of oxidation and phosphorylation'
								},
								{
									id: 'ans18',
									content: 'Increased neuronal resistance to hypoxia'
								},
								{
									id: 'ans19',
									content: 'Reduced activation of the sympathoadrenal system'
								},
								{
									id: 'ans20',
									content:
										'Reduced activation of the hypothalamic-pituitary-adrenal system'
								}
							],
							correctAnswers: {
								row1: ['ans1', 'ans2', 'ans3'],
								row2: ['ans4', 'ans5', 'ans6', 'ans7'],
								row3: ['ans8', 'ans9'],
								row4: ['ans10', 'ans11', 'ans12', 'ans13', 'ans14'],
								row5: ['ans15', 'ans16', 'ans17'],
								row6: ['ans18', 'ans19', 'ans20']
							}
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
							content: `
              Clinical Case:

              A 46-year-old woman was admitted to the emergency department with an acute altered mental state that developed during a mountain hike. The patient was traveling from a coastal region (~20 m above sea level) with a group of nature enthusiasts. After ascending and arriving at the base camp station (~3500 m above sea level), the patient began complaining of worsening malaise, nausea, chest tightness, and headache. Her symptoms worsened during a short hike to the campsite (~4000 m). Shortly after arrival, she experienced vomiting, dyspnea, acrocyanosis, and facial pallor, prompting the team leader to call emergency services. During descent, her consciousness became more confused, and she required assistance to move. In the emergency department: blood pressure 132/86 mmHg, heart rate 84 beats per minute, respiratory rate 21 breaths per minute, oxygen saturation 93%, carbon dioxide 18 mmol/L (20–32 mmol/L). Physical examination revealed tachypnea, incoherent vocalization, eye-opening only to voice, and withdrawal from pain. She did not respond to questions or follow commands, was periodically aggressive, and attempted to get out of bed. Chest X-ray showed diffuse pulmonary vascular congestion without signs of pneumothorax, cardiomegaly, or consolidation.

              Instructions for Completing the Assignment:

              1. Carefully analyze all provided data.
              2. Answer the questions using medical terminology.
              3. For each question, provide:
                * A clear diagnosis/answer
                * Pathophysiological justification
                * Supporting data from the case
              4. Response length: 200-300 words per question
              5. Time limit: 30 minutes

              Questions will be available after reviewing the theoretical material.
              `
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
									text: 'Which mechanisms of adaptation to hypoxia (acute and/or long-term) were insufficient in the patient? Justify your answer.',
									maxLength: 800
								}
							],
							timeLimit: 1800, // 45 minutes
							submissionText: 'Answer submitted for instructor review'
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
							title: 'Hypoxia Simulation',
							gameUrl:
								'https://gd.games/instant-builds/caf4bee6-10bf-4cfc-bab1-bf442be15eb7',
							width: '100%',
							height: 'auto'
						}
					]
				}
			]
		}
	]
}

export const exampleData: DragDropTableBlock = {
	id: 'hypoxia-drag-drop-1',
	type: 'drag-drop-table',
	title: 'Hypoxic Conditions',
	tableTitle: 'Match examples with types of hypoxia',
	columns: [
		{ id: 'type', title: 'Type of Hypoxia', width: '30%' },
		{ id: 'characteristic', title: 'Characteristic', width: '40%' },
		{ id: 'example', title: 'Example', width: '30%' }
	],
	rows: [
		{
			id: 'row1',
			column1: 'Respiratory Hypoxia',
			column2: 'Impaired gas exchange in the lungs'
		},
		{
			id: 'row2',
			column1: 'Hemic Hypoxia',
			column2: 'Reduced blood oxygen-carrying capacity'
		}
	],
	answers: [
		{ id: 'ans1', content: 'Pneumothorax' },
		{ id: 'ans2', content: 'Carbon monoxide poisoning' }
	],
	correctAnswers: {
		row1: ['ans1'],
		row2: ['ans2']
	}
}
