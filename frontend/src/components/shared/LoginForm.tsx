import { apiClient, setAuthToken } from '@/app/api/client'
import axios from 'axios'; // Добавлен импорт axios
import { useState } from 'react'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const response = await apiClient.post<{ token: string }>('/login', {
      email: formData.email.trim(),
      password: formData.password
    });

    if (response.data.token) {
      // Сохраняем токен
      setAuthToken(response.data.token);
      
      // Для remember me
      if (formData.remember) {
        localStorage.setItem('authToken', response.data.token);
      }
      
      console.log('Успешная авторизация');
      // Перенаправляем пользователя или обновляем состояние
    }

  } catch (err: unknown) {
    let errorMessage = 'Ошибка при входе';
    
    if (axios.isAxiosError(err)) {
      // Более детальная обработка ошибок API
      errorMessage = err.response?.data?.error 
        || err.response?.data?.message
        || err.message;
        
      // Специальная обработка 401
      if (err.response?.status === 401) {
        errorMessage = 'Неверный email или пароль';
      }
    }
    
    setError(errorMessage);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Ваш email
        </label>
        <input 
          type="email" 
          id="email" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" 
          placeholder="name@company.com"
          value={formData.email}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Ваш пароль
        </label>
        <input 
          type="password" 
          id="password" 
          placeholder="••••••••" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
          value={formData.password}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div className="flex justify-between">
        <div className="flex items-center">
          <input 
            id="remember" 
            type="checkbox" 
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-purple-300"
            checked={formData.remember}
            onChange={handleChange}
          />
          <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">
            Запомнить меня
          </label>
        </div>
        <a href="#" className="text-sm text-purple-700 hover:underline">
          Забыли пароль?
        </a>
      </div>
      
      <button 
        type="submit" 
        className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Вход...' : 'Войти в аккаунт'}
      </button>
      
      <div className="text-sm font-medium text-gray-500">
        Нет аккаунта? <a href="/registration" className="text-purple-700 hover:underline">Создать аккаунт</a>
      </div>
    </form>
  );
};

export default LoginForm;