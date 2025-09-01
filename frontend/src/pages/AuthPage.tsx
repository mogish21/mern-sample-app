import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authActions";
import AuthForm from "../components/AuthForm";

const AuthPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogin = (userData: { username: string; password: string }) => {
    // Dispatch login action to store in Redux
    dispatch(login(userData));

    // Navigate to dashboard after successful login
    window.location.href = "/dashboard"; // You can also use `useNavigate` here if preferred
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
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <AuthForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default AuthPage;
