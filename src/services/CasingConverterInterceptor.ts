/* eslint-disable @typescript-eslint/no-explicit-any */
import humps from 'humps'
import { apiClient } from './AxiosInstance';

export const useCasingInterceptors = () => {
    apiClient.interceptors.request.use(function (config) {
        // const data: any = config.data;
        // config.data = data.map((obj: any) => humps.decamelizeKeys(obj))
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    apiClient.interceptors.response.use(function (response) {
        const responseData: any = response.data;
        response.data = responseData.map((obj: any) => humps.camelizeKeys(obj));
        return response;
    }, function (error) {
        return Promise.reject(error); 
    });
}





