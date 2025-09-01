// components/Header.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authActions";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/"; // redirect after logout
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "70px",
        background: "#0d6efd",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 25px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      {/* Logo + Company Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src="http://localhost:5000/uploads/companyIcons/agentaux_logo_without_name.png"
          alt="Logo"
          width={50}
          height={50}
          style={{
            borderRadius: "50%",
            backgroundColor: "#fff",
            objectFit: "cover",
          }}
        />
        <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 500 }}>
          {name}
        </h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          padding: "8px 16px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "0.9rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
        onMouseOver={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#d32f2f")
        }
        onMouseOut={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#f44336")
        }
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
