import { AxiosError } from "axios";
import { apiClient } from "./AxiosInstance";
import { TokenPair } from "../model/TokenPair";
import { camelizeKeys } from "humps";

export const loginUser = async (email: string, password: string) =>
    apiClient
        .post(`/login`, 
            { email: email, password: password }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => camelizeKeys(res.data) as TokenPair)
        .catch((err: AxiosError) => Promise.reject(err));