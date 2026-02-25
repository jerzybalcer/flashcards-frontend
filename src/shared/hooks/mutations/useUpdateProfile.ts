import { UpdateProfileData } from "@/model/UpdateProfileData";
import { updateProfile } from "@/shared/services/UserService";
import { getCurrentUser } from "@/shared/utils/getCurrentUser";
import { useMutation } from "react-query";


export function useUpdateProfile() {
    const handleSuccess = (profileData: UpdateProfileData) => {
        const user = getCurrentUser();
        user!.username = profileData.username;
        user!.nativeLanguageId = profileData.nativeLanguageId;
        user!.hasCompletedOnboarding = true;
        localStorage.setItem('user', JSON.stringify(user));
    };

    const mutation = useMutation((profileData: UpdateProfileData) => updateProfile(profileData), 
    {
        onSuccess: (_, profileData) => handleSuccess(profileData)
    })

    const handleSave = async(profileData: UpdateProfileData) => {
        await mutation.mutateAsync(profileData);
    }

    return { handleSave, isLoading: mutation.isLoading }
}