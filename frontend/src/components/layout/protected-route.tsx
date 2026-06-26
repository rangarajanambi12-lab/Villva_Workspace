import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore, Role } from "@/stores/auth-store";
import { AccessDeniedPage } from "@/pages/errors/access-denied";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, forcePasswordChange } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If specific roles are required, check if user has access
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return <AccessDeniedPage />;
    }
  }

  return <>{children}</>;
}
