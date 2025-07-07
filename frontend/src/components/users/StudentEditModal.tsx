import { Modal } from '../ui/modal';
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { Student, StudentFormData } from "./user";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface StudentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Student | null;
  formData: StudentFormData;
  onChange: (data: StudentFormData) => void;
  onSave: () => void;
}

export const StudentEditModal = ({
  isOpen,
  onClose,
  user,
  formData,
  onChange,
  onSave
}: StudentEditModalProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date: Date | null) => {
    onChange({
      ...formData,
      birth_date: date
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Редактирование студента
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Обновите информацию о студенте
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
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Имя</Label>
                <Input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Отчество</Label>
                <Input
                  type="text"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                <Label>Факультет</Label>
                <Input
                  type="text"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Курс</Label>
                <Input
                  type="number"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  min={1}
                  max={6}
                />
              </div>
              <div>
                <Label>Группа</Label>
                <Input
                  type="text"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Дата рождения</Label>
                <DatePicker
                  selected={formData.birth_date}
                  onChange={handleDateChange}
                  dateFormat="dd.MM.yyyy"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholderText="Выберите дату"
                />
              </div>
              <div>
                <Label>Логин</Label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button size="sm" onClick={onSave}>
              Сохранить изменения
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};