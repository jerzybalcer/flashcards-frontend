import axios from "axios";

export function useApiClient() {
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:5000"

    const setAccessToken = (token: string) => {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    
    const apiClient = axios;

    return { apiClient, setAccessToken };
}
