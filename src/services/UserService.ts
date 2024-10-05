import { AxiosError } from "axios";
import { apiClient } from "./AxiosInstance";
import { User } from "../model/User";

export const loginUser = async (email: string, password: string) =>
    apiClient
        .post(`/user/login`, 
            { email: email, password: password }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => res.data as User)
        .catch((err: AxiosError) => Promise.reject(err));