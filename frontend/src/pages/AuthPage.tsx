import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { User } from "../types";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/insurances");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <AuthForm onLogin={handleLogin} />
    </div>
  );
};

export default AuthPage;
