import { useContext } from "react";
import AuthContext from "../context/Authcontext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Welcome, {user?.role}</h1>
      <button
        onClick={logout}
        style={{
          marginTop: "16px",
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}
