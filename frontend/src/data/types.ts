// data/types.ts
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

export type Block = TextBlock | ImageBlock | QuestionBlock;

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
  userAnswer?: string; // ID выбранного ответа
  isCorrect?: boolean; // Был ли ответ правильным
}

// types.ts

// types.ts
export interface DragDropTableBlock {
  id: string;
  type: 'drag-drop-table';
  title: string;                   // Заголовок страницы
  tableTitle: string;              // Название таблицы
  columns: {
    id: string;
    title: string;
    width?: string;
  }[];
  rows: {
    id: string;
    column1: string | React.ReactNode;  // Фиксированное содержимое 1-го столбца
    column2: string | React.ReactNode;  // Фиксированное содержимое 2-го столбца
  }[];
  answers: {
    id: string;
    content: string | React.ReactNode;
  }[];
  correctAnswers: Record<string, string[]>; // { [rowId]: [answerId1, answerId2] }
}

export interface TableColumn {
  id: string;
  title: string;
  width?: string;                  // CSS-значение ширины (например, "30%")
}

export interface TableRow {
  id: string;
  cells: TableCell[];
}

export interface TableCell {
  columnId: string;                // Соответствует id колонки
  content: string | React.ReactNode;
  accepts?: string[];              // Типы ответов, которые можно сюда бросать
  className?: string;              // Дополнительные классы стилей
}

export interface DraggableAnswer {
  id: string;
  content: string | React.ReactNode;
  type?: string;                   // Тип ответа для фильтрации (соответствует accepts в ячейках)
  className?: string;              // Дополнительные классы стилей
}

export type CorrectAnswers = Record<string, string[]>; // { [rowId]: answerId[] }