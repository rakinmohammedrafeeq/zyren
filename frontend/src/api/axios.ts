import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

declare module 'axios' {
  export interface AxiosRequestConfig {
    suppressErrorToast?: boolean;
  }
}

const isFormData = (value: unknown): value is FormData =>
  typeof FormData !== 'undefined' && value instanceof FormData;

const isURLSearchParams = (value: unknown): value is URLSearchParams =>
  typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
  transformRequest: [(data, headers) => {
    // Handle FormData (file uploads)
    if (isFormData(data)) {
      if (headers) {
        delete (headers as Record<string, unknown>)['Content-Type'];
        delete (headers as Record<string, unknown>)['content-type'];
      }
      return data;
    }
    
    // Handle URLSearchParams (form data)
    if (isURLSearchParams(data)) {
      if (headers) {
        (headers as Record<string, string>)['Content-Type'] = 'application/x-www-form-urlencoded';
      }
      return data.toString();
    }
    
    // Handle JSON objects
    if (data && typeof data === 'object' && headers) {
      (headers as Record<string, string>)['Content-Type'] = 'application/json';
      return JSON.stringify(data);
    }
    
    return data;
  }],
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

    // Never force JSON content-type on FormData uploads
    if (config.data && isFormData(config.data)) {
      config.headers = config.headers ?? {};
      delete (config.headers as Record<string, unknown>)['Content-Type'];
      delete (config.headers as Record<string, unknown>)['content-type'];

      if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
        const file = (config.data as FormData).get('file') as File | null;
        console.debug('[api] Uploading file', {
          name: file?.name,
          size: file?.size,
          type: file?.type,
          url: config.baseURL + (config.url || ''),
        });
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<unknown>) => {
    const status = error.response?.status;
    const data = error.response?.data as Record<string, unknown> | undefined;
    const serverMessage: string | undefined =
      (data && (data['message'] as string | undefined)) ||
      (data && (data['error'] as string | undefined)) ||
      (data && (data['detail'] as string | undefined));
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
          } catch {
            // ignore
          }
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
        case 413:
          // Payload too large - provide user-friendly message
          toast.error('Your content is too large. Please try with shorter content or smaller files.');
          break;
        case 422:
          toast.error(serverMessage || 'Validation error.');
          break;
        case 429:
          // Rate limiting
          toast.error('Too many requests. Please wait a moment and try again.');
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
  [k: string]: unknown;
}>;

export default api;