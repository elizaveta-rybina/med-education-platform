export interface User {
  id: string;
  username: string;
  email: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  role: string;
  university_id: number;
  faculty: string;
  department: string;
  position: string;
  academic_degree: string;
  avatar: string;
}

export type UserFormData = Omit<User, 'id' | 'avatar' | 'university_id' | 'role'>;