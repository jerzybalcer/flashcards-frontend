import { errorToast } from '../utils/toasts';
import { apiClient } from './AxiosInstance';


export const setupErrorHandlerInterceptor = () => {
    apiClient.interceptors.response.use(
        response => response, // Successful response
        error => {
            if (!error.response) {
                errorToast('Network error. Please check your connection.');
                return Promise.reject(error);
            }

            if(error.response.status !== 401) {
                errorToast(error.response.data.detail);
            }
            
            return Promise.reject(error);
    })
}