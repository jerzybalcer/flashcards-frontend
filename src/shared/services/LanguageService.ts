import { AxiosError } from "axios";
import { apiClient } from "./AxiosInstance";
import { Language } from "@/model/Language";

export const getLanguages = async () =>
    apiClient
        .get(`/languages`)
        .then(res => res.data as Language[])
        .catch((err: AxiosError) => Promise.reject(err));