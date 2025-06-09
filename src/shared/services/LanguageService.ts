import { AxiosError } from "axios";
import { Language } from "../model/Language";
import { apiClient } from "./AxiosInstance";

export const getLanguages = async () =>
    apiClient
        .get(`/languages`)
        .then(res => res.data as Language[])
        .catch((err: AxiosError) => Promise.reject(err));