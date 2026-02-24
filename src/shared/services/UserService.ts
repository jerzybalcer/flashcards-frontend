import humps from "humps";
import { apiClient } from "./AxiosInstance";
import { AxiosError } from "axios";
import { Goal } from "@/model/Goal";
import { UpdateProfileData } from "@/model/UpdateProfileData";

export const getGoals = async () =>
    apiClient
        .get(`/user/goals`)
        .then(res => humps.camelizeKeys(res.data) as Goal[])
        .catch((err: AxiosError) => Promise.reject(err));

export const updateProfile = async (data: UpdateProfileData) =>
    apiClient
        .put(`/user/profile`, 
            humps.decamelizeKeys(data), 
            { headers: {'Content-Type': 'application/json'} })
        .catch((err: AxiosError) => Promise.reject(err));