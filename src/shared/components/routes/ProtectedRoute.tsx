import { UserOwnProfile } from "@/model/UserOwnProfile";
import { LocalStorage } from "@/shared/utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const currentUser = LocalStorage.get<UserOwnProfile>('user');
  return currentUser ? <Outlet /> : <Navigate to="/auth" />;
};