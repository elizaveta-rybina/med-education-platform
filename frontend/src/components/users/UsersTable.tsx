import { User, isTeacher } from "./user"

interface UserTableProps<T extends User> {
  users: T[];
  onEdit: (user: T) => void;
  onDelete: (userId: string) => void;
  onSelect: (userId: string) => void;
  onSelectAll: (checked: boolean) => void;
  selectedUsers: string[];
  searchTerm: string;
  onSearch: (term: string) => void;
  title: string;
}

export const UserTable = <T extends User>({
  users,
  onEdit,
  onDelete,
  onSelect,
  onSelectAll,
  selectedUsers,
  searchTerm,
  onSearch,
  title
}: UserTableProps<T>) => {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <div>
          <button
            id="dropdownActionButton"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <span className="sr-only">Добавить</span>
            Добавить
            
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
            placeholder={`Поиск ${title}`}
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
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
                  onChange={(e) => onSelectAll(e.target.checked)}
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
              {users.some(isTeacher) ? 'Кафедра' : 'Курс / Группа'}
            </th>
            <th scope="col" className="px-6 py-3">
              {users.some(isTeacher) ? 'Должность' : 'Дата рождения'}
            </th>
            <th scope="col" className="px-6 py-3">
              Действия
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
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
                    onChange={() => onSelect(user.id)}
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
                {isTeacher(user) ? 
                  user.department : 
                  `Курс ${user.course}, Группа ${user.group}`
                }
              </td>
              <td className="px-6 py-4">
                {isTeacher(user) ? 
                  `${user.position} (${user.academic_degree})` : 
                  new Date(user.birth_date).toLocaleDateString()
                }
              </td>
              <td className="px-6 py-4 flex space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                  title="Редактировать"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(user.id)}
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
    </div>
  );
};