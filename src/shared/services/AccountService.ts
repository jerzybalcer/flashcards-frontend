import { AxiosError } from "axios";
import { apiClient } from "./AxiosInstance";
import { camelizeKeys } from "humps";
import { User } from "../model/User";

export const loginUser = async (email: string, password: string) =>
    apiClient
        .post(`/accounts/token`, 
            { email: email, password: password }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => camelizeKeys(res.data) as User)
        .catch((err: AxiosError) => Promise.reject(err));

export const loginUserWithGoogle = async (googleToken: string) =>
    apiClient
        .post(`/accounts/token/google`, 
            { id_token: googleToken }, 
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