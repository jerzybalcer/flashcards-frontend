import { TokenResponse } from "@/model/TokenResponse";
import { verifyAccount } from "@/shared/services/AccountService";
import { LocalStorage } from "@/shared/utils/localStorage";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";


export function useVerifyAccount() {
    const navigate = useNavigate();

    const handleSuccess = (tokenResponse: TokenResponse) => {
        LocalStorage.set('user', tokenResponse.user)
        LocalStorage.set('accessToken', tokenResponse.accessToken)
        navigate('/');
    };

    const mutation = useMutation((token: string) => verifyAccount(token), 
    {
        onSuccess: (tokenResponse) => handleSuccess(tokenResponse),
    })

    const handleVerification = async(token: string) => {
        await mutation.mutateAsync(token);
    }

    return { handleVerification, isLoading: mutation.isLoading }
}