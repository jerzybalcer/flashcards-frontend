import humps from "humps";
import { apiClient } from "./AxiosInstance";
import { AxiosError } from "axios";
import { Goal } from "@/model/Goal";

export const getGoals = async () =>
    apiClient
        .get(`/user/goals`)
        .then(res => humps.camelizeKeys(res.data) as Goal[])
        .catch((err: AxiosError) => Promise.reject(err));