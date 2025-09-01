import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authActions";
import api from "../api";
import { User } from "../types";

interface AuthFormProps {
  onLogin: (userData: User) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = isLogin ? "/users/login" : "/users/register";

    try {
      const response = await api.post<{ message: string } & User>(endpoint, {
        username,
        password,
      });

      setMessage(response.data.message);

      if (isLogin) {
        const userData = { username, password };
        dispatch(login(userData));  // Login action via Redux
        onLogin(userData); // Call onLogin prop if needed
      }
    } catch (error: any) {
      // Handle axios error gracefully
      if (error.response) {
        setMessage(error.response?.data?.message || "Something went wrong");
      } else {
        setMessage("Network error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        width: "350px",
        textAlign: "center",
      }}
    >
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{
          background: "none",
          border: "none",
          marginTop: "10px",
          color: "#667eea",
          cursor: "pointer",
        }}
      >
        Switch to {isLogin ? "Register" : "Login"}
      </button>
      {message && <p style={{ color: message.includes("error") ? "red" : "green" }}>{message}</p>}
    </div>
  );
};

export default AuthForm;
