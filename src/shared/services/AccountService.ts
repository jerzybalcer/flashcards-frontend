import { AxiosError } from "axios";
import { apiClient } from "./AxiosInstance";
import { camelizeKeys } from "humps";
import { User } from "@/model/User";

export const authorizeWithEmail = async (email: string, password: string) =>
    apiClient
        .post(`/accounts/token`, 
            { email: email, password: password }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => camelizeKeys(res.data) as User)
        .catch((err: AxiosError) => Promise.reject(err));

export const authorizeWithGoogle = async (authCode: string) =>
    apiClient
        .post(`/accounts/token/google`, 
            { auth_code: authCode }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => camelizeKeys(res.data) as User)
        .catch((err: AxiosError) => Promise.reject(err));

export const refreshToken = async () =>
    apiClient
    .post(`/accounts/token/refresh`, 
        {}, 
        { headers: {'Content-Type': 'application/json'}, withCredentials: true })
    .then(res => camelizeKeys(res.data) as User)
    .catch((err: AxiosError) => Promise.reject(err));