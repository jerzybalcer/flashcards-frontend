import { getCurrentUser } from "@/shared/utils/getCurrentUser"
import { Navigate } from "react-router-dom";
import { OnboardingPage } from "@/pages/OnboardingPage";


export const OnboardingRoute = () => {
    const user = getCurrentUser();

    if(!user) return <Navigate to='/auth' />
    
    if (user.hasCompletedOnboarding) {
        return <Navigate to="/" />
    }
    
    return <OnboardingPage />;
}