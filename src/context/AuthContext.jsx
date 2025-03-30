
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // No localStorage, just state
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData); // Set user without storing in localStorage
    navigate("/dashboard");
  };

  const signup = (userData) => {
    setUser(userData); // Set user without storing in localStorage
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null); // Just reset the user state
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
