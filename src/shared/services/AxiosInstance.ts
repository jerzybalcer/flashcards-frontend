import axios from "axios";
import { setupCasingInterceptor } from "./CasingConverterInterceptor";
import { setupTokenRefreshInterceptor } from "./TokenRefreshInterceptor";
import { setupErrorHandlerInterceptor } from "./ErrorHandlerInterceptor";
import { LocalStorage } from "../utils/localStorage";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000",
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  const token = LocalStorage.get<string>('accessToken');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

setupCasingInterceptor();
setupTokenRefreshInterceptor();
setupErrorHandlerInterceptor();