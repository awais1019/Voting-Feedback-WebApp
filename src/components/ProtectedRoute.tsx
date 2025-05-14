import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuthStore();
  if (!user?.role || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};