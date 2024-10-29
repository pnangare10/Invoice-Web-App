import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const RoleProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;