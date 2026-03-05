import { AxiosError } from "axios";
import { apiClient } from "./AxiosInstance";
import { camelizeKeys } from "humps";
import { TokenResponse } from "@/model/TokenResponse";

export const authorizeWithEmail = async (email: string, password: string) =>
    apiClient
        .post(`/accounts/token`, 
            { email: email, password: password }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => camelizeKeys(res.data) as TokenResponse)
        .catch((err: AxiosError) => Promise.reject(err));

export const authorizeWithGoogle = async (authCode: string) =>
    apiClient
        .post(`/accounts/token/google`, 
            { auth_code: authCode }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => camelizeKeys(res.data) as TokenResponse)
        .catch((err: AxiosError) => Promise.reject(err));

export const refreshToken = async () =>
    apiClient
    .post(`/accounts/token/refresh`, 
        {}, 
        { headers: {'Content-Type': 'application/json'}, withCredentials: true })
    .then(res => camelizeKeys(res.data) as TokenResponse)
    .catch((err: AxiosError) => Promise.reject(err));

export const createAccountWithEmail = async (email: string, password: string) =>
    apiClient
        .post(`/accounts`, 
            { email: email, password: password }, 
            { headers: {'Content-Type': 'application/json'}}
        )
        .catch((err: AxiosError) => Promise.reject(err));

export const verifyAccount = async (token: string) =>
    apiClient
        .post(`/accounts/verify?token=${token}`, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => camelizeKeys(res.data) as TokenResponse)
        .catch((err: AxiosError) => Promise.reject(err));
