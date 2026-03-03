import { UpdateProfileData } from "@/model/UpdateProfileData";
import { UserOwnProfile } from "@/model/UserOwnProfile";
import { updateProfile } from "@/shared/services/UserService";
import { LocalStorage } from "@/shared/utils/localStorage";
import { errorToast } from "@/shared/utils/toasts";
import { useMutation } from "react-query";


export function useUpdateProfile() {
    const handleSuccess = (updatedProfile: UserOwnProfile) => {
        LocalStorage.set('user', updatedProfile);
    };

    const mutation = useMutation((profileData: UpdateProfileData) => updateProfile(profileData), 
    {
        onSuccess: (updatedProfile) => handleSuccess(updatedProfile),
        onError: () => {
            errorToast('Unexpected error');
        }
    })

    const handleSave = async(profileData: UpdateProfileData) => {
        await mutation.mutateAsync(profileData);
    }

    return { handleSave, isLoading: mutation.isLoading }
}