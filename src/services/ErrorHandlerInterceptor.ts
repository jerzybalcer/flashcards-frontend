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
                if(error.response.status === 422) {
                    errorToast('Unexpected error. Error code: 422');
                }
                else{
                    errorToast(error.response.data.detail);
                }
                return Promise.reject(error);
            }


            
            return Promise.reject(error);
    })
}