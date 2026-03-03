import { Navigate } from "react-router-dom";
import { OnboardingPage } from "@/pages/OnboardingPage";
import { LocalStorage } from "@/shared/utils/localStorage";
import { UserOwnProfile } from "@/model/UserOwnProfile";


export const OnboardingRoute = () => {
    const user = LocalStorage.get<UserOwnProfile>('user');

    if(!user) return <Navigate to='/auth' />
    
    if (user.hasCompletedOnboarding) {
        return <Navigate to="/" />
    }
    
    return <OnboardingPage />;
}