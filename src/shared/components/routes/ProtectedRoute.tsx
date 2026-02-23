import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../utils/getCurrentUser";

export const ProtectedRoute = () => {
  return getCurrentUser() ? <Outlet /> : <Navigate to="/auth" />;
};