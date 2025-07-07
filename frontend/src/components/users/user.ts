// Базовый интерфейс с общими полями
export interface BaseUser {
  id: string;
  username: string;
  email: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  university_id: number;
  faculty: string;
  avatar: string;
}

// Интерфейс для преподавателя
export interface Teacher extends BaseUser {
  role: 'teacher';
  department: string;
  position: string;
  academic_degree: string;
}

// Интерфейс для студента
export interface Student extends BaseUser {
  role: 'student';
  birth_date: string;
  course: number;
  group: string;
}

// Объединенный тип User
export type User = Teacher | Student;

// Типы для форм
export type TeacherFormData = Omit<Teacher, 'id' | 'avatar' | 'university_id' | 'role'>;
export type StudentFormData = Omit<Student, 'id' | 'avatar' | 'university_id' | 'role' | 'birth_date'> & {
  birth_date: Date | null;
};

// Type guards
export function isTeacher(user: User): user is Teacher {
  return user.role === 'teacher';
}

export function isStudent(user: User): user is Student {
  return user.role === 'student';
}