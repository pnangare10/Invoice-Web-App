import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";


const LoginRoute = () => {
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    console.log("isLoggedIn changed:", isLoggedIn);
  }, [isLoggedIn]);
  console.log(isLoggedIn)
  return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default LoginRoute;