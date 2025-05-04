// api/client.ts
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestHeaders,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Тип для данных ошибки API
interface ApiErrorData {
  error?: string;
  message?: string;
  statusCode?: number;
}

let authToken: string | null = null;

const createApiClient = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    } as AxiosRequestHeaders,
  });

  // Интерцептор запросов
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config };
    if (authToken && newConfig.headers) {
      newConfig.headers.Authorization = `Bearer ${authToken}`;
    }
    return newConfig;
  });

  // Интерцептор ответов
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ApiErrorData>) => {
      if (error.response?.status === 401) {
        console.error('Auth error:', error.response.data);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiClient = createApiClient(API_BASE_URL);

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const clearAuthToken = () => {
  authToken = null;
};
