import { AxiosResponse } from "axios";
import { apiClient } from './AxiosInstance';
import { FlashCard } from "../model/FlashCard";

export const getCards = async () =>
    apiClient
        .get(`/cards`)
        .then(res => res.data as FlashCard[])
        .catch((err: AxiosResponse) => Promise.reject(err));