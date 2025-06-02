import { useState } from "react"
import { useModal } from "../../hooks/useModal"
import { TeacherEditModal } from "./TeacherEditModal"
import { Teacher, TeacherFormData } from "./user"
import { UserDeleteModal } from "./UserDeleteModal"
import { UserTable } from "./UsersTable"

const initialTeachers: Teacher[] = [
  {
    id: "1",
    username: "professor_ivanov",
    email: "i.ivanov@university.edu",
    last_name: "Иванов",
    first_name: "Иван",
    middle_name: "Иванович",
    role: "teacher",
    university_id: 1,
    faculty: "Факультет компьютерных наук",
    department: "Кафедра искусственного интеллекта",
    position: "Доцент",
    academic_degree: "Кандидат технических наук",
    avatar: "/images/user/user-01.jpg",
  },
  {
    id: "2",
    username: "professor_petrova",
    email: "a.petrova@university.edu",
    last_name: "Петрова",
    first_name: "Анна",
    middle_name: "Сергеевна",
    role: "teacher",
    university_id: 1,
    faculty: "Медицинский факультет",
    department: "Кафедра неврологии",
    position: "Профессор",
    academic_degree: "Доктор медицинских наук",
    avatar: "/images/user/user-03.jpg",
  }
];

export const TeacherManagementTable = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState<TeacherFormData>({
    username: "",
    email: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    faculty: "",
    department: "",
    position: "",
    academic_degree: "",
  });

  const handleSave = () => {
    if (!editingTeacher) return;

    const updatedTeachers = teachers.map(teacher => {
      if (teacher.id === editingTeacher.id) {
        return {
          ...teacher,
          ...formData
        };
      }
      return teacher;
    });

    setTeachers(updatedTeachers);
    closeModal();
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      username: teacher.username,
      email: teacher.email,
      last_name: teacher.last_name,
      first_name: teacher.first_name,
      middle_name: teacher.middle_name,
      faculty: teacher.faculty,
      department: teacher.department,
      position: teacher.position,
      academic_degree: teacher.academic_degree,
    });
    openModal();
  };

  const handleDeleteClick = (teacherId: string) => {
    setTeacherToDelete(teacherId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (teacherToDelete) {
      setTeachers(teachers.filter(teacher => teacher.id !== teacherToDelete));
      setIsDeleteModalOpen(false);
      setTeacherToDelete(null);
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
     <UserTable<Teacher>
        users={filteredTeachers}
        onEdit={handleEditTeacher}
        onDelete={handleDeleteClick}
        onSelect={(teacherId) => {
          if (selectedTeachers.includes(teacherId)) {
            setSelectedTeachers(selectedTeachers.filter(id => id !== teacherId));
          } else {
            setSelectedTeachers([...selectedTeachers, teacherId]);
          }
        }}
        onSelectAll={(checked) => {
          if (checked) {
            setSelectedTeachers(teachers.map(teacher => teacher.id));
          } else {
            setSelectedTeachers([]);
          }
        }}
        selectedUsers={selectedTeachers}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        title="преподавателей"
      />

      <TeacherEditModal
        isOpen={isOpen}
        onClose={closeModal}
        user={editingTeacher}
        formData={formData}
        onChange={setFormData}
        onSave={handleSave}
      />

      <UserDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        userType="teacher"
      />
    </>
  );
};