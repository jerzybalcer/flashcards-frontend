import { getCurrentUser } from "@/shared/utils/getCurrentUser"
import { Navigate, Outlet } from "react-router-dom";

export const OnboardingGuard = () => {
    const user = getCurrentUser();

    if(!user) return <Navigate to='/auth' />;

    if (!user.hasCompletedOnboarding) {
        return <Navigate to="/onboarding" />;
    }

    return <Outlet />
}