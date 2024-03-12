/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { apiClient } from "./AxiosInstance";

export const getCards = async (): Promise<AxiosResponse> =>
    apiClient
        .get(`/cards`)
        .catch((err: AxiosResponse) => Promise.reject(err));