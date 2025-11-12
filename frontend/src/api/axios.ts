import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

declare module 'axios' {
  export interface AxiosRequestConfig {
    suppressErrorToast?: boolean;
  }
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers ?? {};
      if (!('Authorization' in config.headers)) {
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const data = error.response?.data as any;
    const serverMessage: string | undefined =
      data?.message || data?.error || data?.detail;
    const suppressToast = error.config?.suppressErrorToast === true;

    if (!suppressToast) {
      switch (status) {
        case 400:
          toast.error(serverMessage || 'Bad request. Please check your input.');
          break;
        case 401:
          toast.error(serverMessage || 'Session expired. Please log in again.');
          try {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('role');
          } catch {}
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          break;
        case 403:
          toast.error(serverMessage || "You don't have permission to do this.");
          break;
        case 404:
          toast.error(serverMessage || 'Not found.');
          break;
        case 409:
          toast.error(serverMessage || 'Conflict.');
          break;
        case 422:
          toast.error(serverMessage || 'Validation error.');
          break;
        case 500:
          toast.error(serverMessage || 'Server error. Please try again later.');
          break;
        default:
          toast.error(serverMessage || error.message || 'Unexpected error occurred.');
      }
    }

    return Promise.reject(error);
  }
);

export async function getJson<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.get<T>(url, config);
  return res.data;
}

export async function postJson<T = unknown, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.post<T>(url, body, config);
  return res.data;
}

export async function putJson<T = unknown, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.put<T>(url, body, config);
  return res.data;
}

export async function deleteJson<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.delete<T>(url, config);
  return res.data;
}

export type ApiError = AxiosError<{
  message?: string;
  error?: string;
  detail?: string;
  [k: string]: any;
}>;

export default api;