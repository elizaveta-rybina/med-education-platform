import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Student, StudentFormData } from "./user";
import { UserTable } from "./UsersTable";
import { StudentEditModal } from "./StudentEditModal";
import { UserDeleteModal } from "./UserDeleteModal";

const initialStudents: Student[] = [
  {
    id: "1",
    username: "student_ivanov",
    email: "i.ivanov@university.edu",
    last_name: "Иванов",
    first_name: "Иван",
    middle_name: "Сергеевич",
    role: "student",
    university_id: 1,
    faculty: "Факультет компьютерных наук",
    birth_date: "2000-05-15",
    course: 3,
    group: "21ИТ",
    avatar: "/images/user/user-03.jpg",
  },
  {
    id: "2",
    username: "student_petrova",
    email: "a.petrova@university.edu",
    last_name: "Петрова",
    first_name: "Анна",
    middle_name: "Владимировна",
    role: "student",
    university_id: 1,
    faculty: "Медицинский факультет",
    birth_date: "2001-02-20",
    course: 2,
    group: "20М",
    avatar: "/images/user/user-04.jpg",
  }
];

export const StudentManagementTable = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    username: "",
    email: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    faculty: "",
    course: 1,
    group: "",
    birth_date: null
  });

  const handleSave = () => {
    if (!editingStudent) return;

    const updatedStudents = students.map(student => {
      if (student.id === editingStudent.id) {
        return {
          ...student,
          ...formData,
          birth_date: formData.birth_date?.toISOString().split('T')[0] || student.birth_date
        };
      }
      return student;
    });

    setStudents(updatedStudents);
    closeModal();
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      username: student.username,
      email: student.email,
      last_name: student.last_name,
      first_name: student.first_name,
      middle_name: student.middle_name,
      faculty: student.faculty,
      course: student.course,
      group: student.group,
      birth_date: new Date(student.birth_date)
    });
    openModal();
  };

  const handleDeleteClick = (studentId: string) => {
    setStudentToDelete(studentId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter(student => student.id !== studentToDelete));
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  const filteredStudents = students.filter(student =>
    `${student.last_name} ${student.first_name} ${student.middle_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <UserTable
        users={filteredStudents}
        onEdit={handleEditStudent}
        onDelete={handleDeleteClick}
        onSelect={(studentId) => {
          if (selectedStudents.includes(studentId)) {
            setSelectedStudents(selectedStudents.filter(id => id !== studentId));
          } else {
            setSelectedStudents([...selectedStudents, studentId]);
          }
        }}
        onSelectAll={(checked) => {
          if (checked) {
            setSelectedStudents(students.map(student => student.id));
          } else {
            setSelectedStudents([]);
          }
        }}
        selectedUsers={selectedStudents}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        title="студентов"
      />

      <StudentEditModal
        isOpen={isOpen}
        onClose={closeModal}
        user={editingStudent}
        formData={formData}
        onChange={setFormData}
        onSave={handleSave}
      />

      <UserDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        userType="student"
      />
    </>
  );
};