import { AxiosResponse } from "axios";
import { apiClient } from './AxiosInstance';
import { FlashCard } from "../model/FlashCard";

export const getCards = async (): Promise<AxiosResponse<FlashCard[]>> =>
    apiClient
        .get(`/cards`)
        // .then(res => res.data)
        .catch((err: AxiosResponse) => Promise.reject(err));