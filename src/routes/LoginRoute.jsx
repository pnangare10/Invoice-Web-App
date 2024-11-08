import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";


const LoginRoute = () => {
  const { isLoggedIn } = useAuth();
  return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default LoginRoute;