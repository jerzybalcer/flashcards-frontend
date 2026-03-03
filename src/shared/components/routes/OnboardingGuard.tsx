import { UserOwnProfile } from "@/model/UserOwnProfile";
import { LocalStorage } from "@/shared/utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";

export const OnboardingGuard = () => {
    const user = LocalStorage.get<UserOwnProfile>('user');

    if(!user) return <Navigate to='/auth' />;

    if (!user.hasCompletedOnboarding) {
        return <Navigate to="/onboarding" />;
    }

    return <Outlet />
}