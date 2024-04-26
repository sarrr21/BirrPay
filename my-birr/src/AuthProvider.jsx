import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Import useNavigate hook

  // Check if user is already logged in by checking localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("userEmailBirrPay")
  );

  useEffect(() => {
    // Update isAuthenticated state whenever localStorage changes
    setIsAuthenticated(!!localStorage.getItem("userEmailBirrPay"));
  }, []);

  const logout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userEmailBirrPay");
    // Redirect user to the login page
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
