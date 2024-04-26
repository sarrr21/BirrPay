// PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Check if the authentication token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("userEmailBirrPay");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute; // Make sure to export the PrivateRoute component
