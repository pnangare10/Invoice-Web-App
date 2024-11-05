import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import api from "../../api/springApi";

const AuthContext = createContext({
  token: null,
  setToken: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : null;
  const isADmin = localStorage.getItem("IS_ADMIN")
    ? JSON.stringify(localStorage.getItem("IS_ADMIN"))
    : false;
  const IS_LOGGED_IN = localStorage.getItem("IS_LOGGED_IN")
    ? localStorage.getItem("IS_LOGGED_IN")
    : false;

  const [token, setToken] = useState(getToken);

  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(isADmin);
  const [isLoggedIn, setIsLoggedIn] = useState(IS_LOGGED_IN);

  const navigate = useNavigate();

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("USER"));

    if (user?.username) {
      try {
        const { data } = await api.get(`/auth/user`);
        const roles = data.roles;

        if (roles.includes("ROLE_ADMIN")) {
          localStorage.setItem("IS_ADMIN", JSON.stringify(true));
          setIsAdmin(true);
        } else {
          localStorage.removeItem("IS_ADMIN");
          setIsAdmin(false);
        }
        setCurrentUser(data);
        setIsLoggedIn(true);
        localStorage.setItem("IS_LOGGED_IN", true);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error fetching current user", error);
        toast.error("Error fetching current user");
        logout();
        navigate("/login");
        setIsLoggedIn(false);
      }
    }
  };

  const logout = async () => {
    localStorage.removeItem("JWT_TOKEN"); // Updated to remove token from localStorage
    localStorage.removeItem("USER"); // Remove user details as well
    localStorage.removeItem("CSRF_TOKEN");
    localStorage.removeItem("IS_ADMIN");
    localStorage.removeItem("IS_LOGGED_IN");
    setToken(null);
    setCurrentUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin,
        isLoggedIn,
        logout,
      }}
    >
      {props.children ?? <Outlet />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
