import { Modal } from '../ui/modal'

interface UserDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userType?: 'teacher' | 'student';
}

export const UserDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  userType
}: UserDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="p-6 text-center">
          <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {`Вы уверены, что хотите удалить этого ${userType === 'teacher' ? 'преподавателя' : userType === 'student' ? 'студента' : 'пользователя'}?`}
          </h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onConfirm}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Да, удалить
            </button>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};