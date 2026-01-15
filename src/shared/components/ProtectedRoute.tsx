import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/general/useAuth";

export const ProtectedRoute = () => {
  const auth = useAuth();
  return !auth?.currentUser ? <Navigate to="/login" /> : <Outlet />;
};