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

export const updateProfile = async (data: UpdateProfileData) => {
    const formData = new FormData();

    formData.append('username', data.username);
    formData.append('native_language_id', data.nativeLanguageId);
  
    if (data.profilePicture) {
        formData.append('profile_picture', data.profilePicture);
    }

    console.log(formData, data)
 
    apiClient
        .put(`/user/profile`, 
            formData, 
            { headers: {'Content-Type': 'multipart/form-data'} })
        .catch((err: AxiosError) => Promise.reject(err));
}