import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Access global state
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Insurance from "./pages/Insurance";
import Calculator from "./pages/Calculator";

interface RootState {
  auth: {
    isAuthenticated: boolean;
  };
}

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth); // Get auth state

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/insurance" element={isAuthenticated ? <Insurance /> : <Navigate to="/" />} />
        <Route path="/calculator" element={isAuthenticated ? <Calculator /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
