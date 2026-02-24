import { UpdateProfileData } from "@/model/UpdateProfileData";
import { updateProfile } from "@/shared/services/UserService";
import { getCurrentUser } from "@/shared/utils/getCurrentUser";
import { useMutation } from "react-query";


export function useUpdateProfile() {
    const handleSuccess = (profileData: UpdateProfileData) => {
        const user = getCurrentUser();
        user!.name = profileData.username;
        user!.hasCompletedOnboarding = true;
        // TODO: set new native language after adding this field to the model
        localStorage.setItem('user', JSON.stringify(user));
    };

    const mutation = useMutation((profileData: UpdateProfileData) => updateProfile(profileData), 
    {
        onSuccess: (_, profileData) => handleSuccess(profileData)
    })

    const handleSave = async(profileData: UpdateProfileData) => {
        await mutation.mutateAsync(profileData);
    }

    return { handleSave }
}