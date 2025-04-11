import { refreshToken } from "./AccountService";
import { apiClient } from "./AxiosInstance";

export const setupTokenRefreshInterceptor = () => {

    apiClient.interceptors.response.use(
        response => response, // Return successful response
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {

                originalRequest._retry = true; // Avoid infinite loop of retrying

                try {
                    // Refresh token
                    const refreshTokenResponse = await refreshToken()

                    localStorage.setItem('accessToken', refreshTokenResponse.accessToken);
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${refreshTokenResponse.accessToken}`;

                    return apiClient(originalRequest); // Handle the original request
                } catch (refreshError) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error); // All other errors
        }
    );
}