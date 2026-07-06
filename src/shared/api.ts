import axios from 'axios';

export const TOKEN_KEY = 'token';

const api = axios.create({
  baseURL: '/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

// Los errores del backend siempre tienen la forma { "error": "mensaje" }
export function getApiError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;
    if (data && typeof data === 'object') {
      const values = Object.values(data as Record<string, unknown>);
      if (values.length > 0) return values.map(String).join('. ');
    }
    return err.message;
  }
  return 'Error inesperado';
}

export default api;
