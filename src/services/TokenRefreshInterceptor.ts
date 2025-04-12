/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { refreshToken } from "./AccountService";
import { apiClient } from "./AxiosInstance";

interface RequestInQueue {
    retryRequest: () => Promise<AxiosResponse<any, any>>;
    resolvePromise: (value: unknown) => void;
    rejectPromise: (reason: any) => void;
}

class RetryQueue {
    private static queue: RequestInQueue[] = [];
    static isEnabled: boolean = false;

    static processAll() {
        this.queue.forEach(request => {
            request.retryRequest()
                .then(response => {
                    request.resolvePromise(response);
                })
            
        });

        this.queue = [];
    }

    static failAll(error: any) {
        this.queue.forEach(promise => {
            promise.rejectPromise(error);
        });

        this.queue = [];
    }

    static add(request: RequestInQueue) {
        this.queue.push(request)
    }
}

export const setupTokenRefreshInterceptor = () => {

    apiClient.interceptors.response.use(
        response => response, // Return successful response without doing anything else
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                
                // If true, all request will wait in the queue to be retried after the first one refreshes token
                if(RetryQueue.isEnabled) {
                    return new Promise((resolve, reject) => {
                        const retryRequest = () => apiClient(error.config);
                        RetryQueue.add({ retryRequest, resolvePromise: resolve, rejectPromise: reject });
                    });
                }

                originalRequest._retry = true; // Avoid infinite loop for this specific request
                RetryQueue.isEnabled = true; // Store other failed requests in retry queue

                try {
                    // Refresh token
                    const refreshTokenResponse = await refreshToken()

                    localStorage.setItem('accessToken', refreshTokenResponse.accessToken);
                    apiClient.defaults.headers.common.Authorization = `Bearer ${refreshTokenResponse.accessToken}`;

                    // Retry all requests from queue
                    RetryQueue.processAll();

                    return apiClient(originalRequest); // Handle the first request
                } catch (refreshError) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    
                    RetryQueue.failAll(refreshError);
                    return Promise.reject(refreshError);
                } finally {
                    RetryQueue.isEnabled = false;
                }
            }
            return Promise.reject(error); // All other errors
        }
    );
}