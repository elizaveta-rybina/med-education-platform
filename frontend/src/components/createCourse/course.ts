export interface Course {
  id?: string;
  title: string;
  description: string;
  duration: number; // в неделях
  price: number;
  start_date: string;
  end_date: string;
  teacher_id: string;
  subject_id: string;
  max_students: number;
  is_active: boolean;
  image_url?: string;
}

export interface CourseFormData extends Omit<Course, 'id' | 'is_active'> {
  image?: File;
}