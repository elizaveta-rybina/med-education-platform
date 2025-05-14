import { useState } from "react"
import { useModal } from "../../hooks/useModal"
import Input from "../form/input/InputField"
import Label from "../form/Label"
import Button from "../ui/button/Button"
import { Modal } from '../ui/modal'

interface User {
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

export const UserManagementTable = () => {
  const [users, setUsers] = useState<User[]>([
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
      avatar: "/images/user/user-02.jpg",
    },
    {
      id: "3",
      username: "professor_sidorov",
      email: "d.sidorov@university.edu",
      last_name: "Сидоров",
      first_name: "Дмитрий",
      middle_name: "Васильевич",
      role: "teacher",
      university_id: 1,
      faculty: "Факультет фундаментальной медицины",
      department: "Кафедра хирургии",
      position: "Старший преподаватель",
      academic_degree: "Кандидат медицинских наук",
      avatar: "/images/user/user-03.jpg",
    },
  ]);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
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
    if (!editingUser) return;

    const updatedUsers = users.map(user => {
      if (user.id === editingUser.id) {
        return {
          ...user,
          ...formData,
          name: `${formData.last_name} ${formData.first_name} ${formData.middle_name}`,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    closeModal();
  };

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      last_name: user.last_name,
      first_name: user.first_name,
      middle_name: user.middle_name,
      faculty: user.faculty,
      department: user.department,
      position: user.position,
      academic_degree: user.academic_degree,
    });
    openModal();
  };

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredUsers = users.filter(user =>
    `${user.last_name} ${user.first_name} ${user.middle_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <div>
          <button
            id="dropdownActionButton"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <span className="sr-only">Действия</span>
            Действия
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Поиск
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
						type="text"
						id="table-search-users"
						className="h-10 block ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Поиск преподавателей"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
        </div>
      </div>
      <table className="w-full border-1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onChange={toggleSelectAll}
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  Выбрать все
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              ФИО
            </th>
            <th scope="col" className="px-6 py-3">
              Факультет / Кафедра
            </th>
            <th scope="col" className="px-6 py-3">
              Должность / Ученая степень
            </th>
            <th scope="col" className="px-6 py-3">
              Действия
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${user.id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelectUser(user.id)}
                  />
                  <label
                    htmlFor={`checkbox-table-search-${user.id}`}
                    className="sr-only"
                  >
                    Выбрать
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.avatar}
                  alt={`${user.last_name} ${user.first_name} ${user.middle_name}`}
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    {user.last_name} {user.first_name} {user.middle_name}
                  </div>
                  <div className="font-normal text-gray-500">{user.email}</div>
                </div>
              </th>
              <td className="px-6 py-4">
                <div className="font-medium">{user.faculty}</div>
                <div className="text-gray-500">{user.department}</div>
              </td>
              <td className="px-6 py-4">
                <div className="font-medium">{user.position}</div>
                <div className="text-gray-500">{user.academic_degree}</div>
              </td>
              <td className="px-6 py-4 flex space-x-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                  title="Редактировать"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteClick(user.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                  title="Удалить"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit user modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Редактирование преподавателя
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Обновите информацию о преподавателе
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Фамилия</Label>
                  <Input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label>Имя</Label>
                  <Input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label>Отчество</Label>
                  <Input
                    type="text"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Факультет</Label>
                  <Input
                    type="text"
                    name="faculty"
                    value={formData.faculty}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Кафедра</Label>
                  <Input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label>Должность</Label>
                  <Input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label>Ученая степень</Label>
                  <Input
                    type="text"
                    name="academic_degree"
                    value={formData.academic_degree}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Label>Логин</Label>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    disabled
                  />
                </div>
                <div>
                  <Label>ID университета</Label>
                  <Input
                    type="number"
                    value={editingUser?.university_id || 1}
                    disabled
                  />
                </div>
                <div>
                  <Label>Роль</Label>
                  <Input
                    type="text"
                    value={editingUser?.role || "teacher"}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Отмена
              </Button>
              <Button size="sm" onClick={handleSave}>
                Сохранить изменения
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} className="max-w-[500px] m-4">
        <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="p-6 text-center">
            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Вы уверены, что хотите удалить этого преподавателя?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Да, удалить
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};