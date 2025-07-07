export interface Course {
  id: string;
  title: string;
  description?: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  hash: string;
  isRead: boolean;
  blocks: Block[];
  testPassed?: boolean;
}

export type Block = 
  | TextBlock 
  | ImageBlock 
  | QuestionBlock 
  | DragDropTableBlock
  | FreeInputBlock
  | GameBlock;

export interface TextBlock {
  id: string;
  type: 'text';
  content: string;
}

export interface ImageBlock {
  id: string;
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuestionBlock {
  id: string;
  type: 'question';
  question: string;
  options: QuestionOption[];
  explanation?: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface DragDropTableBlock {
  id: string;
  type: 'drag-drop-table';
  title: string;
  tableTitle: string;
  columns: {
    id: string;
    title: string;
    width?: string;
  }[];
  rows: {
    id: string;
    column1: string | React.ReactNode;
    column2: string | React.ReactNode;
  }[];
  answers: {
    id: string;
    content: string | React.ReactNode;
  }[];
  correctAnswers: Record<string, string[]>;
}

// Новый тип: Блок свободного ввода ответа
export interface FreeInputBlock {
  id: string;
  type: 'free-input';
  title: string;
  caseDescription?: string; // HTML-форматированное описание кейса
  questions: {
    id: string;
    text: string;
    maxLength?: number;
    placeholder?: string;
  }[];
  timeLimit: number; // В секундах
  submissionText: string; // Сообщение после отправки
}

export interface GameBlock {
  id: string;
  type: 'game';
  title?: string;
  gameUrl: string; // Обязательное поле для URL игры
  width?: string;  // Например "800px" или "100%"
  height?: string; // Например "600px"
  // Дополнительные параметры игры при необходимости
  // например, параметры запуска, настройки и т.д.
}

export interface TableColumn {
  id: string;
  title: string;
  width?: string;
}

export interface TableRow {
  id: string;
  cells: TableCell[];
}

export interface TableCell {
  columnId: string;
  content: string | React.ReactNode;
  accepts?: string[];
  className?: string;
}

export interface DraggableAnswer {
  id: string;
  content: string | React.ReactNode;
  type?: string;
  className?: string;
}

export type CorrectAnswers = Record<string, string[]>;