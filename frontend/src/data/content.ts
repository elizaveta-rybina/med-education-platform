// types/content.ts

// Базовые интерфейсы
export interface TextContent {
  text: string;
  subblocks?: {
    type: 'list' | 'quote';
    items?: string[];
    content?: string;
    author?: string;
  }[];
}

export interface MediaContent {
  url: string;
  alt?: string;
  caption?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type ContentBlockData = TextContent | MediaContent | QuizQuestion | null;

export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'quiz' | 'divider';
  data: ContentBlockData;
}

export interface ContentItem {
  id: number;
  title: string;
  description?: string;
  isRead: boolean;
  hash: string;
  blocks: ContentBlock[];
  estimatedReadTime?: number;
  lastUpdated?: string;
  isTest?: boolean;
}

export interface Chapter {
  id: number;
  title: string;
  completed: boolean;
  hash: string;
  isTest?: boolean;
}

// Вспомогательные типы
export type ContentBlockType = ContentBlock['type'];
export type TextSubblockType = NonNullable<TextContent['subblocks']>[0]['type'];

// Данные курса
export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Основы гипоксии: определение и классификация",
    completed: false,
    hash: "hypoxia-basics"
  },
  {
    id: 2,
    title: "Тестирование: Типы гипоксии",
    completed: false,
    hash: "test-hypoxia-types",
    isTest: true
  },
  {
    id: 3,
    title: "Эндогенные типы гипоксии",
    completed: false,
    hash: "endogenous-hypoxia"
  },
  {
    id: 4,
    title: "Тестирование: Стадии гипоксии",
    completed: false,
    hash: "test-hypoxia-stages",
    isTest: true
  },
  {
    id: 5,
    title: "Физиологическая vs патологическая гипоксия",
    completed: false,
    hash: "physio-patho-hypoxia"
  },
  {
    id: 6,
    title: "Механизмы адаптации к гипоксии",
    completed: false,
    hash: "adaptation-mechanisms"
  },
  {
    id: 7,
    title: "Итоговое тестирование по курсу",
    completed: false,
    hash: "final-test",
    isTest: true
  }
];

export const contentItems: ContentItem[] = [
  {
    id: 1,
    title: "Основы гипоксии",
    description: "Определение и базовые понятия",
    isRead: false,
    hash: "hypoxia-basics",
    estimatedReadTime: 10,
    blocks: [
      {
        id: 'text-1',
        type: 'text',
        data: {
          text: "Гипоксия — (hypo — греч., под, ниже, oxy — от лат. oxygenium — кислород) или кислородное голодание — это типовой патологический процесс, возникающий при недостаточном снабжении тканей организма кислородом или нарушении его использования в процессах биологического окисления.",
          subblocks: [
            {
              type: 'quote',
              content: "Независимо от этиологии гипоксических состояний в их развитии и исходе решающая роль принадлежит степени насыщения тканей кислородом",
            }
          ]
        }
      },
      {
        id: 'image-1',
        type: 'image',
        data: {
          url: "/images/hypoxia-types.jpg",
          alt: "Классификация гипоксических состояний",
          caption: "Основные типы гипоксии"
        }
      }
    ]
  },
  {
    id: 2,
    title: "Тестирование: Типы гипоксии",
    isRead: false,
    hash: "test-hypoxia-types",
    isTest: true,
    blocks: [
      {
        id: 'quiz-1',
        type: 'quiz',
        data: {
          question: "Какие органы наиболее чувствительны к гипоксии?",
          options: [
            "Сердце и легкие",
            "Головной мозг и миокард",
            "Печень и почки",
            "Костная ткань"
          ],
          correctIndex: 1,
          explanation: "Наиболее чувствительны к гипоксии головной мозг и миокард из-за высокого потребления кислорода"
        }
      }
    ]
  },
  // Остальные элементы контента...
];

// Пример полного курса
export const physiologyCourse = {
  title: "Физиология гипоксии",
  description: "Полный курс по механизмам кислородного голодания",
  chapters,
  contentItems
};