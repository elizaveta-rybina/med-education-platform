import { createCourse } from '@/app/api/courses'
import { CourseFormData } from '@/components/createCourse/course'
import Input from '@/components/form/input/InputField'
import Button from '@/components/ui/button/Button'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const CourseCreatePage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    watch
  } = useForm<CourseFormData>();
  
  // Заглушки для данных
  // const { teachers = [], loading: teachersLoading = false } = useTeachers() || {
  //   teachers: [
  //     { id: '1', first_name: 'Иван', last_name: 'Иванов', middle_name: 'Иванович' },
  //     { id: '2', first_name: 'Петр', last_name: 'Петров', middle_name: 'Петрович' }
  //   ],
  //   loading: false
  // };
  
  // const { subjects = [], loading: subjectsLoading = false } = useSubjects() || {
  //   subjects: [
  //     { id: '1', name: 'Математика' },
  //     { id: '2', name: 'Физика' }
  //   ],
  //   loading: false
  // };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('duration', data.duration.toString());
      formData.append('price', data.price.toString());
      formData.append('start_date', data.start_date);
      formData.append('end_date', data.end_date);
      formData.append('teacher_id', data.teacher_id);
      formData.append('subject_id', data.subject_id);
      formData.append('max_students', data.max_students.toString());
      if (data.image) {
        formData.append('image', data.image);
      }

      await createCourse(formData);
      navigate('/courses');
    } catch (err) {
      setError('Ошибка при создании курса. Пожалуйста, попробуйте снова.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Создание нового курса</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Название курса*"
            id="title"
            {...register('title', { required: 'Это поле обязательно' })}
            error={errors.title?.message}
          />

          <Input
            label="Продолжительность (недели)*"
            id="duration"
            type="number"
            {...register('duration', { 
              required: 'Это поле обязательно',
              min: { value: 1, message: 'Минимальная продолжительность 1 неделя' }
            })}
            error={errors.duration?.message}
          />

          <Input
            label="Цена (руб)*"
            id="price"
            type="number"
            {...register('price', { 
              required: 'Это поле обязательно',
              min: { value: 0, message: 'Цена не может быть отрицательной' }
            })}
            error={errors.price?.message}
          />

          <Input
            label="Максимум студентов*"
            id="max_students"
            type="number"
            {...register('max_students', { 
              required: 'Это поле обязательно',
              min: { value: 1, message: 'Минимум 1 студент' }
            })}
            error={errors.max_students?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Дата начала*
            </label>
            <DatePicker
              selected={watch('start_date') ? new Date(watch('start_date')) : null}
              onChange={(date) => setValue('start_date', date?.toISOString() || '')}
              minDate={new Date()}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {errors.start_date && (
              <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Дата окончания*
            </label>
            <DatePicker
              selected={watch('end_date') ? new Date(watch('end_date')) : null}
              onChange={(date) => setValue('end_date', date?.toISOString() || '')}
              minDate={watch('start_date') ? new Date(watch('start_date')) : new Date()}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {errors.end_date && (
              <p className="mt-1 text-sm text-red-600">{errors.end_date.message}</p>
            )}
          </div>

          {/* <Select
            label="Преподаватель*"
            id="teacher_id"
            options={teachers.map(t => ({
              value: t.id,
              label: `${t.last_name} ${t.first_name} ${t.middle_name}`
            }))}
            placeholder="Выберите преподавателя"
            error={errors.teacher_id?.message}
            loading={teachersLoading}
            onChange={(value) => setValue('teacher_id', value)}
          />

          <Select
            label="Предмет*"
            id="subject_id"
            options={subjects.map(s => ({
              value: s.id,
              label: s.name
            }))}
            placeholder="Выберите предмет"
            error={errors.subject_id?.message}
            loading={subjectsLoading}
            onChange={(value) => setValue('subject_id', value)}
          /> */}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Описание курса*
          </label>
          <textarea
            id="description"
            {...register('description', { required: 'Это поле обязательно' })}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/courses')}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Создание...' : 'Создать курс'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreatePage;