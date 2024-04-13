import axios from "axios";
import { useCasingInterceptors as setupCasingInterceptors } from "./CasingConverterInterceptor";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:5000",
});

setupCasingInterceptors();