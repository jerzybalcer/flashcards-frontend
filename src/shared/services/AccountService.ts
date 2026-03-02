import { AxiosError } from "axios";
import { apiClient } from "./AxiosInstance";
import { camelizeKeys } from "humps";
import { AccountWithToken } from "@/model/AccountWithToken";

export const authorizeWithEmail = async (email: string, password: string) =>
    apiClient
        .post(`/accounts/token`, 
            { email: email, password: password }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => camelizeKeys(res.data) as AccountWithToken)
        .catch((err: AxiosError) => Promise.reject(err));

export const authorizeWithGoogle = async (authCode: string) =>
    apiClient
        .post(`/accounts/token/google`, 
            { auth_code: authCode }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => camelizeKeys(res.data) as AccountWithToken)
        .catch((err: AxiosError) => Promise.reject(err));

export const refreshToken = async () =>
    apiClient
    .post(`/accounts/token/refresh`, 
        {}, 
        { headers: {'Content-Type': 'application/json'}, withCredentials: true })
    .then(res => camelizeKeys(res.data) as AccountWithToken)
    .catch((err: AxiosError) => Promise.reject(err));

export const createAccount = async (email: string, password: string) =>
    apiClient
        .post(`/accounts`, 
            { email: email, password: password }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => camelizeKeys(res.data) as AccountWithToken)
        .catch((err: AxiosError) => Promise.reject(err));
