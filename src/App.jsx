import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./components/Auth/SignUpPage";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import LoginPage from "./components/Auth/LoginPage";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
