import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/Authcontext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "white",
    },
    navLinks: {
      display: "flex",
      gap: "15px",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "16px",
    },
    logoutButton: {
      backgroundColor: "red",
      color: "white",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div>
        <Link to="/" style={{ ...styles.link, fontSize: "20px", fontWeight: "bold" }}>EdTech Platform</Link>
      </div>

      <div style={styles.navLinks}>
        <Link to="/scholarships" style={styles.link}>Scholarships</Link>
        {user && <Link to="/applications" style={styles.link}>Applications</Link>}
        {user && <Link to="/dashboard" style={styles.link}>Dashboard</Link>}

        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <button style={styles.logoutButton} onClick={() => { logout(); navigate("/login"); }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
