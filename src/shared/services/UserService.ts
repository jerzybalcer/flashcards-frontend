import humps, { camelizeKeys } from "humps";
import { apiClient } from "./AxiosInstance";
import { AxiosError } from "axios";
import { Goal } from "@/model/Goal";
import { UpdateProfileData } from "@/model/UpdateProfileData";
import { User } from "@/model/User";

export const getGoals = async () =>
    apiClient
        .get(`/users/goals`)
        .then(res => humps.camelizeKeys(res.data) as Goal[])
        .catch((err: AxiosError) => Promise.reject(err));

export const updateProfile = async (data: UpdateProfileData) => {
    const formData = new FormData();

    formData.append('username', data.username);
    formData.append('native_language_id', data.nativeLanguageId);
  
    if (data.profilePicture) {
        formData.append('profile_picture', data.profilePicture);
    }
 
    apiClient
        .put(`/users/profile`, 
            formData, 
            { headers: {'Content-Type': 'multipart/form-data'} })
        .catch((err: AxiosError) => Promise.reject(err));
}

export const getUsersByUsername = async (username: string, exactMatch: boolean) =>
    apiClient
        .get(`/users?username=${username}&exact_match=${exactMatch}`)
        .then(res => camelizeKeys(res.data) as User[])
        .catch((err: AxiosError) => Promise.reject(err));
